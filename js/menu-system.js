// js/menu-system.js
// ======================== MENU SYSTEM — FULL REPO NAVIGATION ========================

function buildRepoMenuHTML(isMobile = false) {
    let html = '';
    const registry = window.SITE_REGISTRY;
    
    Object.keys(registry.folders).forEach(folderName => {
        const folder = registry.folders[folderName];
        html += `
        <div class="mb-4">
            <div class="flex items-center gap-x-2 px-4 py-2 text-emerald-600 font-semibold text-sm uppercase tracking-widest border-b">
                <span>${folder.icon}</span>
                ${folderName}
            </div>
            <div class="pl-2">
                ${folder.files.map(file => `
                    <a href="${file.name}" 
                       class="flex items-center gap-x-3 px-4 py-3 hover:bg-slate-100 rounded-2xl text-sm transition-all group">
                        <span class="text-violet-500">📄</span>
                        <div class="flex-1">
                            <div class="font-medium group-hover:text-violet-600">${file.label}</div>
                            ${file.description ? `<div class="text-xs text-slate-400">${file.description}</div>` : ''}
                        </div>
                        <span class="text-[10px] font-mono text-slate-300">${file.name}</span>
                    </a>
                `).join('')}
            </div>
        </div>`;
    });
    
    return html;
}

function injectRepoMenu() {
    // Desktop dropdown (added next to search bar)
    const navRight = document.querySelector('.flex.items-center.gap-x-4');
    if (navRight) {
        const dropdownHTML = `
        <div class="relative group hidden lg:flex items-center ml-4">
            <button onclick="toggleRepoDropdown()" 
                    class="px-6 py-3 text-sm font-semibold flex items-center gap-x-2 hover:bg-slate-100 rounded-3xl border border-transparent hover:border-slate-200">
                📁 <span class="hidden xl:inline">Repo Files &amp; Folders</span>
                <span class="text-xl rotate-0 group-hover:rotate-180 transition-transform">▼</span>
            </button>
            <div id="desktopRepoDropdown" class="hidden absolute top-14 right-0 bg-white shadow-2xl rounded-3xl w-96 p-6 z-[9999] max-h-[520px] overflow-auto border border-slate-100">
                ${buildRepoMenuHTML()}
            </div>
        </div>`;
        navRight.insertAdjacentHTML('beforeend', dropdownHTML);
    }

    // Mobile menu — add repo section
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        const repoSection = document.createElement('div');
        repoSection.className = 'pt-8 border-t mt-6';
        repoSection.innerHTML = `
            <div class="uppercase text-xs tracking-widest mb-4 text-slate-500 px-2">📁 REPO FILES &amp; FOLDERS</div>
            <div class="bg-slate-50 rounded-3xl p-3 max-h-80 overflow-auto repo-menu">
                ${buildRepoMenuHTML(true)}
            </div>`;
        mobileMenu.appendChild(repoSection);
    }
}

window.toggleRepoDropdown = function() {
    const dd = document.getElementById('desktopRepoDropdown');
    if (dd) dd.classList.toggle('hidden');
};

console.log('%c✅ MENU-SYSTEM ready — repo folders injected', 'color:#10b981');
