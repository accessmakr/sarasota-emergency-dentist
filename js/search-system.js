// js/search-system.js
// ======================== ADVANCED SEARCH SYSTEM ========================

function enhanceLiveSearch() {
    const originalLiveSearch = window.liveSearch;
    
    window.liveSearch = function(query) {
        const lower = (query || '').toLowerCase().trim();
        
        // Call original provider search first
        if (typeof originalLiveSearch === 'function') {
            originalLiveSearch(query);
        }
        
        const dropdown = document.getElementById('searchDropdown');
        if (!dropdown || lower.length < 2) return;
        
        const registry = window.SITE_REGISTRY;
        const allPages = registry.getAllPages();
        
        // Search repo pages
        const pageMatches = allPages.filter(p => 
            p.label.toLowerCase().includes(lower) || 
            (p.description || '').toLowerCase().includes(lower) ||
            p.name.toLowerCase().includes(lower)
        );
        
        // Search providers (global dentists array from inline script)
        const providerMatches = (window.dentists || []).filter(d => 
            d.name.toLowerCase().includes(lower) ||
            (d.summary || '').toLowerCase().includes(lower) ||
            (d.strengths || '').toLowerCase().includes(lower)
        );
        
        let extraHTML = '';
        
        if (pageMatches.length) {
            extraHTML += `<div class="px-6 py-2 text-xs uppercase bg-slate-50 font-medium">📁 Repo Pages</div>`;
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
        
        if (providerMatches.length) {
            extraHTML += `<div class="px-6 py-2 text-xs uppercase bg-violet-50 font-medium">🦷 Providers</div>`;
            extraHTML += providerMatches.slice(0, 5).map(d => `
                <div onclick="window.open('${d.website || '#'}','_blank')" class="px-6 py-4 hover:bg-slate-50 flex justify-between border-b last:border-none cursor-pointer">
                    <div class="font-medium">${d.name}</div>
                    <div class="text-emerald-500">${d.rating}★</div>
                </div>`).join('');
        }
        
        if (extraHTML) {
            dropdown.innerHTML += extraHTML;
        }
    };
}

console.log('%c✅ SEARCH-SYSTEM enhanced — full repo + provider search active', 'color:#8b5cf6');
