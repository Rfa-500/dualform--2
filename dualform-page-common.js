/* dualform-page-common.js v2 — premium footer + chip helper */
(function() {

  /* ── Premium Footer (matches home #df-footer) ─────────────── */
  function buildFooter() {
    var f = document.getElementById('df-footer');
    if (!f) return;
    var yr = new Date().getFullYear();
    var pfx = '../';

    f.outerHTML =
      '<footer id="df-footer">' +
        '<div class="df-ft-inner">' +
          '<div class="df-ft-top">' +
            // Brand column
            '<div class="df-ft-brand">' +
              '<a class="df-ft-logo" href="' + pfx + 'index.html" title="Dualform">' +
                '<img src="' + pfx + 'Resources-Img-Vid/Dualform_logo_background_removed.png" alt="Dualform" class="df-ft-logo-img">' +
              '</a>' +
              '<div class="df-ft-brand-bar"></div>' +
              '<p class="df-ft-tagline">Manufactura avanzada en impresi\u00f3n 3D e inyecci\u00f3n pl\u00e1stica para industria y dise\u00f1o.</p>' +
              '<div class="df-ft-badges">' +
                '<span>Impresi\u00f3n 3D</span>' +
                '<span>Inyecci\u00f3n</span>' +
                '<span>Dise\u00f1o CAD</span>' +
              '</div>' +
            '</div>' +
            // Services column
            '<div class="df-ft-col"><h4>Servicios</h4><ul>' +
              '<li><a href="' + pfx + 'impresion-3d/index.html">Impresi\u00f3n 3D</a></li>' +
              '<li><a href="' + pfx + 'inyeccion-de-plastico/index.html">Inyecci\u00f3n de pl\u00e1stico</a></li>' +
              '<li><a href="' + pfx + 'servicios/index.html">Dise\u00f1o 3D</a></li>' +
              '<li><a href="' + pfx + 'servicios/index.html">Prototipado r\u00e1pido</a></li>' +
            '</ul></div>' +
            // Pages column
            '<div class="df-ft-col"><h4>P\u00e1ginas</h4><ul>' +
              '<li><a href="' + pfx + 'aplicaciones/index.html">Aplicaciones</a></li>' +
              '<li><a href="' + pfx + 'industria/index.html">Industria</a></li>' +
              '<li><a href="' + pfx + 'materiales/index.html">Materiales</a></li>' +
            '</ul></div>' +
            // Contact column
            '<div class="df-ft-col"><h4>Contacto</h4><ul>' +
              '<li><a href="' + pfx + 'contacto/index.html">Solicitar cotizaci\u00f3n</a></li>' +
              '<li><a href="' + pfx + 'contacto/index.html">Soporte t\u00e9cnico</a></li>' +
              '<li><span>contacto@dualform.mx</span></li>' +
              '<li><span>+52 (55) 0000-0000</span></li>' +
            '</ul></div>' +
          '</div>' +
          '<hr class="df-ft-divider">' +
          '<div class="df-ft-bottom">' +
            '<span class="df-ft-copy">&copy; ' + yr + ' Dualform. Todos los derechos reservados.</span>' +
            '<div class="df-ft-legal">' +
              '<a href="#">Privacidad</a>' +
              '<a href="#">T\u00e9rminos de uso</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  /* ── Chip selector helper ─────────────────────────────────── */
  window.dfChips = function(barId, panelId, data) {
    var keys = Object.keys(data);
    var active = keys[0];
    var bar = document.getElementById(barId);
    var panel = document.getElementById(panelId);
    if (!bar || !panel) return;

    function renderChips() {
      bar.innerHTML = keys.map(function(k) {
        return '<button class="df-chip' + (k === active ? ' active' : '') + '" data-key="' + k + '">' + k + '</button>';
      }).join('');
      bar.querySelectorAll('.df-chip').forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (btn.classList.contains('active')) return;
          active = btn.getAttribute('data-key');
          bar.querySelectorAll('.df-chip').forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          renderPanel(true);
        });
      });
    }

    function renderPanel(animate) {
      var d = data[active];
      if (!d) return;
      var uses = (d.uses || []).map(function(u) { return '<li>' + u + '</li>'; }).join('');
      var adv  = (d.adv  || []).map(function(u) { return '<li>' + u + '</li>'; }).join('');
      var html =
        '<div class="df-mat-panel-info">' +
          '<span class="df-mat-tag">' + (d.tag || '') + '</span>' +
          '<div class="df-mat-title">' + (d.title || active) + '</div>' +
          '<p class="df-mat-desc">' + (d.desc || '') + '</p>' +
          (adv  ? '<h4 style="font-size:0.75rem;color:#E8521A;text-transform:uppercase;letter-spacing:0.09em;margin-bottom:8px;margin-top:18px;font-weight:700;">Ventajas</h4><ul class="df-mat-list">' + adv + '</ul>' : '') +
          (uses ? '<h4 style="font-size:0.75rem;color:#E8521A;text-transform:uppercase;letter-spacing:0.09em;margin-bottom:8px;margin-top:18px;font-weight:700;">Usos recomendados</h4><ul class="df-mat-list">' + uses + '</ul>' : '') +
        '</div>' +
        '<div class="df-placeholder df-placeholder--light" style="min-height:280px;">' +
          '<div class="df-placeholder-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></div>' +
          '<span class="df-placeholder-label">Imagen \u2014 ' + active + '</span>' +
        '</div>';

      if (animate) {
        panel.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(6px)';
        setTimeout(function() {
          panel.innerHTML = html;
          panel.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0)';
        }, 185);
      } else {
        panel.innerHTML = html;
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      }
    }

    renderChips();
    renderPanel(false);
  };

  /* ── Init ─────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function() {
    buildFooter();
    if (typeof window.dfPageInit === 'function') window.dfPageInit();
  });

})();
