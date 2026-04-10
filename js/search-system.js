// Global search system (extends inline liveSearch)
function globalSearchEnhancement() {
  console.log('%c🔎 Global search system initialized', 'color:#8b5cf6');
  
  // Keyboard shortcut: Ctrl/Cmd + K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('globalSearch') || document.getElementById('mobileSearch');
      if (searchInput) searchInput.focus();
    }
  });
}


document.addEventListener('DOMContentLoaded', globalSearchEnhancement);
