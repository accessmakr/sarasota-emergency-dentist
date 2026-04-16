// js/internal-links.js - UNIVERSAL MASTER EDITION
console.log('🚀 Universal Internal Links: Initializing...');

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
}

function injectDynamicLinks() {
    // 1. Data Safety Check
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders) {
        setTimeout(injectDynamicLinks, 200);
        return;
    }

    // 2. Find the parking spot
    const container = document.getElementById('dynamic-internal-links');
    if (!container) {
        console.log('ℹ️ No #dynamic-internal-links found. Skipping.');
        return;
    }

    // 3. Pathing Logic (Same as Universal Menu for 100% sync)
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const isSubpage = depth > 0 && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/';
    const prefix = isSubpage ? '../' : '';

    // 4. Gather, Filter, and Clean the Links
    let linksToInject = [];
    Object.entries(window.SITE_REGISTRY.folders).forEach(([folderName, folder]) => {
        
        // RULE: Ignore the "Root" folder (Privacy Policy, etc.)
        if (folderName.toLowerCase() !== 'root' && folder.files) {
            
            folder.files.forEach(file => {
                // RULE: Do not link to the page the user is currently viewing
                if (!window.location.pathname.includes(file.name)) {
                    linksToInject.push(file);
                }
            });
        }
    });

    if (linksToInject.length === 0) return;

    // 5. Shuffle the array to randomize the selection
    linksToInject.sort(() => Math.random() - 0.5);

    // 6. Limit to a maximum of 4 links
    const maxLinks = 4;
    const finalLinks = linksToInject.slice(0, maxLinks);

    // 7. Build the UI
    let html = `
        <div class="mt-12 bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span class="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm">🔍</span>
                Explore More Local Sarasota Resources
            </h3>
            <div class="grid sm:grid-cols-2 gap-4">
    `;

    // 8. Inject the final 4 links
    finalLinks.forEach(file => {
        html += `
            <a href="${prefix}${file.name}" class="group flex items-start gap-x-3 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-emerald-100">
                <span class="text-emerald-500 group-hover:translate-x-1 transition-transform">→</span>
                <span class="text-sm font-medium text-slate-700 group-hover:text-emerald-600 leading-tight">${file.label}</span>
            </a>
        `;
    });

    html += `</div></div>`;
    
    container.innerHTML = html;
    console.log(`✅ Universal Links: Injected ${finalLinks.length} randomized links.`);
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        activateSmoothScrolling();
        injectDynamicLinks();
    });
} else {
    activateSmoothScrolling();
    injectDynamicLinks();
}
