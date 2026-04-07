// Registry of all shared components and providers
window.SARASOTA_REGISTRY = {
  version: "2026.04.07",
  domain: "www.sarasotaemergencydentist.com",
  providersCount: 21,
  lastUpdated: "April 7, 2026",
  
  getProviderById: (id) => {
    return window.dentists ? window.dentists.find(d => d.id === id) : null;
  },
  
  init: () => {
    console.log('%c✅ Sarasota Emergency Dentist Registry v2026.04.07 initialized', 'color:#10b981; font-weight:bold');
  }
};

window.SARASOTA_REGISTRY.init();
