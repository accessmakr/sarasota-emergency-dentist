// js/internal-links.js
// ======================== INTERNAL LINKS ENGINE ========================

function activateInternalLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    console.log('%c✅ INTERNAL-LINKS activated — smooth scrolling enabled', 'color:#8b5cf6');
}

console.log('%c✅ INTERNAL-LINKS loaded', 'color:#8b5cf6');
