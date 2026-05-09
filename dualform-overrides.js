(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────────────────────── */

  /** Find the outermost TwelveColumnLayout section that contains `text` */
  function findSectionByText(text) {
    var lc = text.toLowerCase();
    var wrappers = document.querySelectorAll(
      '.TwelveColumnLayout_wrapper__OBqeh, section[class*="TwelveColumnLayout_wrapper"]'
    );
    for (var i = 0; i < wrappers.length; i++) {
      if (wrappers[i].textContent.toLowerCase().indexOf(lc) !== -1) {
        return wrappers[i];
      }
    }
    return null;
  }

  function hideSection(el) {
    if (el) el.classList.add('df-hide-legacy');
  }

  function svgIcon(path, vb) {
    vb = vb || '0 0 24 24';
    return '<svg viewBox="' + vb + '"><' + 'g>' + path + '<\/g><\/svg>';
  }

  var ICON = {
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    layers:  '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    arrow:   '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'
  };

  /* ─────────────────────────────────────────────────────────
     1. DROPDOWN HOVER — JS reinforcement (CSS does most work)
  ───────────────────────────────────────────────────────── */
  function fixDropdowns() {
    var items = document.querySelectorAll('#df-header .df-nav-item');
    items.forEach(function (item) {
      var drop = item.querySelector('.df-dropdown');
      if (!drop) return;
      var t = null;
      function open()  { clearTimeout(t); drop.style.opacity='1'; drop.style.visibility='visible'; drop.style.pointerEvents='auto'; drop.style.transform='translateX(-50%) translateY(0)'; }
      function close() { t = setTimeout(function(){ drop.style.opacity=''; drop.style.visibility=''; drop.style.pointerEvents=''; drop.style.transform=''; }, 140); }
      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', close);
      drop.addEventListener('mouseenter', open);
      drop.addEventListener('mouseleave', close);
    });
  }

  /* ─────────────────────────────────────────────────────────
     2. HERO — Add Spanish title + translate buttons
  ───────────────────────────────────────────────────────── */
  function injectHeroTitle() {
    // Only run once
    if (document.getElementById('df-hero-title-injected')) return;
    var ctaWrapper = document.querySelector('.WhitePaperCta_wrapper__3qC_Y, .WhitePaperCta_layout__s91ex');
    if (!ctaWrapper) return;

    var titleEl = document.createElement('div');
    titleEl.id = 'df-hero-title-injected';
    titleEl.innerHTML = '<h1 style="font-family:var(--df-font-global,\'Proxima Nova\',\'Nunito Sans\',sans-serif);font-size:clamp(26px,3.5vw,48px);font-weight:800;color:#ffffff;text-align:center;line-height:1.15;letter-spacing:-0.03em;margin:0 0 28px;text-shadow:0 2px 24px rgba(0,0,0,0.25);max-width:820px;padding:0 20px;">Manufactura 3D e inyección plástica para empresas</h1>';

    // Insert before the CTA buttons wrapper
    var layout = document.querySelector('.WhitePaperCta_layout__s91ex');
    if (layout) {
      layout.insertBefore(titleEl, layout.firstChild);
    } else {
      ctaWrapper.parentNode.insertBefore(titleEl, ctaWrapper);
    }
  }

  function translateHeroButtons() {
    document.querySelectorAll('.WhitePaperCta_wrapper__3qC_Y a, .WhitePaperCta_layout__s91ex a').forEach(function (a) {
      var sp = a.querySelector('span');
      var txt = (sp || a).textContent.trim();
      if (/explore\s+3d\s+printers/i.test(txt)) {
        (sp || a).textContent = 'Explorar servicios';
        a.href = '#servicios-principales';
        a.removeAttribute('target');
        // Premium primary (orange) button
        var baseStyleOrange = 'display:inline-flex;align-items:center;gap:7px;padding:11px 22px;background:linear-gradient(135deg,#E8521A 0%,#c93f0e 100%);color:#fff;font-weight:700;font-size:0.85rem;letter-spacing:0.04em;text-transform:uppercase;border-radius:8px;text-decoration:none;transition:transform 0.18s ease,box-shadow 0.18s ease,background 0.18s ease;box-shadow:0 4px 18px rgba(232,82,26,0.35);margin-top:8px;';
        a.style.cssText = baseStyleOrange;
        a.addEventListener('mouseenter', function() {
          a.style.transform = 'translateY(-2px)';
          a.style.boxShadow = '0 8px 28px rgba(232,82,26,0.5)';
          a.style.background = 'linear-gradient(135deg,#F06030 0%,#d94e12 100%)';
        });
        a.addEventListener('mouseleave', function() {
          a.style.transform = '';
          a.style.boxShadow = '0 4px 18px rgba(232,82,26,0.35)';
          a.style.background = 'linear-gradient(135deg,#E8521A 0%,#c93f0e 100%)';
        });
      } else if (/contact\s+sales/i.test(txt)) {
        (sp || a).textContent = 'Solicitar cotizaci\u00f3n';
        a.href = 'contacto/index.html';
        // Premium glass/outline button
        var baseStyleGlass = 'display:inline-flex;align-items:center;gap:7px;padding:10px 22px;background:rgba(255,255,255,0.08);color:#fff;font-weight:600;font-size:0.85rem;letter-spacing:0.04em;text-transform:uppercase;border-radius:8px;text-decoration:none;border:1.5px solid rgba(255,255,255,0.3);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:transform 0.18s ease,background 0.18s ease,border-color 0.18s ease,box-shadow 0.18s ease;margin-top:8px;';
        a.style.cssText = baseStyleGlass;
        a.addEventListener('mouseenter', function() {
          a.style.transform = 'translateY(-2px)';
          a.style.background = 'rgba(255,255,255,0.18)';
          a.style.borderColor = 'rgba(255,255,255,0.65)';
          a.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
        });
        a.addEventListener('mouseleave', function() {
          a.style.transform = '';
          a.style.background = 'rgba(255,255,255,0.08)';
          a.style.borderColor = 'rgba(255,255,255,0.3)';
          a.style.boxShadow = '';
        });
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     3. SECTOR CARDS — New 8-card uniform section
        Replaces legacy LinksSection tiles entirely
  ───────────────────────────────────────────────────────── */

  var SECTOR_CARDS = [
    { name: 'Ingeniería',             img: 'Ingeniería.png' },
    { name: 'Prototipado',            img: 'Prototipado.png' },
    { name: 'Mantenimiento',          img: 'Mantenimiento.png' },
    { name: 'Piezas funcionales',     img: 'Piezas funcionales.png' },
    { name: 'Fabricación',            img: 'Fabricación.png' },
    { name: 'Moldes',                 img: 'Moldes.png' },
    { name: 'Desarrollo de producto', img: 'Desarrollo de producto.png' },
    { name: 'Producción',             img: 'Production.png' }
  ];

  function injectSectorsSection() {
    if (document.getElementById('df-sectors-section')) return;

    // Find the #industries container — insert directly after it
    var industriesEl = document.getElementById('industries');
    if (!industriesEl) return;

    var cardsHTML = SECTOR_CARDS.map(function(s) {
      return '<div class="df-sector-card">'
        + '<div class="df-sector-icon df-sector-icon--img"><img src="Resources-Img-Vid/Vectores/' + s.img + '" alt="' + s.name + '" onerror="this.style.display=\'none\'"></div>'
        + '<div class="df-sector-name">' + s.name + '</div>'
        + '</div>';
    }).join('');

    var sec = document.createElement('div');
    sec.id = 'df-sectors-section';
    sec.innerHTML = '<div class="df-sectors-inner">'
      + '<div class="df-sectors-label">Sectores de aplicación</div>'
      + '<div class="df-sectors-grid">' + cardsHTML + '</div>'
      + '</div>';

    industriesEl.insertAdjacentElement('afterend', sec);
  }

  function deactivateIndustryCards() {
    document.querySelectorAll('.LinksSection_link__FcOz8, .LinksSection_tile__ctao0').forEach(function(el){
      el.style.setProperty('display','none','important');
    });
  }

  /* ─────────────────────────────────────────────────────────
     4. SERVICIOS SECTION — Premium horizontal showcase
  ───────────────────────────────────────────────────────── */
  function injectServiciosSection() {
    if (document.getElementById('df-servicios-section')) return;
    var anchor = document.getElementById('featured-products') || document.getElementById('industries');
    if (!anchor) return;

    var ARROW_R = '<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>';

    var services = [
      {
        title: 'Impresión 3D',
        desc:  'Fabricación de piezas en plástico de alta precisión usando FDM, SLA y SLS. Ideal para prototipos y piezas funcionales.',
        href:  'impresion-3d/index.html',
        img:   'Resources-Img-Vid/Extra/Impresi\u00f3n 3D FDM.png',
        icon:  '<path d="M6 9V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/><rect x="2" y="9" width="20" height="13" rx="2"/><line x1="12" y1="13" x2="12" y2="19"/>'
      },
      {
        title: 'Inyección de Plástico',
        desc:  'Producción de piezas plásticas en volúmenes medianos y altos con excelente acabado superficial y repetibilidad.',
        href:  'inyeccion-de-plastico/index.html',
        img:   'Resources-Img-Vid/Extra/Inyeccion de plastico.png',
        icon:  '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>'
      },
      {
        title: 'Dise\u00f1o 3D',
        desc:  'Modelado CAD profesional y dise\u00f1o orientado a manufactura (DFM). Del concepto al archivo listo para producci\u00f3n.',
        href:  'servicios/index.html',
        img:   '',
        icon:  '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'
      },
      {
        title: 'Prototipado R\u00e1pido',
        desc:  'Del concepto al prototipo f\u00edsico en horas. Validamos forma, ajuste y funci\u00f3n antes de comprometerte con herramienta.',
        href:  'servicios/index.html',
        img:   'Resources-Img-Vid/Extra/Prototipo.png',
        icon:  '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
      },
      {
        title: 'Piezas Funcionales',
        desc:  'Producci\u00f3n de piezas listas para uso final con los materiales y procesos \u00f3ptimos para cada aplicaci\u00f3n industrial.',
        href:  'servicios/index.html',
        img:   'Resources-Img-Vid/Extra/Pieza final.png',
        icon:  '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17.5h7M17.5 14v7"/>'
      },
      {
        title: 'Selecci\u00f3n de Materiales',
        desc:  'Asesor\u00eda en la elecci\u00f3n del material \u00f3ptimo seg\u00fan requerimientos mec\u00e1nicos, t\u00e9rmicos, qu\u00edmicos o est\u00e9ticos.',
        href:  'servicios/index.html',
        img:   'Resources-Img-Vid/Extra/Materiales.png',
        icon:  '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
      }
    ];

    var cards = services.map(function(s, i) {
      var num = (i + 1 < 10 ? '0' : '') + (i + 1);
      // Image area: real image with overlay, or icon placeholder if no image
      var imgContent;
      if (s.img) {
        imgContent =
          '<img src="' + s.img + '" alt="' + s.title + '" class="df-serv-real-img"'
          + ' onerror="this.style.display=\'none\';this.parentNode.querySelector(\'.df-serv-card-icon\').style.display=\'flex\'"'
          + '>'
          + '<div class="df-serv-img-overlay"></div>'
          + '<span class="df-serv-num">' + num + '</span>'
          + '<div class="df-serv-card-icon" style="display:none">'
          + svgIcon(s.icon)
          + '<span class="df-serv-placeholder-label">Imagen pr\u00f3ximamente</span>'
          + '</div>';
      } else {
        imgContent =
          '<span class="df-serv-num">' + num + '</span>'
          + '<div class="df-serv-card-icon">'
          + svgIcon(s.icon)
          + '<span class="df-serv-placeholder-label">Imagen pr\u00f3ximamente</span>'
          + '</div>';
      }
      return '<div class="df-serv-card">'
        + '<div class="df-serv-card-img">'
        + imgContent
        + '</div>'
        + '<div class="df-serv-card-body">'
        + '<h3>' + s.title + '</h3>'
        + '<p>' + s.desc + '</p>'
        + '<a class="df-serv-card-link" href="' + s.href + '">Ver m\u00e1s ' + ARROW_R + '</a>'
        + '</div>'
        + '</div>';
    }).join('');

    var dots = services.map(function(_, i) {
      return '<span class="df-serv-dot' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '"></span>';
    }).join('');

    var sec = document.createElement('div');
    sec.id = 'df-servicios-section';
    sec.innerHTML =
      '<div class="df-serv-inner">'
      + '<div class="df-serv-header">'
      + '<span class="df-serv-eyebrow">Nuestros servicios</span>'
      + '<h2>Servicios <span>principales</span></h2>'
      + '<p>Soluciones de manufactura aditiva e inyección para cada etapa de tu proyecto.</p>'
      + '</div>'
      + '<div class="df-serv-track-wrap">'
      + '<div class="df-serv-track" id="df-serv-track">' + cards + '</div>'
      + '</div>'
      + '<div class="df-serv-dots" id="df-serv-dots">' + dots + '</div>'
      + '</div>';

    anchor.insertAdjacentElement('afterend', sec);
    // Add named anchor for #servicios-principales hero button link
    var spAnchor = document.createElement('a');
    spAnchor.id = 'servicios-principales';
    spAnchor.style.cssText = 'display:block;position:relative;top:-80px;visibility:hidden;';
    spAnchor.setAttribute('aria-hidden','true');
    sec.insertBefore(spAnchor, sec.firstChild);

    // ── Carousel auto-play (RAF-based, infinite loop) ──
    setTimeout(function() {
      var track = document.getElementById('df-serv-track');
      var dotsEl = document.getElementById('df-serv-dots');
      if (!track) return;

      // Double the cards for seamless infinite scroll
      track.innerHTML += track.innerHTML;

      var dotEls = dotsEl ? dotsEl.querySelectorAll('.df-serv-dot') : [];
      var total = services.length;
      var speed = 0.55;   // px per frame — slow & premium
      var isPaused = false;
      var isDragging = false;
      var dragStartX = 0;
      var dragScrollStart = 0;

      // Pause on hover
      track.addEventListener('mouseenter', function() { isPaused = true; });
      track.addEventListener('mouseleave', function() { if (!isDragging) isPaused = false; });

      // Pause on touch
      track.addEventListener('touchstart', function() { isPaused = true; }, { passive: true });
      track.addEventListener('touchend', function() {
        clearTimeout(track._resumeTouch);
        track._resumeTouch = setTimeout(function() { isPaused = false; }, 1800);
      }, { passive: true });

      // Mouse drag (desktop)
      track.addEventListener('mousedown', function(e) {
        isDragging = true;
        isPaused = true;
        dragStartX = e.pageX;
        dragScrollStart = track.scrollLeft;
        track.style.cursor = 'grabbing';
      });
      document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        track.scrollLeft = dragScrollStart - (e.pageX - dragStartX);
      });
      document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        clearTimeout(track._resumeDrag);
        track._resumeDrag = setTimeout(function() { isPaused = false; }, 1500);
      });

      // Dot sync helper
      function syncDots() {
        if (!dotEls.length) return;
        // Get card width (320px + 20px gap)
        var firstCard = track.querySelector('.df-serv-card');
        var cw = firstCard ? firstCard.offsetWidth + 20 : 340;
        var halfScroll = track.scrollWidth / 2;
        var pos = track.scrollLeft % halfScroll;
        var idx = Math.round(pos / cw) % total;
        dotEls.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
      }

      // RAF loop
      function frame() {
        if (!isPaused) {
          track.scrollLeft += speed;
          // When we've scrolled past the first copy, jump back silently
          if (track.scrollLeft >= track.scrollWidth / 2) {
            track.scrollLeft -= track.scrollWidth / 2;
          }
          syncDots();
        }
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }, 500);
  }

  /* ─────────────────────────────────────────────────────────
     5. HIDE LEGACY SECTIONS (initial fast pass)
  ───────────────────────────────────────────────────────── */
  function hideLegacySections() {
    // Hide featured products and news by ID (fastest, safest)
    ['featured-products', 'us-featured-products', 'news', 'us-news',
     'localpromo', 'materials'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.classList.add('df-hide-legacy');
    });

    // Hide legacy Formlabs nav elements (our header replaces them)
    document.querySelectorAll(
      'nav.global-styles--header, [class*="Header_header__WTZds"], ' +
      '[class*="Drawer_backdrop"], [class*="Drawer_drawer__rBp"]'
    ).forEach(function(el) { el.classList.add('df-hide-legacy'); });

    // Hide broken images — but NEVER touch images inside our own header/sections
    document.querySelectorAll('img:not(#df-header img):not(#df-sectors-section img):not(#df-servicios-section img):not(#df-tecnologias-fab img):not(#df-materiales img)').forEach(function(img) {
      img.addEventListener('error', function() { this.style.display = 'none'; });
      if (img.complete && img.naturalWidth === 0) img.style.display = 'none';
    });

    // Remove "Buy Now", "Shop All" link buttons
    document.querySelectorAll('a, button').forEach(function(el) {
      var txt = el.textContent.trim().toLowerCase();
      if (txt === 'buy now' || txt === 'shop all' || txt === 'shop now') {
        el.style.display = 'none';
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     6. INJECT — Tecnologías de fabricación  (dark, 2 cards)
  ───────────────────────────────────────────────────────── */
  function injectTecnologiasFab() {
    if (document.getElementById('df-tecnologias-fab')) return;
    var anchor = document.getElementById('df-servicios-section');

    var cards = [
      { title:'Impresión 3D', desc:'Fabricación de prototipos, piezas funcionales y componentes personalizados mediante tecnologías de alta precisión.', adv:['Ideal para prototipado rápido','Bajo costo de entrada','Geometrías complejas sin molde','Producción flexible y personalizada'], img:'Resources-Img-Vid/Machines%20good/3d%20final.png', icon:ICON.printer, href:'impresion-3d/index.html' },
      { title:'Inyección de Plástico', desc:'Producción de piezas plásticas para bajo o alto volumen mediante procesos de moldeo e inyección con acabados superiores.', adv:['Ideal para producción repetitiva','Excelente acabado superficial','Escalable para alto volumen','Compatible con múltiples materiales'], img:'Resources-Img-Vid/Machines%20good/Haitan%20mars%20final.png', icon:ICON.layers, href:'inyeccion-de-plastico/index.html' }
    ];

    var cardsHTML = cards.map(function(c) {
      var advList = c.adv.map(function(a){ return '<li>'+a+'</li>'; }).join('');
      return '<div class="df-tf-card">'
        +'<div class="df-tf-img"><img src="'+c.img+'" alt="'+c.title+'" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display=\'none\'"><div class="df-tf-img-overlay"></div></div>'
        +'<div class="df-tf-body"><h3>'+c.title+'</h3><p>'+c.desc+'</p>'
        +'<ul class="df-tf-advantages">'+advList+'</ul>'
        +'<a class="df-tf-btn" href="'+c.href+'">Ver tecnología '+svgIcon(ICON.arrow)+'</a>'
        +'</div></div>';
    }).join('');

    var sec = document.createElement('div');
    sec.id = 'df-tecnologias-fab';
    sec.innerHTML = '<div class="df-tf-inner">'
      +'<div class="df-tf-header"><h2>Tecnologías de <span>fabricación</span></h2>'
      +'<p>Dos procesos complementarios para cualquier volumen, geometría o material.</p></div>'
      +'<div class="df-tf-grid">'+cardsHTML+'</div></div>';
    if (anchor) anchor.insertAdjacentElement('afterend', sec);
    else document.body.appendChild(sec);
  }

  /* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     7. INJECT â€” Materiales y aplicaciones (dual-tech selector)
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  var matData3D = {
    'PLA':{'tag':'Biodegradable · Rígido','title':'PLA — Ácido Poliláctico','desc':'Material de entrada ideal para prototipos de forma, maquetas y piezas de baja carga. Fácil de imprimir, buena definición de detalles.','adv':['Fácil de imprimir','Biodegradable','Bajo costo','Buena definición de detalles'],'apps':['Prototipos de forma y ajuste','Maquetas de presentación','Modelos educativos','Piezas decorativas']},
    'PETG':{'tag':'Semi-rígido · Resistente','title':'PETG — Tereftalato de Polietileno','desc':'Excelente balance entre rigidez y tenacidad. Resistente a la humedad, translúcido, ideal para contenedores y piezas funcionales.','adv':['Resistente a la humedad','Translúcido disponible','Buena adhesión entre capas','Apto uso alimentario'],'apps':['Contenedores y tapas','Protectores de piezas','Piezas de uso final','Uso alimentario grado']},
    'ABS':{'tag':'Rígido · Alta temperatura','title':'ABS — Acrilonitrilo Butadieno Estireno','desc':'Material técnico con alta resistencia al impacto y buenas propiedades mecánicas. Compatible con acabados superficiales.','adv':['Alta resistencia al impacto','Mecanizable y pintable','Acabado con acetona','Buena relación precio-desempeño'],'apps':['Carcasas técnicas','Piezas mecanizadas','Componentes automotrices','Prototipos funcionales']},
    'TPU':{'tag':'Flexible · Elástico','title':'TPU — Poliuretano Termoplástico','desc':'Material flexible ideal para juntas, sellos, protectores de impacto y piezas que requieren elasticidad sin perder resistencia.','adv':['Alta flexibilidad','Resistente a la abrasión','Elasticidad duradera','Agarre ergonómico'],'apps':['Juntas y sellos','Mangos ergonómicos','Protectores de golpes','Ajuste a presión']},
    'Nylon / PA':{'tag':'Alta resistencia · Técnico','title':'Nylon / Poliamida (PA)','desc':'Excelente resistencia mecánica, tenacidad y resistencia química para piezas industriales de uso final.','adv':['Alta resistencia mecánica','Resistencia química','Bajo coeficiente de fricción','Duradero'],'apps':['Engranajes y poleas','Bujes y rodamientos','Piezas estructurales','Componentes de maquinaria']},
    'Resinas técnicas':{'tag':'Alta precisión · SLA','title':'Resinas técnicas SLA','desc':'Alta resolución para piezas con detalle fino, superficies suaves y propiedades mecánicas específicas por formulación.','adv':['Altísima resolución','Superficies suaves','Amplia gama de propiedades','Detalle fino'],'apps':['Prototipos de alta fidelidad','Joyería y detalle fino','Odontología y medicina','Óptica y transparentes']},
    'Alta temperatura':{'tag':'PEEK · PPS · PC','title':'Materiales de alta temperatura','desc':'Polímeros de alto rendimiento que mantienen propiedades mecánicas y dimensionales a temperaturas superiores a 150°C.','adv':['Estabilidad >150°C','Alta rigidez térmica','Resistencia química','Baja deformación'],'apps':['Componentes cerca de motores','Piezas automotrices','Conectores eléctricos','Utillajes de producción']},
    'Flexibles':{'tag':'TPE · Silicona · Goma','title':'Materiales flexibles','desc':'Formulaciones blandas para absorción de impactos, sellado hermético o movimiento repetitivo.','adv':['Absorción de impactos','Sellado hermético','Movimiento repetitivo','Tacto suave'],'apps':['Sellos y empaquetaduras','Piezas amortiguadoras','Suelas y agarre','Protectores de equipos']}
  };

  var matDataIny = {
    'ABS':{'tag':'Rígido · Técnico','title':'ABS Inyectado','desc':'Excelente resistencia al impacto, dureza superficial y fácil acabado para piezas de uso final en producción.','adv':['Alta resistencia al impacto','Fácil coloración','Estabilidad dimensional','Mecanizable'],'apps':['Carcasas electrónicas','Automotriz interior','Juguetes y accesorios','Componentes industriales']},
    'PP':{'tag':'Polipropileno · Versátil','title':'PP — Polipropileno','desc':'Material versátil con excelente resistencia química, bajo peso y buena flexibilidad. Estándar en envases industriales.','adv':['Resistencia química','Bajo peso','Flexible','Económico y escalable'],'apps':['Envases y tapas','Componentes de tubería','Piezas de bajo costo','Bisagras integrales']},
    'PE':{'tag':'Polietileno · Ligero','title':'PE — Polietileno','desc':'Uno de los plásticos más utilizados. Excelente resistencia química, bajo costo y alta versatilidad.','adv':['Resistencia química','Bajo costo','Flexible y ligero','Apto alimentario'],'apps':['Envases alimentarios','Tuberías y conexiones','Tanques y contenedores','Piezas de baja carga']},
    'Nylon':{'tag':'PA · Alta resistencia','title':'Nylon / Poliamida Inyectado','desc':'Alta resistencia mecánica, bajo coeficiente de fricción y excelente durabilidad para piezas industriales.','adv':['Alta resistencia','Bajo rozamiento','Resistencia a fatiga','Compatible con refuerzos'],'apps':['Engranajes y poleas','Bujes autolubricados','Piezas estructurales','Maquinaria']},
    'PC':{'tag':'Policarbonato · Óptico','title':'PC — Policarbonato','desc':'Material transparente de alta resistencia al impacto. Ideal para óptica, estructuras y aplicaciones de seguridad.','adv':['Transparente y óptico','Alta resistencia al impacto','Estabilidad dimensional','Ignífugo disponible'],'apps':['Lentes y ventanas','Carcasas de equipos','Piezas de seguridad','Electrónica']},
    'POM':{'tag':'Acetal · Precisión','title':'POM — Polioximetileno','desc':'Alta precisión dimensional, baja fricción y alta durabilidad. Ideal para piezas de movimiento y mecanismos.','adv':['Alta precisión','Bajo coeficiente de fricción','Resistencia química','Autolubricante'],'apps':['Engranajes de precisión','Rodillos y guías','Mecanismos','Conectores de precisión']},
    'TPU':{'tag':'Flexible · Inyectado','title':'TPU Inyectado','desc':'Mayor consistencia en geometrías complejas y mejores propiedades de superficie que el TPU impreso.','adv':['Flexibilidad controlada','Resistencia a abrasión','Geometrías complejas','Alta calidad de superficie'],'apps':['Suelas técnicas','Mangueras flexibles','Protectores','Empaquetaduras de precisión']},
    'Materiales técnicos':{'tag':'PC · POM · PSU · PEEK','title':'Materiales técnicos avanzados','desc':'Plásticos de ingeniería avanzada para aplicaciones con requisitos térmicos, mecánicos o químicos extremos.','adv':['Rendimiento extremo','Resistencia a alta temperatura','Resistencia química','Certificaciones disponibles'],'apps':['Aeroespacial','Médico','Electrónica avanzada','Aplicaciones de alta exigencia']}
  };
  function injectMateriales() {
    if (document.getElementById('df-materiales')) return;
    var anchor = document.getElementById('df-tecnologias-fab');
    var vecPfx = 'Resources-Img-Vid/Vectores/';

    var sec = document.createElement('div');
    sec.id = 'df-materiales';
    sec.innerHTML =
      '<div class="df-mat-inner">'
      + '<div class="df-mat-header">'
      +   '<h2>Materiales y <span>aplicaciones reales</span></h2>'
      +   '<p>Elige la tecnolog' + String.fromCharCode(237) + 'a y selecciona un material para explorar sus propiedades y aplicaciones industriales.</p>'
      + '</div>'
      + '<div class="df-mat-tech-wrap">'
      +   '<div class="df-tech-switch" id="df-tech-switch">'
      +     '<button class="df-tech-btn df-tech-active" data-tech="3d">Impresi' + String.fromCharCode(243) + 'n 3D</button>'
      +     '<button class="df-tech-btn" data-tech="iny">Inyecci' + String.fromCharCode(243) + 'n de pl' + String.fromCharCode(225) + 'stico</button>'
      +   '</div>'
      + '</div>'
      + '<div class="df-chip-bar" id="df-mat-chips"></div>'
      + '<div class="df-mat-panel" id="df-mat-panel"></div>'
      + '</div>';

    if (anchor) anchor.insertAdjacentElement('afterend', sec);
    else document.body.appendChild(sec);

    var currentTech = '3d';
    var currentMat = Object.keys(matData3D)[0];

    function renderChips(animate) {
      var data = currentTech === '3d' ? matData3D : matDataIny;
      var keys = Object.keys(data);
      currentMat = keys[0];
      var bar = document.getElementById('df-mat-chips');
      if (!bar) return;

      if (animate) {
        // Fade out chips, swap, fade in
        bar.style.opacity = '0';
        bar.style.transform = 'translateY(-6px)';
        bar.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
        setTimeout(function() {
          bar.innerHTML = keys.map(function(k, i) {
            return '<button class="df-chip' + (i === 0 ? ' df-chip-active' : '') + '" data-mat="' + k + '">' + k + '</button>';
          }).join('');
          attachChipEvents(bar);
          bar.style.opacity = '1';
          bar.style.transform = 'translateY(0)';
          renderPanel(true);
        }, 180);
      } else {
        bar.innerHTML = keys.map(function(k, i) {
          return '<button class="df-chip' + (i === 0 ? ' df-chip-active' : '') + '" data-mat="' + k + '">' + k + '</button>';
        }).join('');
        attachChipEvents(bar);
        renderPanel(false);
      }
    }

    function attachChipEvents(bar) {
      bar.querySelectorAll('.df-chip').forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (btn.classList.contains('df-chip-active')) return;
          bar.querySelectorAll('.df-chip').forEach(function(b) { b.classList.remove('df-chip-active'); });
          btn.classList.add('df-chip-active');
          currentMat = btn.getAttribute('data-mat');
          renderPanel(true);
        });
      });
    }

    function renderPanel(animate) {
      var data = currentTech === '3d' ? matData3D : matDataIny;
      var panel = document.getElementById('df-mat-panel');
      if (!panel || !data[currentMat]) return;
      if (animate) {
        // Fade out + slide up, then swap content
        panel.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(8px)';
        setTimeout(function() {
          panel.innerHTML = buildMatPanel(data[currentMat], vecPfx);
          panel.style.transform = 'translateY(-8px)';
          // Force reflow
          panel.offsetHeight; // eslint-disable-line no-unused-expressions
          panel.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0)';
        }, 200);
      } else {
        panel.innerHTML = buildMatPanel(data[currentMat], vecPfx);
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      }
    }

    var sw = document.getElementById('df-tech-switch');
    if (sw) {
      sw.querySelectorAll('.df-tech-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (btn.classList.contains('df-tech-active')) return;
          sw.querySelectorAll('.df-tech-btn').forEach(function(b) { b.classList.remove('df-tech-active'); });
          btn.classList.add('df-tech-active');
          currentTech = btn.getAttribute('data-tech');
          renderChips(true);
        });
      });
    }
    renderChips(false);
  }

  function buildMatPanel(d, vecPfx) {
    var adv = (d.adv || []).map(function(a) { return '<li>' + a + '</li>'; }).join('');
    var apps = (d.apps || []).map(function(a) { return '<li>' + a + '</li>'; }).join('');
    var imgHtml = '<div class="df-mat-placeholder"><span>Imagen próximamente</span></div>';

    return '<div class="df-mat-left">'
      + '<div class="df-mat-img">' + imgHtml + '</div>'
      + '</div>'
      + '<div class="df-mat-right">'
      + '<span class="df-mat-tag">' + d.tag + '</span>'
      + '<div class="df-mat-title">' + d.title + '</div>'
      + '<p class="df-mat-desc">' + d.desc + '</p>'
      + '<div class="df-mat-cols">'
      + '<div><div class="df-mat-col-label">Ventajas</div><ul class="df-mat-adv">' + adv + '</ul></div>'
      + '<div><div class="df-mat-col-label">Aplicaciones</div><ul class="df-mat-apps">' + apps + '</ul></div>'
      + '</div>'
      + '</div>';
  }
  /* ─────────────────────────────────────────────────────────
     8. INJECT — Clientes y proyectos (logo carousel)
  ───────────────────────────────────────────────────────── */
  function injectNuestrasTecnologias() {
    if (document.getElementById('df-nuestras-tech')) return;
    var anchor = document.getElementById('df-materiales');

    var LOGOS = [
      { name: 'Diseño MX',        initials: 'DM', color: '#0f1f3d' },
      { name: 'Grupo Manufactura', initials: 'GM', color: '#1a3a5c' },
      { name: 'Tech Parts Co.',   initials: 'TP', color: '#2a1040' },
      { name: 'Plásticos Norte',  initials: 'PN', color: '#1a2010' },
      { name: 'Innovación 3D',    initials: 'I3', color: '#3a1818' },
      { name: 'Moldes Precisión', initials: 'MP', color: '#0a2030' },
    ];

    // Double for infinite loop
    function logoCard(l) {
      return '<div class="df-logo-card">'
        + '<div class="df-logo-placeholder" style="background:linear-gradient(135deg,' + l.color + ' 0%,#555 100%)">' + l.initials + '</div>'
        + '<span class="df-logo-name">' + l.name + '</span>'
        + '</div>';
    }
    var logosHTML = LOGOS.concat(LOGOS).map(logoCard).join('');

    var sec = document.createElement('div');
    sec.id = 'df-nuestras-tech';
    sec.innerHTML =
      '<div class="df-clientes-inner">'
      + '<div class="df-clientes-header">'
      + '<span class="df-clientes-eyebrow">Clientes y proyectos</span>'
      + '<h2>Empresas y proyectos que <span>confían en Dualform</span></h2>'
      + '</div>'
      + '<div class="df-logos-track-wrap">'
      + '<div class="df-logos-track" id="df-logos-track">' + logosHTML + '</div>'
      + '</div>'
      + '</div>';

    if (anchor) anchor.insertAdjacentElement('afterend', sec);
    else document.body.appendChild(sec);

    // Auto-scroll logos
    setTimeout(function() {
      var track = document.getElementById('df-logos-track');
      if (!track) return;
      var isPaused = false;
      track.addEventListener('mouseenter', function() { isPaused = true; });
      track.addEventListener('mouseleave', function() { isPaused = false; });
      function scrollLogos() {
        if (!isPaused) {
          track.scrollLeft += 0.5;
          if (track.scrollLeft >= track.scrollWidth / 2) {
            track.scrollLeft -= track.scrollWidth / 2;
          }
        }
        requestAnimationFrame(scrollLogos);
      }
      requestAnimationFrame(scrollLogos);
    }, 700);
  }

  /* ─────────────────────────────────────────────────────────
     9. INJECT — CTA Contacto (dark)
  ───────────────────────────────────────────────────────── */
  function injectCTA() {
    if (document.getElementById('df-cta-contact')) return;
    var anchor = document.getElementById('df-nuestras-tech');

    // Build root-relative CTA link path
    var ctaHref = (function(){
      var p = window.location.pathname.split('/');
      var fi = p.indexOf('formlabs.com');
      var d = fi !== -1 ? p.length - fi - 2 : 0;
      var pfx = ''; for(var i=0;i<d;i++) pfx+='../';
      return (pfx||'') + 'contacto/index.html';
    })();

    var sec = document.createElement('div');
    sec.id = 'df-cta-contact';
    sec.innerHTML =
      // Decorative background elements
      '<div class="df-cta-grid" aria-hidden="true"></div>'
      +'<div class="df-cta-orb" aria-hidden="true"></div>'
      // Two-column layout
      +'<div class="df-cta-inner">'
        +'<div class="df-cta-text">'
          +'<span class="df-cta-eyebrow">Cotizaci\u00f3n sin costo</span>'
          +'<h2>\u00bfTienes una pieza o proyecto en mente?</h2>'
          +'<p>Podemos ayudarte a convertir una idea, plano o muestra f\u00edsica en una pieza fabricada mediante impresi\u00f3n 3D o inyecci\u00f3n pl\u00e1stica.</p>'
          // Feature chips
          +'<div class="df-cta-chips">'
            +'<span>Impresi\u00f3n 3D</span>'
            +'<span>Inyecci\u00f3n de pl\u00e1stico</span>'
            +'<span>Dise\u00f1o CAD</span>'
            +'<span>Prototipado r\u00e1pido</span>'
          +'</div>'
        +'</div>'
        +'<div class="df-cta-action">'
          // Decorative stat cards
          +'<div class="df-cta-stats">'
            +'<div class="df-cta-stat"><span class="df-cta-stat-num">24h</span><span class="df-cta-stat-lbl">Tiempo de respuesta</span></div>'
            +'<div class="df-cta-stat"><span class="df-cta-stat-num">100%</span><span class="df-cta-stat-lbl">Cotizaci\u00f3n gratuita</span></div>'
          +'</div>'
          +'<a class="df-cta-btn" href="'+ctaHref+'">'
            +'<span>Solicitar cotizaci\u00f3n</span>'
            +svgIcon(ICON.arrow)
          +'</a>'
          +'<p class="df-cta-note">Sin compromiso \u00b7 Respuesta en menos de 24 horas</p>'
        +'</div>'
      +'</div>';
    if (anchor) anchor.insertAdjacentElement('afterend', sec);
    else document.body.appendChild(sec);
  }

  /* ─────────────────────────────────────────────────────────
     10. REPLACE FOOTER
  ───────────────────────────────────────────────────────── */
  function replaceFooter() {
    if (document.getElementById('df-footer')) return;

    // Hide old footer
    document.querySelectorAll('footer:not(#df-footer), [class*="Footer_footer"]:not(#df-footer)').forEach(function(f){
      f.classList.add('df-hide-legacy');
    });

    // Build root-relative footer link prefix
    var ftPfx = (function(){
      var p = window.location.pathname.split('/');
      var fi = p.indexOf('formlabs.com');
      var d = fi !== -1 ? p.length - fi - 2 : 0;
      var pfx = ''; for(var i=0;i<d;i++) pfx+='../';
      return pfx;
    })();

    var yr = new Date().getFullYear();
    var footer = document.createElement('footer');
    footer.id = 'df-footer';
    footer.innerHTML = '<div class="df-ft-inner">'
      +'<div class="df-ft-top">'
        // ── Brand column ──────────────────────────────────────────────────────
        +'<div class="df-ft-brand">'
          +'<a class="df-ft-logo" href="'+ftPfx+'index.html" title="Dualform \u2014 Inicio">'
            +'<img src="'+ftPfx+'Resources-Img-Vid/Dualform_logo_background_removed.png" alt="Dualform" class="df-ft-logo-img">'
          +'</a>'
          +'<div class="df-ft-brand-bar"></div>'
          +'<p class="df-ft-tagline">Manufactura avanzada en impresi\u00f3n 3D e inyecci\u00f3n pl\u00e1stica para industria y dise\u00f1o.</p>'
          +'<div class="df-ft-badges">'
            +'<span>Impresi\u00f3n 3D</span>'
            +'<span>Inyecci\u00f3n</span>'
            +'<span>Dise\u00f1o CAD</span>'
          +'</div>'
        +'</div>'
        // ── Link columns ──────────────────────────────────────────────────────
        +'<div class="df-ft-col"><h4>Servicios</h4><ul>'
          +'<li><a href="'+ftPfx+'impresion-3d/index.html">Impresi\u00f3n 3D</a></li>'
          +'<li><a href="'+ftPfx+'inyeccion-de-plastico/index.html">Inyecci\u00f3n de pl\u00e1stico</a></li>'
          +'<li><a href="'+ftPfx+'servicios/index.html">Dise\u00f1o 3D</a></li>'
          +'<li><a href="'+ftPfx+'servicios/index.html">Prototipado r\u00e1pido</a></li>'
        +'</ul></div>'
        +'<div class="df-ft-col"><h4>Aplicaciones</h4><ul>'
          +'<li><a href="'+ftPfx+'aplicaciones/index.html">Prototipado r\u00e1pido</a></li>'
          +'<li><a href="'+ftPfx+'aplicaciones/index.html">Piezas de uso final</a></li>'
          +'<li><a href="'+ftPfx+'industria/index.html">Ingenier\u00eda</a></li>'
          +'<li><a href="'+ftPfx+'industria/index.html">Fabricaci\u00f3n</a></li>'
        +'</ul></div>'
        +'<div class="df-ft-col"><h4>Contacto</h4><ul>'
          +'<li><a href="'+ftPfx+'contacto/index.html">Solicitar cotizaci\u00f3n</a></li>'
          +'<li><a href="'+ftPfx+'contacto/index.html">Soporte t\u00e9cnico</a></li>'
          +'<li><span>contacto@dualform.mx</span></li>'
          +'<li><span>+52 (55) 0000-0000</span></li>'
        +'</ul></div>'
      +'</div>'
      +'<hr class="df-ft-divider">'
      +'<div class="df-ft-bottom">'
        +'<span class="df-ft-copy">&copy; '+yr+' Dualform. Todos los derechos reservados.</span>'
        +'<div class="df-ft-legal">'
          +'<a href="#">Privacidad</a>'
          +'<a href="#">Términos de uso</a>'
        +'</div>'
      +'</div>'
    +'</div>';

    // Insert after CTA or before end of body
    var ctaSec = document.getElementById('df-cta-contact');
    if (ctaSec) ctaSec.insertAdjacentElement('afterend', footer);
    else document.body.appendChild(footer);
  }

  /* ─────────────────────────────────────────────────────────
     SURGICAL LEGACY HIDE — only specific known sections
  ───────────────────────────────────────────────────────── */

  // IDs of known legacy Formlabs sections to always hide
  var LEGACY_SECTION_IDS = [
    'news', 'us-news', 'eu-uk-global-news', 'de-ch-news', 'fr-news',
    'it-news', 'es-latam-news', 'cn-news', 'jp-news', 'kr-news',
    'us-featured-products', 'eu-featured-products', 'uk-featured-products',
    'de-featured-products', 'ch-featured-products', 'fr-featured-products',
    'it-featured-products', 'es-featured-products', 'global-latam-apac-featured-products',
    'localpromo', 'materials'
  ];

  function sweepLegacy() {
    // ── 1. Hide specific known legacy section IDs ──────────────────────────
    LEGACY_SECTION_IDS.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && (!el.id || el.id.indexOf('df-') !== 0)) {
        el.classList.add('df-hide-legacy');
      }
    });

    // ── 2. Hide by known Formlabs class names (section-level only) ─────────
    var SECTION_SELECTORS = [
      '[class*="NewsSection_main"]',
      '[class*="ProductsSection_wrapper"]',
      '[class*="IndustrySection_wrapper"]',
      '[class*="GetInTouchSection_wrapper"]',
      '[class*="MediaTextSection_section-wrapper"]',
      '[class*="IndustrySection_wrapper"]',
      'section[data-sticky-menu-theme][class*="IndustrySection"]',
      'section[data-sticky-menu-theme][class*="GetInTouch"]'
    ];
    SECTION_SELECTORS.forEach(function(sel) {
      try {
        document.querySelectorAll(sel).forEach(function(el) {
          if (el.id && el.id.indexOf('df-') === 0) return;
          if (el.closest && el.closest('#df-footer, #df-servicios-section, #df-tecnologias-fab, #df-materiales, #df-nuestras-tech, #df-cta-contact, #df-sectors-section')) return;
          el.classList.add('df-hide-legacy');
        });
      } catch(e) {}
    });

    // ── 3. Hide old Formlabs footer ────────────────────────────────────────
    document.querySelectorAll('footer:not(#df-footer)').forEach(function(f) {
      f.classList.add('df-hide-legacy');
    });
    document.querySelectorAll('[class*="GlobalFooter"], [class*="Footer_footer__vpzPu"]').forEach(function(f) {
      if (f.id !== 'df-footer' && !f.closest('#df-footer')) f.classList.add('df-hide-legacy');
    });

    // ── 4. Hide legacy hero buttons / buy links ────────────────────────────
    document.querySelectorAll('a').forEach(function(a) {
      var t = a.textContent.trim().toLowerCase();
      if (t === 'buy now' || t === 'shop all' || t === 'shop now' ||
          t === 'contact sales' || t === 'explore 3d printers') {
        a.style.display = 'none';
      }
    });

    // ── 5. Hide broken images ──────────────────────────────────────────────
    document.querySelectorAll('img').forEach(function(img) {
      if (img.complete && img.naturalWidth === 0) img.style.display = 'none';
      if (!img._dfErrBound) {
        img._dfErrBound = true;
        img.addEventListener('error', function() { img.style.display = 'none'; });
      }
    });

    // ── 6. Hide featured products wrapper (has Buy Now cards) ─────────────
    var fp = document.getElementById('featured-products');
    if (fp) fp.classList.add('df-hide-legacy');

    // ── 7. Hide legacy nav from Formlabs (our header replaces it) ─────────
    document.querySelectorAll(
      '[class*="Header_header__WTZds"], [class*="Drawer_drawer"], [class*="Drawer_backdrop"]'
    ).forEach(function(el) {
      el.classList.add('df-hide-legacy');
    });
  }


  /* ─────────────────────────────────────────────────────────
     RUN
  ───────────────────────────────────────────────────────── */
  function run() {
    fixDropdowns();
    injectHeroTitle();
    translateHeroButtons();
    deactivateIndustryCards();
    injectSectorsSection();
    hideLegacySections();
    sweepLegacy();
    injectServiciosSection();
    injectTecnologiasFab();
    injectMateriales();
    injectNuestrasTecnologias();
    injectCTA();
    replaceFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  // Re-sweep after Next.js hydration renders late content
  [300, 800, 1500, 3000].forEach(function(ms) {
    setTimeout(function() {
      sweepLegacy();
      injectHeroTitle();
      translateHeroButtons();
      injectSectorsSection();
    }, ms);
  });

  // MutationObserver: catch any section added dynamically after load
  var observer = new MutationObserver(function(mutations) {
    var needsSweep = false;
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(n) {
        if (n.nodeType === 1) needsSweep = true;
      });
    });
    if (needsSweep) sweepLegacy();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Stop observing after 10 seconds (page is stable by then)
  setTimeout(function() { observer.disconnect(); }, 10000);

})();
