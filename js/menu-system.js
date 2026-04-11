// js/menu-system.js
console.log('🔍 Menu System: Initializing...');

function buildRepoMenuHTML() {
    // Safety check: If registry is empty, show a loading state instead of a blank box
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders || Object.keys(window.SITE_REGISTRY.folders).length === 0) {
        console.error('❌ Menu Error: SITE_REGISTRY is empty or missing.');
        return '<div class="p-4 text-slate-500 text-sm">No pages found in registry.</div>';
    }

    let html = `
    <div class="mb-4 relative">
        <input type="text" id="repo-search-input"
               class="w-full px-4 py-3 border border-slate-200 rounded-3xl text-sm focus:outline-none focus:border-emerald-300 placeholder:text-slate-400"
               placeholder="Search site...">
    </div>`;

    Object.keys(window.SITE_REGISTRY.folders).forEach(folderName => {
        const folder = window.SITE_REGISTRY.folders[folderName];
        if (folder.files.length === 0) return;

        html += `
        <div class="mb-6 repo-folder-section">
            <div class="flex items-center gap-x-2 px-4 py-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest border-b mb-2">
                ${folder.icon} ${folderName}
            </div>
            ${folder.files.map(file => `
                <a href="${file.name === 'index.html' ? '/' : '/' + file.name}" 
                   class="flex items-center gap-x-3 px-4 py-3 hover:bg-slate-50 rounded-2xl text-sm transition-all group">
                    <span class="opacity-30 group-hover:opacity-100">📄</span>
                    <div class="flex-1 font-medium text-slate-700">${file.label}</div>
                </a>
            `).join('')}
        </div>`;
    });
    return html;
}

function injectRepoMenu() {
    console.log('💉 Menu System: Attempting injection...');

    // 1. DESKTOP TARGET: Find the "Free Emergency Checklist" button container
    // Specifically looking for the nav area to avoid the top social bar
    const desktopNav = document.querySelector('nav .flex.items-center.gap-x-4');
    
    if (desktopNav && !document.getElementById('filesFoldersBtn')) {
        const btnHtml = `
        <div class="relative ml-2" id="menu-wrapper-desktop">
            <button id="filesFoldersBtn" onclick="window.toggleFilesFoldersDropdown()" 
                    class="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-emerald-600 transition-all flex items-center gap-x-2">
                <span>Directory</span>
                <span class="text-[10px]">▼</span>
            </button>
            <div id="desktopFilesDropdown" class="hidden absolute top-12 right-0 bg-white shadow-2xl rounded-3xl w-80 p-5 z-[9999] max-h-[500px] overflow-auto border border-slate-100">
                ${buildRepoMenuHTML()}
            </div>
        </div>`;
        desktopNav.insertAdjacentHTML('beforeend', btnHtml);
        console.log('✅ Menu System: Desktop injection successful');
    } else {
        console.warn('⚠️ Menu System: Could not find Desktop Nav container.');
    }

    // 2. MOBILE TARGET: Find the #mobileMenu div
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && !document.getElementById('mobile-directory-section')) {
        const mobileSection = document.createElement('div');
        mobileSection.id = 'mobile-directory-section';
        mobileSection.className = 'mt-8 pt-8 border-t border-slate-100';
        mobileSection.innerHTML = `
            <div class="text-[10px] font-bold tracking-[0.2em] text-slate-400 mb-4 px-4 uppercase">Site Directory</div>
            <div class="px-2">${buildRepoMenuHTML()}</div>
        `;
        mobileMenu.appendChild(mobileSection);
        console.log('✅ Menu System: Mobile injection successful');
    }

    // Initialize Search Functionality
    setupSearchListeners();
}

function setupSearchListeners() {
    const inputs = document.querySelectorAll('#repo-search-input');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const container = e.target.closest('div').parentElement;
            container.querySelectorAll('a').forEach(link => {
                const text = link.textContent.toLowerCase();
                link.style.display = text.includes(term) ? 'flex' : 'none';
            });
            // Hide folder headers if no links are visible
            container.querySelectorAll('.repo-folder-section').forEach(section => {
                const hasVisible = Array.from(section.querySelectorAll('a')).some(a => a.style.display !== 'none');
                section.style.display = hasVisible ? 'block' : 'none';
            });
        });
    });
}

window.toggleFilesFoldersDropdown = function() {
    const dd = document.getElementById('desktopFilesDropdown');
    if (dd) dd.classList.toggle('hidden');
};

// Global click-away closer
document.addEventListener('click', (e) => {
    const dd = document.getElementById('desktopFilesDropdown');
    const btn = document.getElementById('filesFoldersBtn');
    if (dd && !dd.contains(e.target) && !btn.contains(e.target)) {
        dd.classList.add('hidden');
    }
});

function initMenu() {
    if (typeof window.SITE_REGISTRY === 'undefined') {
        setTimeout(initMenu, 100);
        return;
    }
    injectRepoMenu();
}

// Kickoff
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
} else {
    initMenu();
}
