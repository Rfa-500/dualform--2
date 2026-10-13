/* Small progressive enhancements for the home; no external runtime. */
(function () {
  'use strict';
  if (!document.body.classList.contains('df-home')) return;

  var stage = document.getElementById('df-machine-stage');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var hero = document.getElementById('df-home-hero');

  if (stage && hero) {
    var object = stage.querySelector('.df-machine-object');
    var controls = stage.querySelector('.df-machine-controls');
    var points = Array.from(stage.querySelectorAll('.df-machine-point'));
    var detail = document.getElementById('df-machine-detail');
    var pinned = null;
    var focusedPart = null;
    var frameId = 0;
    var latestX = 0;
    var latestY = 0;
    var descriptions = {
      clamp: ['Unidad de cierre', 'La zona donde se aloja el molde.'],
      control: ['Panel de control', 'La interfaz de operación de la máquina.'],
      injection: ['Unidad de inyección', 'El conjunto que alimenta el molde.']
    };
    // Keep the original image as the fallback until every articulated layer can render.
    var layerImages = Array.from(stage.querySelectorAll('.df-machine-rig img'));
    var texture = new Image();
    texture.src = stage.querySelector('.df-machine-panel image').getAttribute('href');
    layerImages.push(texture);
    Promise.all(layerImages.map(function (img) { return img.decode(); })).then(function () {
      stage.classList.add('df-parts-ready');
      controls.hidden = false;
    }).catch(function () { /* Static, complete machine remains usable if a layer fails. */ });

    function show(part) {
      if (!part) {
        object.removeAttribute('data-active-part');
        detail.hidden = true;
      } else {
        object.dataset.activePart = part;
        detail.querySelector('.df-machine-detail-label').textContent = descriptions[part][0];
        detail.querySelector('.df-machine-detail-text').textContent = descriptions[part][1];
        detail.hidden = false;
      }
      points.forEach(function (button) {
        button.setAttribute('aria-expanded', String(button.dataset.part === part));
        button.setAttribute('aria-pressed', String(button.dataset.part === part));
      });
    }
    points.forEach(function (button) {
      button.addEventListener('pointerenter', function (event) {
        if (event.pointerType !== 'touch') show(button.dataset.part);
      });
      button.addEventListener('pointerleave', function () {
        show(pinned || focusedPart);
      });
      button.addEventListener('focus', function () {
        focusedPart = button.matches(':focus-visible') ? button.dataset.part : null;
        show(button.dataset.part);
      });
      button.addEventListener('blur', function () { focusedPart = null; show(pinned); });
      button.addEventListener('click', function () {
        pinned = pinned === button.dataset.part ? null : button.dataset.part;
        if (!pinned) focusedPart = null;
        show(pinned);
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { pinned = null; focusedPart = null; show(null); }
    });
    document.addEventListener('pointerdown', function (event) {
      if (!stage.contains(event.target)) { pinned = null; focusedPart = null; show(null); }
    });

    function resetMotion() {
      cancelAnimationFrame(frameId);
      frameId = 0;
      ['--machine-rx','--machine-ry','--shadow-x','--shadow-scale','--machine-light-angle'].forEach(function (name) { object.style.removeProperty(name); });
    }
    function renderMotion() {
      object.style.setProperty('--machine-rx', (-latestY * 1.8).toFixed(2) + 'deg');
      object.style.setProperty('--machine-ry', (latestX * 2.8).toFixed(2) + 'deg');
      object.style.setProperty('--shadow-x', (-latestX * 7).toFixed(2) + 'px');
      object.style.setProperty('--shadow-scale', (1 - Math.abs(latestX) * .035).toFixed(3));
      object.style.setProperty('--machine-light-angle', (100 + latestX * 25).toFixed(1) + 'deg');
      frameId = 0;
    }
    stage.addEventListener('pointermove', function (event) {
      if (motion.matches || !pointer.matches || event.pointerType === 'touch') return;
      var bounds = stage.getBoundingClientRect();
      latestX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
      latestY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
      if (!frameId) frameId = requestAnimationFrame(renderMotion);
    }, { passive: true });
    stage.addEventListener('pointerleave', resetMotion);
    motion.addEventListener('change', resetMotion);
    pointer.addEventListener('change', resetMotion);
    document.addEventListener('visibilitychange', function () { if (document.hidden) resetMotion(); });
  }

  // Reveal only at entry: content never starts hidden or depends on the observer.
  if ('IntersectionObserver' in window && !motion.matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('df-reveal');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll('.df-serv-header, .df-tf-header, .df-mat-header, .df-clientes-header, .df-cta-inner').forEach(function (section) {
      observer.observe(section);
    });
    motion.addEventListener('change', function () {
      if (motion.matches) observer.disconnect();
    });
  }
})();
