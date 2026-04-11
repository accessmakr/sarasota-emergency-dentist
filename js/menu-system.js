// js/menu-system.js
function capitalize(str) {
    if (str === 'Root') return 'Homepage';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function buildRepoMenuHTML() {
    const registry = window.SITE_REGISTRY;
    let html = `
    <div class="mb-4 relative">
        <input type="text" 
               class="repo-search-input w-full px-4 py-3 border border-slate-200 rounded-3xl text-sm focus:outline-none focus:border-emerald-300 placeholder:text-slate-400"
               placeholder="🔎 Search pages, services, locations...">
        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔎</span>
    </div>`;

    Object.keys(registry.folders).forEach(folderName => {
        const folder = registry.folders[folderName];
        html += `
        <div class="mb-6">
            <div class="flex items-center gap-x-2 px-4 py-2 text-emerald-600 font-semibold text-sm uppercase tracking-widest border-b mb-2">
                <span>${folder.icon}</span> ${capitalize(folderName)}
            </div>
            ${folder.files.map(file => `
                <a href="${file.name}" 
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
    // Desktop button — now labeled "Menu"
    const navRight = document.querySelector('.flex.items-center.gap-x-4');
    if (navRight) {
        const existing = document.getElementById('filesFoldersBtn');
        if (!existing) {
            navRight.insertAdjacentHTML('beforeend', `
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

            // Search system (desktop)
            const desktopDd = document.getElementById('desktopFilesDropdown');
            if (desktopDd) {
                const searchInput = desktopDd.querySelector('.repo-search-input');
                if (searchInput) {
                    searchInput.addEventListener('input', function () {
                        const term = this.value.toLowerCase().trim();
                        const links = desktopDd.querySelectorAll('a');
                        links.forEach(link => {
                            const labelEl = link.querySelector('.font-medium');
                            const label = labelEl ? labelEl.textContent.toLowerCase() : '';
                            const href = link.getAttribute('href') || '';
                            link.style.display = (!term || label.includes(term) || href.toLowerCase().includes(term)) ? 'flex' : 'none';
                        });
                    });
                }
            }
        }
    }

    // Mobile section
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

            // Search system (mobile)
            const mobileInput = section.querySelector('.repo-search-input');
            if (mobileInput) {
                mobileInput.addEventListener('input', function () {
                    const term = this.value.toLowerCase().trim();
                    const container = section.querySelector('.bg-slate-50');
                    const links = container ? container.querySelectorAll('a') : section.querySelectorAll('a');
                    links.forEach(link => {
                        const labelEl = link.querySelector('.font-medium');
                        const label = labelEl ? labelEl.textContent.toLowerCase() : '';
                        const href = link.getAttribute('href') || '';
                        link.style.display = (!term || label.includes(term) || href.toLowerCase().includes(term)) ? 'flex' : 'none';
                    });
                });
            }
        }
    }
}

window.toggleFilesFoldersDropdown = function() {
    const dd = document.getElementById('desktopFilesDropdown');
    if (dd) dd.classList.toggle('hidden');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectRepoMenu);
} else {
    injectRepoMenu();
}

console.log('%c✅ MENU-SYSTEM + SEARCH loaded — index.html homepage, subfolders, and live search working', 'color:#10b981; font-weight:bold');
