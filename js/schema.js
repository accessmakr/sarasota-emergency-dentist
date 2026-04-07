// Dynamic Schema.org markup injector
function injectDynamicSchema() {
  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sarasota Emergency Dentist",
    "url": "https://www.sarasotaemergencydentist.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.sarasotaemergencydentist.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });
  document.head.appendChild(schemaScript);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectDynamicSchema);
} else {
  injectDynamicSchema();
}
