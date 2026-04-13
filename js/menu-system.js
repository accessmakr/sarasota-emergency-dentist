// js/menu-system.js - V5 "The Indestructible Fallback"
console.log('🚀 Menu System: Starting Deep Scan...');

function buildMenuContent() {
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders || Object.keys(window.SITE_REGISTRY.folders).length === 0) {
        console.error('❌ REGISTRY DATA MISSING');
        return '<div class="p-4 text-red-500 text-xs font-bold">⚠️ DATA ERROR: registry.js is empty.</div>';
    }

    let html = `
    <div class="mb-4">
        <input type="text" placeholder="Search pages..." id="menu-search"
               class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-400">
    </div>`;

    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const prefix = (depth > 0 && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') ? '../' : '';

    Object.entries(window.SITE_REGISTRY.folders).forEach(([folderName, folder]) => {
        if (folder.files.length === 0) return;
        
        html += `
        <div class="mb-4 menu-section">
            <div class="text-[10px] font-black text-emerald-600 uppercase tracking-tighter mb-2 px-2 border-b border-emerald-50 pb-1">
                ${folder.icon || '📁'} ${folderName}
            </div>
            ${folder.files.map(file => `
                <a href="${prefix}${file.name === 'index.html' ? '' : file.name}" 
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

    // --- DESKTOP MENU INJECTION ---
    if (!document.getElementById('desktop-nav-menu')) {
        let targetEl = document.querySelector('a[href="#emergency-checklist"]');
        if (!targetEl) targetEl = document.querySelector('header nav');
        if (!targetEl) targetEl = document.querySelector('header');

        const wrapper = document.createElement('div');
        wrapper.id = 'desktop-nav-menu';
        
        const buttonHTML = `
            <button onclick="document.getElementById('nav-dd').classList.toggle('hidden')" 
                    class="px-5 py-3 bg-emerald-500 text-white text-xs font-bold uppercase rounded-full shadow-lg hover:bg-slate-900 transition-all flex items-center gap-2">
                MENU <span class="text-[8px]">▼</span>
            </button>
            <div id="nav-dd" class="hidden absolute top-14 right-0 w-72 bg-white shadow-2xl rounded-3xl p-5 z-[9999] border border-slate-100 max-h-[80vh] overflow-y-auto">
                ${buildMenuContent()}
            </div>
        `;

        if (targetEl) {
            // Standard placement (next to your header elements)
            wrapper.className = 'relative ml-2 flex items-center z-[9999]';
            wrapper.innerHTML = buttonHTML;
            if (targetEl.tagName === 'A') {
                targetEl.parentNode.insertBefore(wrapper, targetEl.nextSibling);
            } else {
                targetEl.appendChild(wrapper);
            }
            console.log('✅ Desktop Menu Injected (Standard Placement)');
        } else {
            // INDESTRUCTIBLE FALLBACK: Floating in the top right corner
            console.warn('⚠️ No header found. Using floating fallback menu.');
            wrapper.className = 'fixed top-4 right-4 z-[9999]'; // Fixed to the top right of the screen
            wrapper.innerHTML = buttonHTML;
            document.body.appendChild(wrapper);
            console.log('✅ Desktop Menu Injected (Floating Fallback)');
        }
    }

    // --- MOBILE MENU INJECTION ---
    const mobileContainer = document.getElementById('mobileMenu');
    if (mobileContainer && !document.getElementById('mobile-nav-content')) {
        const mobileDiv = document.createElement('div');
        mobileDiv.id = 'mobile-nav-content';
        mobileDiv.className = 'mt-10 pt-10 border-t border-slate-100 px-4 pb-20';
        mobileDiv.innerHTML = buildMenuContent();
        mobileContainer.appendChild(mobileDiv);
        console.log('✅ Mobile Menu Injected inside #mobileMenu');
    } else if (!mobileContainer && window.innerWidth < 768 && !document.getElementById('mobile-nav-fallback')) {
        // INDESTRUCTIBLE MOBILE FALLBACK: If mobileMenu doesn't exist, build a floating button
        console.warn('⚠️ No #mobileMenu found. Building floating mobile fallback.');
        const mobileDiv = document.createElement('div');
        mobileDiv.id = 'mobile-nav-fallback';
        mobileDiv.className = 'fixed bottom-4 right-4 z-[9999]';
        mobileDiv.innerHTML = `
            <button onclick="document.getElementById('mobile-nav-dd').classList.toggle('hidden')" 
                    class="px-5 py-4 bg-emerald-500 text-white text-sm font-bold uppercase rounded-full shadow-2xl">
                ☰ Menu
            </button>
            <div id="mobile-nav-dd" class="hidden fixed bottom-20 right-4 left-4 bg-white shadow-2xl rounded-3xl p-5 z-[9999] border border-slate-100 max-h-[70vh] overflow-y-auto">
                ${buildMenuContent()}
            </div>
        `;
        document.body.appendChild(mobileDiv);
    }
}

function start() {
    if (window.SITE_REGISTRY && window.SITE_REGISTRY.folders) {
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
    const desktopDd = document.getElementById('nav-dd');
    const mobileDd = document.getElementById('mobile-nav-dd');
    const btn = e.target.closest('button');
    
    if (desktopDd && !desktopDd.contains(e.target) && (!btn || !btn.innerText.includes('MENU'))) {
        desktopDd.classList.add('hidden');
    }
    if (mobileDd && !mobileDd.contains(e.target) && (!btn || !btn.innerText.includes('Menu'))) {
        mobileDd.classList.add('hidden');
    }
});

start();
