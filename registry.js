// ================================================
// AUTO-GENERATED REGISTRY.JS — fully dynamic
// Generated on 2026-04-11T07:28:10.840Z
// Supports index.html + /guide/ + /location/ + any subfolder
// ================================================

window.SITE_REGISTRY = {
    version: "2026.04.11-v6",
    lastUpdated: new Date().toISOString(),
    
    folders: {},

    getAllPages: function() {
        let all = [];
        Object.keys(this.folders).forEach(folder => {
            this.folders[folder].files.forEach(file => {
                all.push({ folder: folder, ...file });
            });
        });
        return all;
    }
};

// Build folder structure from actual files
const folderMap = {};

htmlFiles.forEach(file => {
    const relative = path.relative('.', file).replace(/\\/g, '/');
    const dir = path.dirname(relative) === '.' ? 'Root' : relative.split('/')[0];
    const filename = path.basename(relative);
    
    if (!folderMap[dir]) {
        folderMap[dir] = {
            icon: dir === 'Root' || dir === 'guide' ? '🦷' : dir === 'location' ? '📍' : '📁',
            files: []
        };
    }
    
    let label = titleMap[relative] || filename.replace('.html', '').replace(/-/g, ' ').replace(/\//g, ' › ');
    
    folderMap[dir].files.push({
        name: relative,
        label: label,
        description: ''
    });
});

// Special homepage handling
if (folderMap['Root']) {
    const homepage = folderMap['Root'].files.find(f => f.name === 'index.html');
    if (homepage) {
        homepage.label = "Main Homepage";
        homepage.name = '/';                    // clean root link
    }
}

window.SITE_REGISTRY.folders = folderMap;

// Extract dentists (unchanged)
const dentists = [
            {
                id: 3,
                name: "Aspire Dental South Gate Ridge",
                rating: 4.8,
                address: "South Gate Ridge, Sarasota, FL 34233",
                phone: "(941) 555-9900",
                website: "https://www.aspiredentalsarasota.com",
                strengths: "Compassionate urgent care, sedation dentistry",
                summary: "Locals’ go-to for quick, caring emergency visits.",
                categories: [];

