// js/menu-system.js - V3 "The Aggressive Fix"
console.log('🚀 Menu System: Starting Deep Scan...');

function buildMenuContent() {
    // 1. DATA CHECK
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders || Object.keys(window.SITE_REGISTRY.folders).length === 0) {
        console.error('❌ REGISTRY DATA MISSING');
        return '<div class="p-4 text-red-500 text-xs font-bold">⚠️ DATA ERROR: registry.js is empty. Run GitHub Action.</div>';
    }

    let html = `
    <div class="mb-4">
        <input type="text" placeholder="Search pages..." id="menu-search"
               class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-400">
    </div>`;

    Object.entries(window.SITE_REGISTRY.folders).forEach(([folderName, folder]) => {
        if (folder.files.length === 0) return;
        
        html += `
        <div class="mb-4 menu-section">
            <div class="text-[10px] font-black text-emerald-600 uppercase tracking-tighter mb-2 px-2 border-b border-emerald-50 pb-1">
                ${folder.icon || '📁'} ${folderName}
            </div>
            ${folder.files.map(file => `
                <a href="${file.name === 'index.html' ? '/' : '/' + file.name}" 
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
    console.log('💉 Attempting injection...');

    // DESKTOP: Find the button that says "Free Emergency Checklist"
    const checklistBtn = document.querySelector('a[href="#emergency-checklist"]');
    if (checklistBtn && !document.getElementById('desktop-nav-menu')) {
        const wrapper = document.createElement('div');
        wrapper.id = 'desktop-nav-menu';
        wrapper.className = 'relative ml-2';
        wrapper.innerHTML = `
            <button onclick="document.getElementById('nav-dd').classList.toggle('hidden')" 
                    class="px-5 py-3 bg-emerald-500 text-white text-xs font-bold uppercase rounded-full hover:bg-slate-900 transition-all flex items-center gap-2">
                MENU <span class="text-[8px]">▼</span>
            </button>
            <div id="nav-dd" class="hidden absolute top-14 right-0 w-72 bg-white shadow-2xl rounded-3xl p-5 z-[9999] border border-slate-100 max-h-[80vh] overflow-y-auto">
                ${buildMenuContent()}
            </div>
        `;
        checklistBtn.parentNode.insertBefore(wrapper, checklistBtn);
        console.log('✅ Desktop Menu Injected');
    }

    // MOBILE: Find the #mobileMenu ID
    const mobileContainer = document.getElementById('mobileMenu');
    if (mobileContainer && !document.getElementById('mobile-nav-content')) {
        const mobileDiv = document.createElement('div');
        mobileDiv.id = 'mobile-nav-content';
        mobileDiv.className = 'mt-10 pt-10 border-t border-slate-100 px-4';
        mobileDiv.innerHTML = buildMenuContent();
        mobileMenu.appendChild(mobileDiv);
        console.log('✅ Mobile Menu Injected');
    }
}

// Ensure it runs even if registry loads late
function start() {
    if (window.SITE_REGISTRY) {
        inject();
    } else {
        console.log('⏳ Registry not ready, retrying...');
        setTimeout(start, 500);
    }
}

// Search Logic
document.addEventListener('input', (e) => {
    if (e.target.id === 'menu-search') {
        const val = e.target.value.toLowerCase();
        const links = e.target.closest('div').parentElement.querySelectorAll('a');
        links.forEach(l => {
            const match = l.textContent.toLowerCase().includes(val);
            l.style.display = match ? 'flex' : 'none';
        });
    }
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    const dd = document.getElementById('nav-dd');
    const btn = e.target.closest('button');
    if (dd && !dd.contains(e.target) && (!btn || !btn.innerText.includes('MENU'))) {
        dd.classList.add('hidden');
    }
});

start();
