import fs from 'fs';
import path from 'path';

// Hard-coded pages (no external JSON file needed)
const pages = [
  { slug: 'index',          title: 'Sarasota Emergency Dentist | 24/7 Emergency Dental Care' },
  { slug: 'privacy-policy', title: 'Privacy Policy' },
  { slug: 'terms-of-use',   title: 'Terms of Use' },
  { slug: 'cookies-policy', title: 'Cookies Policy' },
  { slug: 'disclaimer',     title: 'Disclaimer' },
  { slug: 'dmca',           title: 'DMCA' },
  { slug: 'accessibility',  title: 'Accessibility Statement' },
  { slug: 'do-not-sell-my-data', title: 'Do Not Sell My Data' },
  { slug: 'about',          title: 'About Us' },
  { slug: 'contact',        title: 'Contact Sarasota Emergency Dentist' }
];

console.log('🚀 Starting Sarasota Emergency Dentist page generator...');

pages.forEach(page => {
  const outputPath = path.join(process.cwd(), `${page.slug}.html`);

  // Full proper HTML template (you can expand this later)
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sarasota Emergency Dental Network - ${page.title}">
    <title>${page.title}</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; max-width: 960px; margin: 40px auto; padding: 0 20px; line-height: 1.6; }
        h1 { color: #c8102e; }
    </style>
</head>
<body>
    <h1>${page.title}</h1>
    <p>This page was auto-generated on April 7, 2026.</p>
    <p><strong>Real content for ${page.slug} goes here.</strong></p>
    <hr>
    <p><a href="/">← Back to Home</a></p>
</body>
</html>`;

  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`✅ Generated: ${page.slug}.html`);
});

// Also generate a basic 404 page (required for your redirect)
const notFoundHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 100px 20px; }
        h1 { color: #c8102e; font-size: 4rem; }
    </style>
</head>
<body>
    <h1>404</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <a href="/">Return to Homepage</a>
</body>
</html>`;

fs.writeFileSync(path.join(process.cwd(), '404.html'), notFoundHTML, 'utf8');
console.log('✅ Generated: 404.html');

console.log('🎉 All pages generated successfully – April 7, 2026');
