// js/internal-links.js - AI-ASSISTED SEO LINKING ENGINE (FULL VERSION)

console.log("🚀 AI Internal Linking Engine (FULL SYSTEM) Initialized");

// ================= CONFIG =================
const CONFIG = {
    MAX_INLINE_LINKS: 5,
    MAX_PER_KEYWORD: 1,
    MIN_RELEVANCE_SCORE: 5,
    DEBUG: true,
    MAX_RELATED_LINKS: 4
};

// ================= STATE =================
let linkCount = 0;
let keywordUsage = {};

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    waitForRegistry(initEngine);
});

function waitForRegistry(cb) {
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders) {
        setTimeout(() => waitForRegistry(cb), 200);
        return;
    }
    cb();
}

// ================= MAIN ENGINE =================
function initEngine() {
    const pages = extractPages();
    const currentPath = location.pathname.toLowerCase();

    const filteredPages = pages.filter(p => !currentPath.includes(p.slug));

    const keywordMap = buildKeywordMap(filteredPages);

    const content = detectContentContainer();

    if (content) {
        log("📍 Content detected:", content);
        walkDOM(content, keywordMap);
    } else {
        log("❌ No content container found");
    }

    injectRelatedLinks(filteredPages);
}

// ================= REGISTRY EXTRACTION =================
function extractPages() {
    let pages = [];

    Object.entries(window.SITE_REGISTRY.folders).forEach(([folder, data]) => {
        if (!data.files) return;

        data.files.forEach(file => {
            pages.push({
                label: file.label.toLowerCase(),
                slug: file.name.replace(".html", "").toLowerCase(),
                url: file.name.replace(".html", ""),
                folder: folder.toLowerCase()
            });
        });
    });

    return pages;
}

// ================= KEYWORD MAP =================
function buildKeywordMap(pages) {
    let map = {};

    pages.forEach(p => {
        if (p.label) {
            map[p.label] = p.url;
        }
    });

    return map;
}

// ================= AUTO CONTENT DETECTION =================
function detectContentContainer() {
    const selectors = [".post-content", "article", "main", "[role='main']"];

    for (let sel of selectors) {
        const el = document.querySelector(sel);
        if (el && el.innerText.trim().length > 200) {
            return el;
        }
    }

    let best = null;
    let max = 0;

    document.querySelectorAll("div, section").forEach(el => {
        const text = el.innerText?.trim() || "";

        if (
            text.length > max &&
            text.length > 300 &&
            !el.closest("nav") &&
            !el.closest("footer")
        ) {
            max = text.length;
            best = el;
        }
    });

    return best || document.body;
}

// ================= SEMANTIC SAFETY FILTER =================
function isSafeSemanticContext(node) {
    const parent = node.parentElement;
    if (!parent) return false;

    const tag = parent.tagName.toLowerCase();

    const blocked = ["nav", "footer", "header", "button", "form", "aside"];

    if (blocked.includes(tag)) return false;

    if (parent.closest("nav") || parent.closest("footer")) return false;

    const text = parent.innerText?.trim() || "";
    if (text.length < 80) return false;

    return true;
}

// ================= AI-STYLE RELEVANCE SCORING =================
function scoreContext(text, keyword) {
    let score = 0;

    const t = text.toLowerCase();
    const words = t.split(/\s+/);

    // direct match
    if (t.includes(keyword)) score += 2;

    // semantic overlap
    keyword.split(" ").forEach(w => {
        if (words.includes(w)) score += 1;
    });

    // content richness
    if (text.length > 120) score += 1;

    // noise penalty
    if (text.length < 80) score -= 3;

    return score;
}

// ================= BULLETPROOF DOM WALKER =================
function walkDOM(node, keywords) {
    if (linkCount >= CONFIG.MAX_INLINE_LINKS) return;

    if (node.nodeType === 3 && isSafeSemanticContext(node)) {

        let text = node.nodeValue;

        for (let keyword in keywords) {

            if (linkCount >= CONFIG.MAX_INLINE_LINKS) break;
            if ((keywordUsage[keyword] || 0) >= CONFIG.MAX_PER_KEYWORD) continue;

            const score = scoreContext(text, keyword);

            if (score < CONFIG.MIN_RELEVANCE_SCORE) {
                log("🚫 Skipped (low score):", keyword, score);
                continue;
            }

            const regex = new RegExp(`\\b(${escapeRegex(keyword)})\\b`, "i");

            if (regex.test(text)) {

                const url = "/" + keywords[keyword];

                const html = text.replace(
                    regex,
                    `<a href="${url}" data-score="${score}">$1</a>`
                );

                const span = document.createElement("span");
                span.innerHTML = html;

                log("✅ LINK:", { keyword, url, score });

                node.replaceWith(span);

                linkCount++;
                keywordUsage[keyword] = (keywordUsage[keyword] || 0) + 1;

                return;
            }
        }
    }

    if (
        node.nodeName === "A" ||
        node.nodeName === "SCRIPT" ||
        node.nodeName === "STYLE" ||
        node.nodeName === "H1" ||
        node.nodeName === "H2"
    ) return;

    Array.from(node.childNodes).forEach(n => walkDOM(n, keywords));
}

// ================= RELATED LINKS ENGINE =================
function injectRelatedLinks(pages) {
    const container = document.getElementById("dynamic-internal-links");
    if (!container) return;

    const current = location.pathname.toLowerCase();

    let scored = pages.map(p => {
        let score = 0;

        if (current.includes(p.slug)) score += 2;
        if (current.includes(p.folder)) score += 4;

        p.slug.split("-").forEach(w => {
            if (current.includes(w)) score += 1;
        });

        return { ...p, score };
    });

    let relevant = scored
        .filter(p => p.score > 0)
        .sort((a, b) => b.score - a.score);

    if (relevant.length < CONFIG.MAX_RELATED_LINKS) {
        relevant = [
            ...relevant,
            ...pages.sort(() => Math.random() - 0.5)
        ];
    }

    const final = relevant.slice(0, CONFIG.MAX_RELATED_LINKS);

    let html = `
        <div class="mt-12 bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-6">Explore More Resources</h3>
            <div class="grid sm:grid-cols-2 gap-4">
    `;

    final.forEach(p => {
        html += `
            <a href="/${p.url}" class="group p-3 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-emerald-100">
                <span class="text-sm font-medium">${p.label}</span>
            </a>
        `;
    });

    html += `</div></div>`;

    container.innerHTML = html;
}

// ================= DEBUG =================
function log(...args) {
    if (CONFIG.DEBUG) {
        console.log("[INLINE AI ENGINE]", ...args);
    }
}

// ================= UTILS =================
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
