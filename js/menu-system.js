// js/menu-system.js
console.log('🚀 menu-system.js v14 loading — tailored to sarasotav3.html / index.html');

function capitalize(str) {
    if (str === 'Root') return 'Homepage';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function buildRepoMenuHTML() {
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders) {
        console.error('❌ SITE_REGISTRY not ready yet');
        return '<div class="p-6 text-red-500 text-sm">Loading pages… please refresh</div>';
    }

    console.log('✅ Registry loaded —', Object.keys(window.SITE_REGISTRY.folders).length, 'folders with', Object.values(window.SITE_REGISTRY.folders).reduce((a, f) => a + f.files.length, 0), 'pages');

    let html = `
    <div class="mb-4 relative">
        <input type="text" id="repo-search-input"
               class="repo-search-input w-full px-4 py-3 border border-slate-200 rounded-3xl text-sm focus:outline-none focus:border-emerald-300 placeholder:text-slate-400"
               placeholder="🔎 Search pages, services, locations...">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔎</span>
    </div>`;

    Object.keys(window.SITE_REGISTRY.folders).forEach(folderName => {
        const folder = window.SITE_REGISTRY.folders[folderName];
        html += `
        <div class="mb-6">
            <div class="flex items-center gap-x-2 px-4 py-2 text-emerald-600 font-semibold text-sm uppercase tracking-widest border-b mb-2">
                <span>${folder.icon}</span> ${capitalize(folderName)}
            </div>
            ${folder.files.map(file => `
                <a href="${file.name === 'index.html' ? '/' : file.name}" 
                   class="flex items-center gap-x-3 px-4 py-3 hover:bg-slate-100 rounded-2xl text-sm transition-all">
                    <span class="text-violet-500">📄</span>
                    <div class="flex-1 font-medium">${file.label}</div>
                    <span class="text-[10px] font-mono text-slate-300">${file.name}</span>
                </a>
            `).join('')}
        </div>`;
    });
    return html;
}

function injectRepoMenu() {
    console.log('🔧 Attempting injection into your exact nav...');

    // === DESKTOP: exact match to your right-side flex container ===
    const desktopRight = document.querySelector('.flex.items-center.gap-x-4');
    if (desktopRight) {
        const existing = document.getElementById('filesFoldersBtn');
        if (!existing) {
            desktopRight.insertAdjacentHTML('beforeend', `
            <div class="relative group ml-4">
                <button id="filesFoldersBtn" onclick="toggleFilesFoldersDropdown()" 
                        class="px-6 py-3 text-sm font-semibold flex items-center gap-x-2 hover:bg-slate-100 rounded-3xl border border-transparent hover:border-slate-200">
                    ☰ Menu 
                    <span class="text-xl">▼</span>
                </button>
                <div id="desktopFilesDropdown" class="hidden absolute top-14 right-0 bg-white shadow-2xl rounded-3xl w-96 p-6 z-[9999] max-h-[520px] overflow-auto border border-slate-100">
                    ${buildRepoMenuHTML()}
                </div>
            </div>`);

            // Desktop live search
            const dd = document.getElementById('desktopFilesDropdown');
            const input = dd?.querySelector('#repo-search-input');
            if (input) {
                input.addEventListener('input', function () {
                    const term = this.value.toLowerCase().trim();
                    const links = dd.querySelectorAll('a');
                    links.forEach(link => {
                        const label = link.querySelector('.font-medium')?.textContent.toLowerCase() || '';
                        const href = link.getAttribute('href') || '';
                        link.style.display = (!term || label.includes(term) || href.includes(term)) ? 'flex' : 'none';
                    });
                });
            }
            console.log('✅ Desktop ☰ Menu button injected into .flex.items-center.gap-x-4');
        }
    } else {
        console.warn('⚠️ Desktop nav not found — using floating fallback button');
        document.body.insertAdjacentHTML('beforeend', `
            <button onclick="toggleFilesFoldersDropdown()" 
                    class="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-x-2 z-[99999] text-sm font-semibold">
                ☰ Menu
            </button>
            <div id="desktopFilesDropdown" class="hidden fixed bottom-24 right-6 bg-white shadow-2xl rounded-3xl w-96 p-6 z-[99999] max-h-[520px] overflow-auto border border-slate-100">
                ${buildRepoMenuHTML()}
            </div>`);
    }

    // === MOBILE: exact id="mobileMenu" from your HTML ===
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        const existing = mobileMenu.querySelector('.repo-mobile-section');
        if (!existing) {
            const section = document.createElement('div');
            section.className = 'pt-8 border-t mt-6 repo-mobile-section';
            section.innerHTML = `
                <div class="uppercase text-xs tracking-widest mb-4 text-slate-500 px-2">☰ MENU</div>
                <div class="bg-slate-50 rounded-3xl p-3 max-h-80 overflow-auto">
                    ${buildRepoMenuHTML()}
                </div>`;
            mobileMenu.appendChild(section);

            // Mobile live search
            const mobileInput = section.querySelector('#repo-search-input');
            if (mobileInput) {
                mobileInput.addEventListener('input', function () {
                    const term = this.value.toLowerCase().trim();
                    const links = section.querySelectorAll('a');
                    links.forEach(link => {
                        const label = link.querySelector('.font-medium')?.textContent.toLowerCase() || '';
                        const href = link.getAttribute('href') || '';
                        link.style.display = (!term || label.includes(term) || href.includes(term)) ? 'flex' : 'none';
                    });
                });
            }
            console.log('✅ Mobile menu section injected into #mobileMenu');
        }
    } else {
        console.warn('⚠️ #mobileMenu not found');
    }
}

window.toggleFilesFoldersDropdown = function() {
    const dd = document.getElementById('desktopFilesDropdown');
    if (dd) dd.classList.toggle('hidden');
};

// Smart init with retry until registry + DOM are ready
function initMenu() {
    if (typeof window.SITE_REGISTRY === 'undefined' || !window.SITE_REGISTRY.folders) {
        console.warn('Registry not ready — retrying in 200ms');
        setTimeout(initMenu, 200);
        return;
    }
    injectRepoMenu();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
} else {
    initMenu();
}

// Extra safety retry after 1.5 seconds
setTimeout(() => {
    if (!document.getElementById('filesFoldersBtn')) {
        console.log('Extra retry triggered');
        initMenu();
    }
}, 1500);

console.log('%c✅ MENU-SYSTEM v14 + SEARCH ready for your exact nav', 'color:#10b981; font-weight:bold');
