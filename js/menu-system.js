// Advanced menu system (enhances inline mobile menu)
function enhanceMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.toggleMobileMenu) window.toggleMobileMenu();
    });
  });

  console.log('%c📱 Menu system enhanced', 'color:#10b981');
}

document.addEventListener('DOMContentLoaded', enhanceMobileMenu);
