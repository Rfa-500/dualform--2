(function () {
  'use strict';

  function getSiteRoot() {
    if (window.location.protocol !== 'file:') return '/';

    var script = document.currentScript || document.querySelector('script[src*="dualform-header.js"]');
    var src = script ? script.getAttribute('src') || '' : '';
    var cleanSrc = src.split('?')[0];
    if (cleanSrc && cleanSrc.indexOf('/') !== -1) return cleanSrc.slice(0, cleanSrc.lastIndexOf('/') + 1);
    return './';
  }
  /* ── Build the header HTML ─────────────────────────────── */
  function buildHeader() {
    var h = document.createElement('header');
    h.id = 'df-header';
    h.setAttribute('role', 'banner');

    var root = getSiteRoot();

    h.innerHTML = '\
<div class="df-inner">\
  <a class="df-logo" href="' + root + '" id="df-logo-link" title="Dualform">\
    <img src="' + root + 'Resources-Img-Vid/Dualform_logo_background_removed.png"\
         alt="Dualform"\
         class="df-logo-img"\
         draggable="false"\
    />\
    <span class="df-logo-brand-text">Dualform</span>\
  </a>\
\
  <nav aria-label="Menú principal">\
    <ul class="df-nav" id="df-main-nav">\
\
      <!-- 1. Impresión 3D -->\
      <li class="df-nav-item">\
        <a class="df-nav-link" href="' + root + 'impresion-3d/" id="nav-impresion">\
          Impresión 3D\
          <svg class="df-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>\
        </a>\
        <div class="df-dropdown" role="menu">\
          <a href="' + root + 'impresion-3d/" role="menuitem">Impresión FDM</a>\
          <a href="' + root + 'impresion-3d/" role="menuitem">Diseño 3D</a>\
          <div class="df-drop-divider"></div>\
          <a href="' + root + 'materiales/" role="menuitem">Materiales para impresión</a>\
          <a href="' + root + 'software/" role="menuitem">Software relacionado</a>\
        </div>\
      </li>\
\
      <!-- 2. Inyección de Plástico -->\
      <li class="df-nav-item">\
        <a class="df-nav-link" href="' + root + 'inyeccion-de-plastico/" id="nav-inyeccion">\
          Inyección de Plástico\
          <svg class="df-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>\
        </a>\
        <div class="df-dropdown" role="menu">\
          <a href="' + root + 'inyeccion-de-plastico/" role="menuitem">Inyección de alto volumen</a>\
          <a href="' + root + 'inyeccion-de-plastico/" role="menuitem">Inyección de bajo volumen</a>\
        </div>\
      </li>\
\
      <!-- 3. Aplicaciones -->\
      <li class="df-nav-item">\
        <a class="df-nav-link" href="' + root + 'aplicaciones/" id="nav-aplicaciones">\
          Aplicaciones\
          <svg class="df-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>\
        </a>\
        <div class="df-dropdown" role="menu">\
          <a href="' + root + 'aplicaciones/" role="menuitem">Creación rápida de prototipos</a>\
          <a href="' + root + 'aplicaciones/" role="menuitem">Fabricación de piezas de uso final</a>\
        </div>\
      </li>\
\
      <!-- 4. Industria -->\
      <li class="df-nav-item">\
        <a class="df-nav-link" href="' + root + 'industria/" id="nav-industria">\
          Industria\
          <svg class="df-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>\
        </a>\
        <div class="df-dropdown" role="menu">\
          <a href="' + root + 'industria/" role="menuitem">Ingeniería</a>\
          <a href="' + root + 'industria/" role="menuitem">Fabricación</a>\
        </div>\
      </li>\
\
      <!-- 5. Servicios -->\
      <li class="df-nav-item">\
        <a class="df-nav-link" href="' + root + 'servicios/" id="nav-servicios">\
          Servicios\
          <svg class="df-chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>\
        </a>\
        <div class="df-dropdown" role="menu">\
          <a href="' + root + 'servicios/" role="menuitem">Prototipado rápido</a>\
          <a href="' + root + 'servicios/" role="menuitem">Fabricación de piezas funcionales</a>\
          <a href="' + root + 'servicios/" role="menuitem">Asesoría técnica</a>\
          <div class="df-drop-divider"></div>\
          <a href="' + root + 'contacto/" role="menuitem">Solicitar cotización</a>\
        </div>\
      </li>\
\
      <!-- 6. Contacto -->\
      <li class="df-nav-item df-nav-direct">\
        <a class="df-nav-link" href="' + root + 'contacto/" id="nav-contacto">Contacto</a>\
      </li>\
\
    </ul>\
  </nav>\
\
  <div class="df-cta">\
    <a class="df-cta-btn" href="' + root + 'contacto/" id="df-cta-main">\
      <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.5 1.23 2 2 0 012.48 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>\
      Solicitar cotización\
    </a>\
  </div>\
\
  <button class="df-hamburger" id="df-hamburger-btn" aria-label="Abrir menú" aria-expanded="false" aria-controls="df-mobile-drawer">\
    <svg class="df-menu-icon" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>\
    <svg class="df-close-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\
  </button>\
</div>';

    return { header: h, root: root };
  }

  /* ── Build mobile drawer ───────────────────────────────── */
  function buildDrawer(root) {
    var d = document.createElement('div');
    d.id = 'df-mobile-drawer';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-modal', 'false');
    d.setAttribute('aria-label', 'Menú de navegación');

    var items = [
      {
        label: 'Impresión 3D',
        href: root + 'impresion-3d/',
        sub: [
          { label: 'Impresión FDM', href: root + 'impresion-3d/' },
          { label: 'Diseño 3D', href: root + 'impresion-3d/' },
          { label: 'Materiales para impresión', href: root + 'materiales/' },
          { label: 'Software relacionado', href: root + 'software/' }
        ]
      },
      {
        label: 'Inyección de Plástico',
        href: root + 'inyeccion-de-plastico/',
        sub: [
          { label: 'Inyección de alto volumen', href: root + 'inyeccion-de-plastico/' },
          { label: 'Inyección de bajo volumen', href: root + 'inyeccion-de-plastico/' }
        ]
      },
      {
        label: 'Aplicaciones',
        href: root + 'aplicaciones/',
        sub: [
          { label: 'Creación rápida de prototipos', href: root + 'aplicaciones/' },
          { label: 'Fabricación de piezas de uso final', href: root + 'aplicaciones/' }
        ]
      },
      {
        label: 'Industria',
        href: root + 'industria/',
        sub: [
          { label: 'Ingeniería', href: root + 'industria/' },
          { label: 'Fabricación', href: root + 'industria/' }
        ]
      },
      {
        label: 'Servicios',
        href: root + 'servicios/',
        sub: [
          { label: 'Prototipado rápido', href: root + 'servicios/' },
          { label: 'Fabricación de piezas funcionales', href: root + 'servicios/' },
          { label: 'Asesoría técnica', href: root + 'servicios/' },
          { label: 'Solicitar cotización', href: root + 'contacto/' }
        ]
      },
      {
        label: 'Contacto',
        href: root + 'contacto/',
        sub: null
      }
    ];

    var html = '';

    items.forEach(function (item, idx) {
      if (item.sub) {
        html += '<div class="df-mob-item" id="df-mob-item-' + idx + '">';
        html += '<button class="df-mob-trigger" aria-expanded="false" aria-controls="df-mob-sub-' + idx + '">';
        html += item.label;
        html += '<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>';
        html += '</button>';
        html += '<div class="df-mob-sub" id="df-mob-sub-' + idx + '" role="menu">';
        item.sub.forEach(function (s) {
          html += '<a href="' + s.href + '" role="menuitem">' + s.label + '</a>';
        });
        html += '</div></div>';
      } else {
        html += '<div class="df-mob-item df-mob-direct">';
        html += '<a href="' + item.href + '">' + item.label + '</a>';
        html += '</div>';
      }
    });

    html += '<div class="df-mob-cta"><a href="' + root + 'contacto/">Solicitar cotización</a></div>';

    d.innerHTML = html;
    return d;
  }

  /* ── Wire up mobile accordion ──────────────────────────── */
  function initMobileAccordion(drawer) {
    var triggers = drawer.querySelectorAll('.df-mob-trigger');
    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.df-mob-item');
        var isOpen = item.classList.contains('df-mob-open');

        // Close all
        drawer.querySelectorAll('.df-mob-item.df-mob-open').forEach(function (el) {
          el.classList.remove('df-mob-open');
          el.querySelector('.df-mob-trigger').setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked
        if (!isOpen) {
          item.classList.add('df-mob-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ── Wire up hamburger toggle ──────────────────────────── */
  function initHamburger(headerEl, drawer) {
    var btn = headerEl.querySelector('#df-hamburger-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var isOpen = drawer.classList.contains('df-drawer-open');

      if (isOpen) {
        drawer.classList.remove('df-drawer-open');
        headerEl.classList.remove('df-mobile-open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        drawer.classList.add('df-drawer-open');
        headerEl.classList.add('df-mobile-open');
        btn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!headerEl.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('df-drawer-open');
        headerEl.classList.remove('df-mobile-open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Hide old Formlabs header ──────────────────────────── */
  function hideOldHeader() {
    /* The original Formlabs nav has class "Header_header__WTZds" and the
       drawer has class "Drawer_drawer__rBp_q". We hide both without deleting
       so the page layout doesn't break unexpectedly. */
    var selectors = [
      'nav.global-styles--header',
      '.Drawer_backdrop__C2jT4',
      '.Drawer_drawer__rBp_q',
      '[class*="Header_header"]',
      '[class*="SiteSwitcher_switcher"]'
    ];

    selectors.forEach(function (sel) {
      try {
        document.querySelectorAll(sel).forEach(function (el) {
          el.style.setProperty('display', 'none', 'important');
          el.setAttribute('aria-hidden', 'true');
        });
      } catch (e) { /* selector might not exist */ }
    });
  }

  /* ── Main init ─────────────────────────────────────────── */
  function init() {
    // Inject CSS link if not already present
    if (!document.getElementById('df-header-css')) {
      var pfx     = getSiteRoot();

      var link    = document.createElement('link');
      link.id     = 'df-header-css';
      link.rel    = 'stylesheet';
      link.href   = pfx + 'dualform-header.css?v=6';
      document.head.insertBefore(link, document.head.firstChild);
    }

    var built  = buildHeader();
    var header = built.header;
    var drawer = buildDrawer(built.root);

    // Insert before any existing content
    var body = document.body;
    body.insertBefore(drawer, body.firstChild);
    body.insertBefore(header, body.firstChild);

    // Offset body
    body.classList.add('df-header-active');

    // Hide old Formlabs navbar
    hideOldHeader();

    // Events
    initMobileAccordion(drawer);
    initHamburger(header, drawer);

    // Keyboard: ESC closes drawer
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        drawer.classList.remove('df-drawer-open');
        header.classList.remove('df-mobile-open');
        var btn2 = header.querySelector('#df-hamburger-btn');
        if (btn2) btn2.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
