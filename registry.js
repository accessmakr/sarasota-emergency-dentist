// ================================================
// AUTO-GENERATED REGISTRY.JS (subfolder-aware)
// Generated on 2026-04-11T07:08:41.698Z
// ================================================

window.SITE_REGISTRY = {
    version: "2026.04.11-v5",
    lastUpdated: new Date().toISOString(),
    
    // Dynamic folders from actual file structure
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

// Build folder structure from scanned files
const folderMap = {};

// Group files by their directory
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
    folderMap[dir].files.push({
        name: relative,
        label: filename.replace('.html', '').replace(/-/g, ' ').replace(/\//g, ' › '),
        description: ''
    });
});

// Special homepage label
if (folderMap['Root']) {
    const homepage = folderMap['Root'].files.find(f => f.name === 'index.html');
    if (homepage) homepage.label = "Main Homepage";
}

window.SITE_REGISTRY.folders = folderMap;

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

