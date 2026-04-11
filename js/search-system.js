// js/search-system.js
function enhanceLiveSearch() {
    const originalLiveSearch = window.liveSearch;
    
    window.liveSearch = function(query) {
        const lower = (query || '').toLowerCase().trim();
        
        if (typeof originalLiveSearch === 'function') {
            originalLiveSearch(query);
        }
        
        const dropdown = document.getElementById('searchDropdown');
        if (!dropdown || lower.length < 2) return;
        
        const registry = window.SITE_REGISTRY;
        const allPages = registry.getAllPages();
        
        const pageMatches = allPages.filter(p => 
            p.label.toLowerCase().includes(lower) || 
            (p.description || '').toLowerCase().includes(lower) ||
            p.name.toLowerCase().includes(lower)
        );
        
        let extraHTML = '';
        
        if (pageMatches.length) {
            extraHTML += `<div class="px-6 py-2 text-xs uppercase bg-slate-50 font-medium">📁 Site Pages</div>`;
            extraHTML += pageMatches.map(p => `
                <a href="${p.name}" class="px-6 py-4 hover:bg-slate-50 flex items-center justify-between border-b last:border-none">
                    <div class="flex items-center gap-x-3">
                        <span class="text-emerald-500">📄</span>
                        <div>
                            <div class="font-medium">${p.label}</div>
                            <div class="text-xs text-slate-400">${p.folder} • ${p.name}</div>
                        </div>
                    </div>
                </a>`).join('');
        }
        
        if (extraHTML) dropdown.innerHTML += extraHTML;
    };
}

// Activate on both desktop and mobile
enhanceLiveSearch();
console.log('%c✅ SEARCH-SYSTEM active — works on desktop + mobile (subfolders included)', 'color:#8b5cf6');
