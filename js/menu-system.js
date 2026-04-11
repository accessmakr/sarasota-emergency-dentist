// js/menu-system.js
function buildRepoMenuHTML() {
    let html = '';
    const registry = window.SITE_REGISTRY;
    Object.keys(registry.folders).forEach(folderName => {
        const folder = registry.folders[folderName];
        html += `
        <div class="mb-6">
            <div class="flex items-center gap-x-2 px-4 py-2 text-emerald-600 font-semibold text-sm uppercase tracking-widest border-b mb-2">
                <span>${folder.icon}</span> ${folderName}
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
    // Desktop button (always visible on lg+)
    const navRight = document.querySelector('.flex.items-center.gap-x-4');
    if (navRight) {
        const existing = document.getElementById('filesFoldersBtn');
        if (!existing) {
            navRight.insertAdjacentHTML('beforeend', `
            <div class="relative group ml-4">
                <button id="filesFoldersBtn" onclick="toggleFilesFoldersDropdown()" 
                        class="px-6 py-3 text-sm font-semibold flex items-center gap-x-2 hover:bg-slate-100 rounded-3xl border border-transparent hover:border-slate-200">
                    📁 Files &amp; Folders 
                    <span class="text-xl">▼</span>
                </button>
                <div id="desktopFilesDropdown" class="hidden absolute top-14 right-0 bg-white shadow-2xl rounded-3xl w-96 p-6 z-[9999] max-h-[520px] overflow-auto border border-slate-100">
                    ${buildRepoMenuHTML()}
                </div>
            </div>`);
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
                <div class="uppercase text-xs tracking-widest mb-4 text-slate-500 px-2">📁 FILES &amp; FOLDERS</div>
                <div class="bg-slate-50 rounded-3xl p-3 max-h-80 overflow-auto">
                    ${buildRepoMenuHTML()}
                </div>`;
            mobileMenu.appendChild(section);
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
console.log('%c✅ MENU-SYSTEM injected — subfolders now visible on desktop + mobile', 'color:#10b981; font-weight:bold');
