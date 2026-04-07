// Internal linking & smooth scroll enhancements
function enhanceInternalLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  console.log('%c🔗 Internal links optimized', 'color:#10b981');
}

document.addEventListener('DOMContentLoaded', enhanceInternalLinks);
