// js/internal-links.js - UNIFIED AUTO-DETECT INLINE + RELATED ENGINE

console.log("🚀 Unified Internal Linking Engine (Auto-Detect Mode)");

// ===== CONFIG =====
const CONFIG = {
    MAX_INLINE_LINKS: 5,
    MAX_LINKS_PER_KEYWORD: 1,
    MAX_RELATED_LINKS: 4
};

// ===== STATE =====
let inlineCount = 0;
let keywordCounts = {};

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
    waitForRegistry(initEngine);
});

function waitForRegistry(callback) {
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders) {
        setTimeout(() => waitForRegistry(callback), 200);
        return;
    }
    callback();
}

// ===== MAIN =====
function initEngine() {
    const pages = extractAllPages();
    const currentPath = window.location.pathname.toLowerCase();

    const otherPages = pages.filter(p => !currentPath.includes(p.slug));

    const keywordMap = buildKeywordMap(otherPages);

    const contentContainer = detectContentContainer();

    if (contentContainer) {
        injectInlineLinks(contentContainer, keywordMap);
    } else {
        console.warn("⚠️ No content container detected for inline linking");
    }

    injectRelatedLinks(otherPages);
}

// ===== EXTRACT PAGES =====
function extractAllPages() {
    let pages = [];

    Object.entries(window.SITE_REGISTRY.folders).forEach(([folderName, folder]) => {
        if (folder.files) {
            folder.files.forEach(file => {
                pages.push({
                    label: file.label,
                    slug: file.name.replace(".html", "").toLowerCase(),
                    url: file.name.replace(".html", ""),
                    folder: folderName.toLowerCase()
                });
            });
        }
    });

    return pages;
}

// ===== KEYWORD MAP =====
function buildKeywordMap(pages) {
    let map = {};

    pages.forEach(page => {
        const keyword = page.label.toLowerCase();
        map[keyword] = page.url;
    });

    return map;
}

// ===== AUTO-DETECT CONTENT CONTAINER =====
function detectContentContainer() {
    // 1. explicit
    let el = document.querySelector(".post-content");
    if (el) return el;

    // 2. semantic
    el = document.querySelector("article");
    if (el) return el;

    el = document.querySelector("main");
    if (el) return el;

    // 3. heuristic: largest text block
    let candidates = Array.from(document.querySelectorAll("div, section"));

    let best = null;
    let max = 0;

    candidates.forEach(node => {
        const text = node.innerText?.trim() || "";
        const len = text.length;

        if (len < 300) return;
        if (node.closest("nav") || node.closest("footer")) return;

        if (len > max) {
            max = len;
            best = node;
        }
    });

    return best || document.body;
}

// ===== INLINE LINKING =====
function injectInlineLinks(container, keywordMap) {

    function processNode(node) {
        if (inlineCount >= CONFIG.MAX_INLINE_LINKS) return;

        if (node.nodeType === 3) {
            let text = node.nodeValue;

            for (let keyword in keywordMap) {
                if (inlineCount >= CONFIG.MAX_INLINE_LINKS) break;
                if ((keywordCounts[keyword] || 0) >= CONFIG.MAX_LINKS_PER_KEYWORD) continue;

                const regex = new RegExp(`\\b(${escapeRegex(keyword)})\\b`, "i");

                if (regex.test(text)) {
                    const span = document.createElement("span");

                    span.innerHTML = text.replace(
                        regex,
                        `<a href="/${keywordMap[keyword]}">$1</a>`
                    );

                    node.replaceWith(span);

                    inlineCount++;
                    keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;

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

        Array.from(node.childNodes).forEach(child => processNode(child));
    }

    processNode(container);
}

// ===== RELATED LINKS =====
function injectRelatedLinks(pages) {
    const container = document.getElementById("dynamic-internal-links");
    if (!container) return;

    const currentPath = window.location.pathname.toLowerCase();

    const depth = currentPath.split('/').filter(Boolean).length;
    const isSubpage = depth > 0 && !currentPath.endsWith('index.html') && currentPath !== '/';
    const prefix = isSubpage ? '../' : '';

    let scored = pages.map(page => {
        let score = 0;

        if (currentPath.includes(page.slug)) score += 2;
        if (currentPath.includes(page.folder)) score += 4;

        page.slug.split('-').forEach(word => {
            if (currentPath.includes(word)) score += 1;
        });

        return { ...page, score };
    });

    let relevant = scored
        .filter(p => p.score > 0)
        .sort((a, b) => b.score - a.score);

    if (relevant.length < CONFIG.MAX_RELATED_LINKS) {
        const fallback = pages.sort(() => Math.random() - 0.5);
        relevant = [...relevant, ...fallback];
    }

    const finalLinks = relevant.slice(0, CONFIG.MAX_RELATED_LINKS);

    let html = `
        <div class="mt-12 bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span class="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm">🔍</span>
                Explore More Resources
            </h3>
            <div class="grid sm:grid-cols-2 gap-4">
    `;

    finalLinks.forEach(page => {
        html += `
            <a href="${prefix}${page.url}" class="group flex items-start gap-x-3 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-emerald-100">
                <span class="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
                <span class="text-sm font-medium text-slate-700 group-hover:text-emerald-600 leading-tight">
                    ${page.label}
                </span>
            </a>
        `;
    });

    html += `</div></div>`;

    container.innerHTML = html;
}

// ===== UTILITY =====
function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
