// js/internal-links.js - FIXED AI SEO LINK ENGINE

console.log("🚀 Internal Linking Engine (FIXED VERSION) STARTED");

// ================= CONFIG =================
const CONFIG = {
    MAX_INLINE_LINKS: 5,
    MAX_PER_KEYWORD: 1,
    MIN_SCORE: 5,
    DEBUG: true,
    MAX_RELATED: 4
};

// ================= STATE =================
let linkCount = 0;
let keywordUsage = {};

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    waitForRegistry(init);
});

function waitForRegistry(cb) {
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders) {
        setTimeout(() => waitForRegistry(cb), 200);
        return;
    }
    cb();
}

// ================= MAIN =================
function init() {
    const pages = getPages();
    const currentPath = location.pathname.toLowerCase();

    const usablePages = pages.filter(p => !currentPath.includes(p.slug));

    const keywordMap = buildKeywordMap(usablePages);

    const content = detectContent();

    log("📍 Content detected:", content);

    walkDOM(content, keywordMap);

    injectRelated(usablePages);

    log("✅ DONE. Links created:", linkCount);
}

// ================= REGISTRY =================
function getPages() {
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

// ================= KEYWORDS =================
function buildKeywordMap(pages) {
    let map = {};

    pages.forEach(p => {
        if (p.label) {
            map[p.label] = p.url;
        }
    });

    return map;
}

// ================= CONTENT DETECTION =================
function detectContent() {
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

// ================= SEMANTIC SAFETY =================
function isSafe(node) {
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

// ================= AI SCORING =================
function score(text, keyword) {
    let s = 0;

    const t = text.toLowerCase();
    const words = t.split(/\s+/);

    if (t.includes(keyword)) s += 2;

    keyword.split(" ").forEach(w => {
        if (words.includes(w)) s += 1;
    });

    if (text.length > 120) s += 1;

    return s;
}

// ================= DOM WALKER (FIXED CORE) =================
function walkDOM(node, keywords) {
    if (linkCount >= CONFIG.MAX_INLINE_LINKS) return;

    // ONLY SKIP STRUCTURAL ELEMENTS (NOT TEXT TRAVERSAL)
    if (
        node.nodeName === "A" ||
        node.nodeName === "SCRIPT" ||
        node.nodeName === "STYLE"
    ) return;

    // TEXT NODE PROCESSING
    if (node.nodeType === 3) {

        if (!isSafe(node)) return;

        let text = node.nodeValue;

        for (let keyword in keywords) {

            if (linkCount >= CONFIG.MAX_INLINE_LINKS) break;
            if ((keywordUsage[keyword] || 0) >= CONFIG.MAX_PER_KEYWORD) continue;

            const scoreValue = score(text, keyword);

            log("🔍 SCORE:", keyword, scoreValue);

            if (scoreValue < CONFIG.MIN_SCORE) continue;

            const regex = new RegExp(`\\b(${escapeRegex(keyword)})\\b`, "i");

            if (regex.test(text)) {

                const url = "/" + keywords[keyword];

                const span = document.createElement("span");

                span.innerHTML = text.replace(
                    regex,
                    `<a href="${url}" data-score="${scoreValue}">$1</a>`
                );

                log("✅ LINK CREATED:", { keyword, url, scoreValue });

                node.replaceWith(span);

                linkCount++;
                keywordUsage[keyword] = (keywordUsage[keyword] || 0) + 1;

                return;
            }
        }
    }

    Array.from(node.childNodes).forEach(child => walkDOM(child, keywords));
}

// ================= RELATED LINKS =================
function injectRelated(pages) {
    const container = document.getElementById("dynamic-internal-links");
    if (!container) return;

    const current = location.pathname.toLowerCase();

    let scored = pages.map(p => {
        let s = 0;

        if (current.includes(p.slug)) s += 2;
        if (current.includes(p.folder)) s += 4;

        p.slug.split("-").forEach(w => {
            if (current.includes(w)) s += 1;
        });

        return { ...p, score: s };
    });

    let relevant = scored.sort((a, b) => b.score - a.score);

    const final = relevant.slice(0, CONFIG.MAX_RELATED);

    let html = `
        <div class="mt-12 bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8">
            <h3 class="text-xl font-bold mb-4">Explore More Resources</h3>
            <div class="grid sm:grid-cols-2 gap-4">
    `;

    final.forEach(p => {
        html += `
            <a href="/${p.url}" class="block p-3 rounded-xl hover:bg-white">
                ${p.label}
            </a>
        `;
    });

    html += `</div></div>`;

    container.innerHTML = html;
}

// ================= DEBUG =================
function log(...args) {
    if (CONFIG.DEBUG) {
        console.log("[LINK ENGINE]", ...args);
    }
}

// ================= UTILS =================
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
