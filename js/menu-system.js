// js/menu-system.js - V10 "The Silo Header Edition" - UPDATED ORDER: Home → Guide → Location → Directory
console.log('🚀 Menu System V10: Initializing Silo Header with exact order...');

function getPrefix() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    return (depth > 0 && !window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') ? '../' : '';
}

function buildFolderLinks(folderKey) {
    if (!window.SITE_REGISTRY || !window.SITE_REGISTRY.folders[folderKey]) return '';
    const folder = window.SITE_REGISTRY.folders[folderKey];
    const prefix = getPrefix();

    return folder.files.map(file => `
        <a href="${prefix}${file.name}" class="block px-4 py-2 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors">
            ${file.label.split(' • ')[0]}
        </a>
    `).join('');
}

function injectHeaderNav() {
    const guideDock = document.getElementById('nav-guide-contents');
    const locationDock = document.getElementById('nav-location-contents');
    
    if (guideDock) guideDock.innerHTML = buildFolderLinks('Guide');
    if (locationDock) locationDock.innerHTML = buildFolderLinks('Location');
}

function buildDirectoryContent() {
    if (!window.SITE_REGISTRY) return '';
    const prefix = getPrefix();
    
    let html = `<div class="mb-4">
        <a href="${prefix}index.html" class="flex items-center justify-center w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase">🏠 Home</a>
    </div>`;

    // EXACT ORDER YOU REQUESTED — NO ASSUMPTIONS
    const orderedSections = [
        { key: 'Guide',    display: 'Guide' },
        { key: 'Location', display: 'Location' },
        { key: 'root',     display: 'Directory' }
    ];

    orderedSections.forEach(({ key, display }) => {
        if (!window.SITE_REGISTRY.folders[key]) return;
        
        html += `<div class="mb-4">
            <div class="text-[10px] font-black text-emerald-600 uppercase mb-1 border-b border-emerald-50">${display}</div>
            ${window.SITE_REGISTRY.folders[key].files.map(f => `
                <a href="${prefix}${f.name}" class="block py-1 text-sm text-slate-600 hover:text-emerald-600">
                    ${f.label.split(' • ')[0]}
                </a>
            `).join('')}
        </div>`;
    });

    return html;
}

function inject() {
    const masterDock = document.getElementById('master-nav-dock');
    if (masterDock && !document.getElementById('nav-menu-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.id = 'nav-menu-wrapper';
        wrapper.innerHTML = `
            <div class="relative inline-block text-left">
                <button onclick="document.getElementById('nav-dd').classList.toggle('hidden')" 
                        class="px-4 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-full shadow-lg hover:bg-emerald-600 transition-all flex items-center gap-2">
                    MENU ☰
                </button>
                <div id="nav-dd" class="hidden absolute top-12 right-0 w-64 bg-white shadow-2xl rounded-2xl p-4 z-[9999] border border-slate-100 max-h-[70vh] overflow-y-auto text-slate-800">
                    ${buildDirectoryContent()}
                </div>
            </div>`;
        masterDock.appendChild(wrapper);
    }
    injectHeaderNav();
}

function init() {
    if (window.SITE_REGISTRY) inject();
    else setTimeout(init, 500);
}
init();
