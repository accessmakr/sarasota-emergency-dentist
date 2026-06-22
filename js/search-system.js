// js/search-system.js — V2 Modal Edition
// Handles the trigger-search button → injects and manages a full search modal.
// Works on all page depths (root, /guide/, /location/) without modification.

(function () {
    'use strict';

    // ── Modal HTML ────────────────────────────────────────────────────
    const MODAL_ID = 'sed-search-modal';

    function buildModal() {
        const el = document.createElement('div');
        el.id = MODAL_ID;
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-modal', 'true');
        el.setAttribute('aria-label', 'Site search');
        el.style.cssText = `
            display:none;position:fixed;inset:0;z-index:9999;
            background:rgba(15,23,42,0.55);backdrop-filter:blur(6px);
            padding:1.5rem;align-items:flex-start;justify-content:center;
        `;
        el.innerHTML = `
            <div id="sed-search-box" role="search" style="
                background:#fff;border-radius:1.5rem;width:100%;max-width:600px;
                margin-top:clamp(3rem,10vh,6rem);box-shadow:0 40px 80px -12px rgba(0,0,0,0.3);
                overflow:hidden;border:1px solid rgba(0,0,0,0.07);
            ">
                <div style="display:flex;align-items:center;gap:.75rem;padding:1.25rem 1.5rem;border-bottom:1px solid #f1f5f9;">
                    <svg width="18" height="18" fill="none" stroke="#64748b" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <input id="sed-search-input" type="search" autocomplete="off" spellcheck="false"
                        placeholder="Search providers, specialties, guides…"
                        style="flex:1;border:none;outline:none;font-size:1rem;color:#0f172a;background:transparent;">
                    <button id="sed-search-close" aria-label="Close search"
                        style="color:#94a3b8;font-size:1.25rem;background:none;border:none;cursor:pointer;line-height:1;padding:.25rem;">✕</button>
                </div>
                <div id="sed-search-results" style="max-height:min(420px,55vh);overflow-y:auto;padding:.5rem 0;"></div>
            </div>
        `;
        return el;
    }

    // ── Result rendering ──────────────────────────────────────────────
    function renderResults(query) {
        const container = document.getElementById('sed-search-results');
        if (!container) return;

        const lower = (query || '').toLowerCase().trim();
        if (lower.length < 2) {
            container.innerHTML = '<div style="padding:1.5rem;text-align:center;color:#94a3b8;font-size:.875rem;">Type 2+ characters to search providers and guides…</div>';
            return;
        }

        const registry = window.SITE_REGISTRY;
        const results = [];

        // Provider match
        if (registry && Array.isArray(registry.dentists)) {
            registry.dentists.filter(d =>
                (d.name || '').toLowerCase().includes(lower) ||
                (d.summary || '').toLowerCase().includes(lower) ||
                (d.strengths || '').toLowerCase().includes(lower) ||
                (d.address || '').toLowerCase().includes(lower)
            ).slice(0, 5).forEach(d => {
                results.push({
                    icon: '🦷',
                    label: d.name,
                    sub: d.address || 'Sarasota, FL',
                    badge: d.rating ? d.rating + ' ★' : '',
                    href: d.website && d.website !== '#' ? d.website : null,
                    phone: d.phone,
                    type: 'provider'
                });
            });
        }

        // Page match
        if (registry && typeof registry.getAllPages === 'function') {
            registry.getAllPages().filter(p =>
                (p.label || '').toLowerCase().includes(lower) ||
                (p.name || '').toLowerCase().includes(lower)
            ).slice(0, 6).forEach(p => {
                results.push({
                    icon: '📄',
                    label: p.label ? p.label.split(' • ')[0] : p.name,
                    sub: p.name,
                    href: '/' + p.name.replace(/\.html$/, ''),
                    type: 'page'
                });
            });
        }

        if (!results.length) {
            container.innerHTML = `<div style="padding:1.5rem;text-align:center;color:#94a3b8;font-size:.875rem;">No results for "<strong style="color:#0f172a">${lower}</strong>". Try "abscess", "implant", or "pediatric".</div>`;
            return;
        }

        const sectionLabels = { provider: '🦷 Providers', page: '📁 Site Pages' };
        let currentType = null;
        let html = '';

        results.forEach(r => {
            if (r.type !== currentType) {
                currentType = r.type;
                html += `<div style="padding:.375rem 1.25rem;font-size:.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;background:#f8fafc;">${sectionLabels[currentType]}</div>`;
            }
            // For providers: prefer tel: link, fall back to website, then no link
            let href = r.href || '';
            const phoneIsReal = r.phone && !/555-\d{4}$/.test(r.phone);
            if (r.type === 'provider' && phoneIsReal) {
                href = 'tel:' + r.phone.replace(/[^0-9+]/g, '');
            }
            const tag = href ? 'a' : 'div';
            const linkAttr = href ? `href="${href}"${r.type === 'provider' && !href.startsWith('tel') ? ' target="_blank"' : ''}` : '';
            html += `
                <${tag} ${linkAttr} onclick="document.getElementById('${MODAL_ID}').style.display='none';"
                    style="display:flex;align-items:center;justify-content:space-between;gap:.75rem;
                    padding:.875rem 1.25rem;text-decoration:none;color:#0f172a;
                    border-bottom:1px solid #f8fafc;transition:background .15s;"
                    onmouseover="this.style.background='#f0fdf4'" onmouseout="this.style.background=''"
                >
                    <div style="display:flex;align-items:center;gap:.75rem;">
                        <span style="font-size:1.25rem;flex-shrink:0;">${r.icon}</span>
                        <div>
                            <div style="font-weight:500;font-size:.9375rem;">${r.label}</div>
                            <div style="font-size:.75rem;color:#64748b;">${r.sub}</div>
                        </div>
                    </div>
                    ${r.badge ? `<span style="font-size:.75rem;color:#10b981;font-weight:600;white-space:nowrap;">${r.badge}</span>` : ''}
                </${tag}>`;
        });

        container.innerHTML = html;
    }

    // ── Open / close helpers ──────────────────────────────────────────
    function openModal() {
        let modal = document.getElementById(MODAL_ID);
        if (!modal) {
            modal = buildModal();
            document.body.appendChild(modal);

            // Input handler
            document.getElementById('sed-search-input').addEventListener('input', function () {
                renderResults(this.value);
            });

            // Close button
            document.getElementById('sed-search-close').addEventListener('click', closeModal);

            // Click outside box
            modal.addEventListener('click', function (e) {
                const box = document.getElementById('sed-search-box');
                if (box && !box.contains(e.target)) closeModal();
            });

            // Esc key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') closeModal();
            });
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        const input = document.getElementById('sed-search-input');
        if (input) {
            input.value = '';
            renderResults('');
            setTimeout(() => input.focus(), 60);
        }
    }

    function closeModal() {
        const modal = document.getElementById(MODAL_ID);
        if (modal) modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // ── Wire all .trigger-search buttons (present and future) ─────────
    // Uses event delegation so it works even if buttons are added after DOMContentLoaded
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.trigger-search');
        if (btn) {
            e.preventDefault();
            openModal();
        }
    });

    // ── Backward compat: keep window.liveSearch for any page that still calls it ──
    // (safely wraps/no-ops if original doesn't exist)
    const _orig = window.liveSearch;
    window.liveSearch = function (query) {
        if (typeof _orig === 'function') _orig(query);
    };

    console.log('%c✅ SEARCH-SYSTEM V2 active — modal search, all depths, all devices', 'color:#8b5cf6;font-weight:bold');
})();
