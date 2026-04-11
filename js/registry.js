// js/registry.js
window.SITE_REGISTRY = {
    version: "2026.04.11-v4",
    lastUpdated: new Date().toISOString(),
    
    folders: {
        "Specialties": {
            icon: "🦷",
            files: [
                { name: "index.html", label: "General Dentistry", description: "Routine & preventive care" },
                { name: "pd.html", label: "Pediatric Dentistry", description: "Children & adolescents" },
                { name: "odo.html", label: "Orthodontics", description: "Braces & Invisalign" },
                { name: "per.html", label: "Periodontics", description: "Gums & bone" },
                { name: "end.html", label: "Endodontics", description: "Root canals" },
                { name: "oms.html", label: "Oral & Maxillofacial Surgery", description: "Extractions & trauma" },
                { name: "pro.html", label: "Prosthodontics", description: "Crowns, bridges, dentures" },
                { name: "cod.html", label: "Cosmetic Dentistry", description: "Veneers & smile design" },
                { name: "emd.html", label: "Emergency Dentistry", description: "Urgent 24/7 care" },
                { name: "imd.html", label: "Implant Dentistry", description: "Implants & rescue" },
                { name: "sda.html", label: "Sedation Dentistry", description: "Anxiety-free care" },
                { name: "ged.html", label: "Geriatric Dentistry", description: "Seniors & complex cases" },
                { name: "snd.html", label: "Special Needs Dentistry", description: "Medically complex patients" },
                { name: "red.html", label: "Restorative Dentistry", description: "Fillings & reconstructions" },
                { name: "pwd.html", label: "Preventive Dentistry", description: "Hygiene & wellness" },
                { name: "ttop.html", label: "TMJ / Orofacial Pain", description: "Jaw disorders" },
                { name: "lad.html", label: "Laser Dentistry", description: "Minimally invasive" },
                { name: "sdssa.html", label: "Sleep Dentistry", description: "Snoring & sleep apnea" }
            ]
        },
        "Legal": {
            icon: "📜",
            files: [
                { name: "privacy-policy.html", label: "Privacy Policy" },
                { name: "cookies-policy.html", label: "Cookies Policy" },
                { name: "terms-of-use.html", label: "Terms of Use" },
                { name: "disclaimer.html", label: "Disclaimer" },
                { name: "dmca.html", label: "DMCA" },
                { name: "accessibility.html", label: "Accessibility" },
                { name: "do-not-sell-my-data.html", label: "Do Not Sell My Data" },
                { name: "contact.html", label: "Contact" },
                { name: "about.html", label: "About Us" }
            ]
        },
        "Other": {
            icon: "📁",
            files: [
                { name: "sarasotav3.html", label: "Main Homepage", description: "Current page" },
                { name: "emergency-dental-checklist.html", label: "Free Emergency Checklist", description: "PDF Guide" }
            ]
        }
    },
    
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

console.log('%c✅ SITE_REGISTRY loaded — all pages ready', 'color:#10b981; font-weight:bold');
