// js/menu-system.js - UNIVERSAL MASTER EDITION
console.log('🚀 Universal Menu System: Initializing...');

/**
 * 1. Build the Menu Content
 * Handles pathing (../) and folder casing automatically
 */
function buildMenuContent() {
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders) {
        return '<div class="p-4 text-red-500 text-xs">⚠️ Registry Data Missing</div>';
    }

    // Determine if we are in a subfolder to fix links
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const isSubpage = depth > 0 && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/';
    const prefix = isSubpage ? '../' : '';

    let html = `
    <div class="mb-4">
        <input type="text" placeholder="Search pages..." id="menu-search"
               class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-400 text-slate-900">
    </div>`;

    // Iterate through all folders in the registry
    Object.entries(window.SITE_REGISTRY.folders).forEach(([folderName, folder]) => {
        if (!folder.files || folder.files.length === 0) return;
        
        html += `
        <div class="mb-4 menu-section">
            <div class="text-[10px] font-black text-emerald-600 uppercase tracking-tighter mb-2 px-2 border-b border-emerald-50 pb-1">
                ${folder.icon || '📁'} ${folderName}
            </div>
            ${folder.files.map(file => {
                // Determine the correct URL
                let url = prefix + file.name;
                if (file.name === 'index.html' && !isSubpage) url = '/';
                
                return `
                <a href="${url}" 
                   class="flex items-center gap-x-3 px-3 py-2 hover:bg-emerald-50 rounded-xl text-sm text-slate-700 transition-all group">
                    <span class="text-xs opacity-40">📄</span>
                    <span class="font-medium group-hover:text-emerald-700">${file.label}</span>
                </a>`;
            }).join('')}
        </div>`;
    });
    return html;
}

/**
 * 2. The Injection Engine
 * Hunts for a header to dock in, falls back to floating if needed.
 */
function injectMenu() {
    if (document.getElementById('nav-menu-wrapper')) return; // Avoid double injection

    const menuContent = buildMenuContent();
    
    // --- DESKTOP INJECTION ---
    const desktopWrapper = document.createElement('div');
    desktopWrapper.id = 'nav-menu-wrapper';
    
    // Core Button & Dropdown HTML
    const desktopHTML = `
        <div class="relative inline-block text-left">
            <button onclick="document.getElementById('nav-dd').classList.toggle('hidden')" 
                    class="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase rounded-full shadow-lg hover:bg-emerald-600 transition-all flex items-center gap-2 border border-slate-700">
                EXPLORE <span class="text-[8px]">▼</span>
            </button>
            <div id="nav-dd" class="hidden absolute top-14 right-0 w-80 bg-white shadow-2xl rounded-3xl p-5 z-[9999] border border-slate-100 max-h-[70vh] overflow-y-auto">
                ${menuContent}
            </div>
        </div>
    `;

    // Strategy: Look for the best place to put the desktop menu
    let desktopTarget = document.querySelector('a[href="#emergency-checklist"]') || // Homepage style
                        document.getElementById('mobile-menu-btn') ||              // Subpage style
                        document.querySelector('header nav .flex') ||              // Structural
                        document.querySelector('header .flex-row-reverse') ||      // Flex reverse
                        document.querySelector('header');                          // Any header

    if (desktopTarget && window.innerWidth >= 768) {
        desktopWrapper.className = 'ml-4 flex items-center z-[9999]';
        desktopWrapper.innerHTML = desktopHTML;
        
        // If target is a link or button, insert next to it. If it's a container, append.
        if (desktopTarget.tagName === 'A' || desktopTarget.tagName === 'BUTTON') {
            desktopTarget.parentNode.insertBefore(desktopWrapper, desktopTarget);
        } else {
            desktopTarget.appendChild(desktopWrapper);
        }
        console.log('✅ Desktop Menu Docked');
    } else if (window.innerWidth >= 768) {
        // Fallback: Floating Top Right
        desktopWrapper.className = 'fixed top-6 right-6 z-[9999]';
        desktopWrapper.innerHTML = desktopHTML;
        document.body.appendChild(desktopWrapper);
        console.log('✅ Desktop Menu Floating');
    }

    // --- MOBILE INJECTION ---
    const mobileContainer = document.getElementById('mobileMenu') || 
                            document.getElementById('mobile-menu-panel');

    if (mobileContainer) {
        const mobileDiv = document.createElement('div');
        mobileDiv.id = 'mobile-nav-injected';
        mobileDiv.className = 'mt-8 pt-8 border-t border-slate-700/50 px-4 pb-20';
        
        // Adjust colors for dark mobile panels
        let darkContent = menuContent
            .replace(/text-slate-700/g, 'text-slate-200')
            .replace(/bg-slate-50/g, 'bg-slate-800 text-white')
            .replace(/border-slate-200/g, 'border-slate-700');

        mobileDiv.innerHTML = `<h3 class="text-emerald-400 text-[10px] font-black uppercase mb-4 tracking-widest text-center">Directory</h3>` + darkContent;
        mobileContainer.appendChild(mobileDiv);
        console.log('✅ Mobile Menu Docked');
    } else if (window.innerWidth < 768) {
        // Fallback: Floating Bottom Right Action Button
        const fab = document.createElement('div');
        fab.id = 'mobile-fab';
        fab.className = 'fixed bottom-6 right-6 z-[9999]';
        fab.innerHTML = `
            <button onclick="document.getElementById('fab-dd').classList.toggle('hidden')" 
                    class="w-14 h-14 bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl">
                ☰
            </button>
            <div id="fab-dd" class="hidden fixed bottom-24 right-6 left-6 bg-white shadow-2xl rounded-3xl p-6 border border-slate-100 max-h-[60vh] overflow-y-auto">
                ${menuContent}
            </div>
        `;
        document.body.appendChild(fab);
        console.log('✅ Mobile FAB Active');
    }
}

/**
 * 3. Event Listeners
 */
document.addEventListener('input', (e) => {
    if (e.target.id === 'menu-search') {
        const val = e.target.value.toLowerCase();
        const links = e.target.closest('div').parentElement.querySelectorAll('a');
        links.forEach(l => l.style.display = l.textContent.toLowerCase().includes(val) ? 'flex' : 'none');
    }
});

document.addEventListener('click', (e) => {
    const dds = ['nav-dd', 'fab-dd'];
    dds.forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.classList.contains('hidden') && !el.contains(e.target) && !e.target.closest('button')) {
            el.classList.add('hidden');
        }
    });
});

// Start once Registry is ready
function init() {
    if (window.SITE_REGISTRY) injectMenu();
    else setTimeout(init, 500);
}
init();
