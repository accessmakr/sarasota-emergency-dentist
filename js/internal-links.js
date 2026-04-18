// js/internal-links.js - CLEAN URL EDITION
console.log('🚀 Internal Links: Initializing Clean URL System...');

function injectDynamicLinks() {
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders) {
        setTimeout(injectDynamicLinks, 200);
        return;
    }

    const container = document.getElementById('dynamic-internal-links');
    if (!container) return;

    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const isSubpage = depth > 0 && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/';
    const prefix = isSubpage ? '../' : '';

    let linksToInject = [];
    Object.entries(window.SITE_REGISTRY.folders).forEach(([folderName, folder]) => {
        if (folderName.toLowerCase() !== 'root' && folder.files) {
            folder.files.forEach(file => {
                if (!window.location.pathname.includes(file.name.replace('.html', ''))) {
                    linksToInject.push(file);
                }
            });
        }
    });

    if (linksToInject.length === 0) return;

    // SHUFFLE & LIMIT TO 4
    linksToInject.sort(() => Math.random() - 0.5);
    const finalLinks = linksToInject.slice(0, 4);

    let html = `
        <div class="mt-12 bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span class="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm">🔍</span>
                Explore More Local Sarasota Resources
            </h3>
            <div class="grid sm:grid-cols-2 gap-4">
    `;

    finalLinks.forEach(file => {
        // SURGICAL FIX: Strip .html for Clean URLs
        const cleanHref = file.name.replace('.html', '');
        html += `
            <a href="${prefix}${cleanHref}" class="group flex items-start gap-x-3 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-emerald-100">
                <span class="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
                <span class="text-sm font-medium text-slate-700 group-hover:text-emerald-600 leading-tight">${file.label}</span>
            </a>
        `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', injectDynamicLinks);
