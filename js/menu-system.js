// js/menu-system.js - V7 "The Sarasota Final"
console.log('🚀 Menu System V7: Initializing...');

function buildMenuContent() {
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders) return '';

    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const prefix = (depth > 0 && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') ? '../' : '';

    let html = `
    <div class="mb-4">
        <input type="text" placeholder="Search pages..." id="menu-search"
               class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-400">
    </div>`;

    // SORTING LOGIC: Guide & Location first, Root (Directory) last
    const folderKeys = Object.keys(window.SITE_REGISTRY.folders).sort((a, b) => {
        if (a.toLowerCase() === 'root') return 1;
        if (b.toLowerCase() === 'root') return -1;
        return a.localeCompare(b);
    });

    folderKeys.forEach(key => {
        const folder = window.SITE_REGISTRY.folders[key];
        if (!folder.files || folder.files.length === 0) return;

        // RENAME "Root" to "Directory"
        const displayName = key.toLowerCase() === 'root' ? 'Main Directory' : key;

        html += `
        <div class="mb-4 menu-section">
            <div class="text-[10px] font-black text-emerald-600 uppercase tracking-tighter mb-2 px-2 border-b border-emerald-50 pb-1">
                ${folder.icon || '📁'} ${displayName}
            </div>
            ${folder.files.map(file => `
                <a href="${prefix}${file.name}" 
                   class="flex items-center gap-x-3 px-3 py-2 hover:bg-emerald-50 rounded-xl text-sm text-slate-700 transition-all group">
                    <span class="text-xs opacity-40">📄</span>
                    <span class="font-medium group-hover:text-emerald-700">${file.label}</span>
                </a>
            `).join('')}
        </div>`;
    });
    return html;
}

function inject() {
    if (document.getElementById('nav-menu-wrapper')) return;

    const dock = document.getElementById('master-nav-dock');
    const wrapper = document.createElement('div');
    wrapper.id = 'nav-menu-wrapper';
    
    // Using a more prominent button style
    const buttonHTML = `
        <div class="relative inline-block text-left">
            <button onclick="document.getElementById('nav-dd').classList.toggle('hidden')" 
                    class="px-6 py-2.5 bg-slate-900 text-white text-xs font-black uppercase rounded-full shadow-xl hover:bg-emerald-600 transition-all flex items-center gap-2">
                MENU <span class="text-[8px]">▼</span>
            </button>
            <div id="nav-dd" class="hidden absolute top-12 right-0 w-80 bg-white shadow-2xl rounded-3xl p-5 z-[9999] border border-slate-100 max-h-[70vh] overflow-y-auto">
                ${buildMenuContent()}
            </div>
        </div>
    `;

    if (dock) {
        wrapper.innerHTML = buttonHTML;
        dock.appendChild(wrapper);
        console.log('✅ Menu Docked Successfully');
    } else {
        // Fallback if you forget to add the dock ID to a page
        wrapper.className = 'fixed top-4 right-4 z-[9999]';
        wrapper.innerHTML = buttonHTML;
        document.body.appendChild(wrapper);
        console.log('⚠️ No Dock found. Floating fallback used.');
    }

    // MOBILE PANEL INJECTION
    const mobilePanel = document.getElementById('mobileMenu') || document.getElementById('mobile-menu-panel');
    if (mobilePanel && !document.getElementById('mobile-injected-content')) {
        const div = document.createElement('div');
        div.id = 'mobile-injected-content';
        div.className = 'mt-10 pt-10 border-t border-slate-200/20 px-4 pb-20';
        div.innerHTML = buildMenuContent();
        mobilePanel.appendChild(div);
    }
}

function init() {
    if (window.SITE_REGISTRY) inject();
    else setTimeout(init, 500);
}
init();

// Close on outside click
document.addEventListener('click', (e) => {
    const dd = document.getElementById('nav-dd');
    if (dd && !dd.contains(e.target) && !e.target.closest('button')) dd.classList.add('hidden');
});
