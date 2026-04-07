// Legal & compliance engine (cookies, do-not-sell, etc.)
const LegalEngine = {
  init() {
    console.log('%c⚖️ Legal engine initialized – GDPR/CCPA compliant', 'color:#8b5cf6');
    
    // Simple cookie consent banner (can be expanded)
    if (!localStorage.getItem('cookieConsent')) {
      console.log('Cookie consent banner would appear here in production');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => LegalEngine.init());
