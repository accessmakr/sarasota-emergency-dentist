// js/internal-links.js - RELEVANCE-BASED CLEAN URL EDITION

console.log('🚀 Internal Links: Initializing Relevance System...');

function injectDynamicLinks() {
    // Wait for registry
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders) {
        setTimeout(injectDynamicLinks, 200);
        return;
    }

    const container = document.getElementById('dynamic-internal-links');
    if (!container) return;

    const currentPath = window.location.pathname.toLowerCase();

    // Detect relative path depth (for ../ handling)
    const depth = currentPath.split('/').filter(Boolean).length;
    const isSubpage = depth > 0 && !currentPath.endsWith('index.html') && currentPath !== '/';
    const prefix = isSubpage ? '../' : '';

    let allLinks = [];

    // Collect all files from registry
    Object.entries(window.SITE_REGISTRY.folders).forEach(([folderName, folder]) => {
        if (folderName.toLowerCase() !== 'root' && folder.files) {
            folder.files.forEach(file => {
                const cleanName = file.name.replace('.html', '').toLowerCase();

                // Exclude current page
                if (!currentPath.includes(cleanName)) {
                    allLinks.push({
                        ...file,
                        folder: folderName
                    });
                }
            });
        }
    });

    if (allLinks.length === 0) return;

    // ===== RELEVANCE SCORING =====
    let scoredLinks = allLinks.map(file => {
        let score = 0;

        const cleanName = file.name.replace('.html', '').toLowerCase();

        // Match URL similarity
        if (currentPath.includes(cleanName)) {
            score += 2;
        }

        // Match folder (strong signal)
        if (file.folder && currentPath.includes(file.folder.toLowerCase())) {
            score += 4;
        }

        // Partial keyword match (slug words)
        const words = cleanName.split('-');
        words.forEach(word => {
            if (currentPath.includes(word)) {
                score += 1;
            }
        });

        return { ...file, score };
    });

    // ===== FILTER RELEVANT LINKS =====
    let relevantLinks = scoredLinks
        .filter(link => link.score > 0)
        .sort((a, b) => b.score - a.score);

    // ===== FALLBACK (if not enough relevant links) =====
    if (relevantLinks.length < 4) {
        const fallbackLinks = allLinks
            .sort(() => Math.random() - 0.5);

        relevantLinks = [...relevantLinks, ...fallbackLinks];
    }

    // ===== FINAL LIMIT =====
    const finalLinks = relevantLinks.slice(0, 4);

    // ===== RENDER =====
    let html = `
        <div class="mt-12 bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span class="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm">🔍</span>
                Explore More Resources
            </h3>
            <div class="grid sm:grid-cols-2 gap-4">
    `;

    finalLinks.forEach(file => {
        const cleanHref = file.name.replace('.html', '');

        html += `
            <a href="${prefix}${cleanHref}" class="group flex items-start gap-x-3 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-emerald-100">
                <span class="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
                <span class="text-sm font-medium text-slate-700 group-hover:text-emerald-600 leading-tight">
                    ${file.label}
                </span>
            </a>
        `;
    });

    html += `</div></div>`;

    container.innerHTML = html;
}

// Init
document.addEventListener('DOMContentLoaded', injectDynamicLinks);
