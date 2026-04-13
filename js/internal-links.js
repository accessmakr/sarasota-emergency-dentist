// js/internal-links.js
console.log('🚀 INTERNAL-LINKS engine loading...');

// 1. Keep your original Smooth Scrolling
function activateSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    console.log('✅ Smooth scrolling activated');
}

// 2. NEW: Dynamic Cross-Linking from Registry
function injectDynamicLinks() {
    // Wait until the registry is fully loaded
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders) {
        setTimeout(injectDynamicLinks, 200);
        return;
    }

    // Find the spot on the page where you want the links to appear
    const container = document.getElementById('dynamic-internal-links');
    if (!container) {
        console.log('ℹ️ No #dynamic-internal-links container found on this page. Skipping link injection.');
        return;
    }

    // Gather all files from the specific folders you requested
    let linksToInject = [];
    const targetFolders = ['guide', 'location'];

    targetFolders.forEach(folderName => {
        if (window.SITE_REGISTRY.folders[folderName]) {
            linksToInject = linksToInject.concat(window.SITE_REGISTRY.folders[folderName].files);
        }
    });

    if (linksToInject.length === 0) return;

    // Determine relative path (if you are inside /guide/ you need '../location/' to link properly)
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const prefix = depth > 0 && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/' ? '../' : '';

    // Build the HTML for the links
    let html = `
        <div class="mt-12 bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8">
            <h3 class="text-xl font-semibold text-slate-900 mb-5">Explore More Local Sarasota Guides</h3>
            <div class="grid sm:grid-cols-2 gap-4">
    `;

    linksToInject.forEach(file => {
        // Don't link to the exact page we are currently looking at
        if (window.location.pathname.includes(file.name)) return;

        html += `
            <a href="${prefix}${file.name}" class="flex items-center gap-x-3 text-sm text-emerald-700 hover:text-violet-600 hover:translate-x-1 transition-all">
                <span class="text-lg">→</span>
                <span class="font-medium">${file.label}</span>
            </a>
        `;
    });

    html += `</div></div>`;
    
    // Inject it into the page
    container.innerHTML = html;
    console.log(`✅ Dynamically injected ${linksToInject.length} internal links from /guide/ and /location/`);
}

// Kick off both functions when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        activateSmoothScrolling();
        injectDynamicLinks();
    });
} else {
    activateSmoothScrolling();
    injectDynamicLinks();
}
