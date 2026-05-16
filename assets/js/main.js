/* =============================================
   Dos Nodos · Landing de ventas
   JS mínimo: WhatsApp, formulario, medición, UX.
   ============================================= */
(function () {
  'use strict';

  const WHATSAPP_NUMBER = '573127344026';

  const WA_MESSAGES = {
    general: 'Hola, vi la landing de Dos Nodos y quiero cotizar una página para mi negocio.',
    basico:  'Hola, quiero información del Plan Básico de landing para mi negocio.',
    pro:     'Hola, quiero información del Plan Pro de landing + contenido inicial.',
    premium: 'Hola, quiero cotizar el Plan Premium con landing, contenido y automatización.',
    demo:    'Hola, vi las demos de Dos Nodos y quiero una landing similar para mi negocio.'
  };

  /* ---------- dataLayer ---------- */
  window.dataLayer = window.dataLayer || [];

  function pushEvent(name, details) {
    if (!name) return;
    const payload = Object.assign({
      event: name,
      component: 'landing_ventas_dos_nodos'
    }, details || {});
    window.dataLayer.push(payload);
  }

  /* ---------- WhatsApp link helpers ---------- */
  function buildWaUrl(message) {
    const text = encodeURIComponent(message || WA_MESSAGES.general);
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;
  }

  function resolveWaMessage(el) {
    const key = el.getAttribute('data-wa');
    if (key && WA_MESSAGES[key]) return WA_MESSAGES[key];
    return WA_MESSAGES.general;
  }

  function wirePresetWaLinks() {
    document.querySelectorAll('[data-wa]').forEach(function (el) {
      const message = resolveWaMessage(el);
      el.setAttribute('href', buildWaUrl(message));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  /* ---------- Generic click tracking ---------- */
  function wireEventTracking() {
    document.querySelectorAll('[data-event]').forEach(function (el) {
      el.addEventListener('click', function () {
        const name = el.getAttribute('data-event');
        if (!name) return;
        if (name === 'submit_form_contacto') return; // handled by form submit
        pushEvent(name, {
          section: el.getAttribute('data-section') || '',
          cta_text: (el.textContent || '').trim().replace(/\s+/g, ' ')
        });
      }, { passive: true });
    });
  }

  /* ---------- Header scroll state ---------- */
  function wireHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function wireMobileMenu() {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    if (!nav || !toggle) return;

    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function open() {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) close(); else open();
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------- Reveal on scroll (light) ---------- */
  function wireReveal() {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('.section .card, .section .plan, .section .demo-card, .section .steps li, .section .card-mini');
    targets.forEach(function (el) { el.classList.add('reveal'); });
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Form ---------- */
  function wireForm() {
    const form = document.getElementById('form-contacto');
    if (!form) return;
    const status = document.getElementById('form-status');

    function setError(id, hasError) {
      const input = document.getElementById(id);
      if (!input) return;
      const field = input.closest('.field');
      const errEl = form.querySelector('[data-error-for="' + id + '"]');
      if (!field || !errEl) return;
      field.classList.toggle('is-invalid', !!hasError);
      errEl.hidden = !hasError;
      if (hasError) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', errEl.id || ('err-' + id));
        if (!errEl.id) errEl.id = 'err-' + id;
      } else {
        input.removeAttribute('aria-invalid');
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const fields = {
        nombre:   document.getElementById('f-nombre'),
        negocio:  document.getElementById('f-negocio'),
        whatsapp: document.getElementById('f-whatsapp'),
        tipo:     document.getElementById('f-tipo'),
        mensaje:  document.getElementById('f-mensaje')
      };

      let valid = true;
      ['nombre','negocio','whatsapp','tipo'].forEach(function (k) {
        const el = fields[k];
        const ok = el && el.value && el.value.trim().length >= (k === 'whatsapp' ? 7 : 2);
        const phoneOk = (k !== 'whatsapp') || /^[0-9+()\-\s]{7,}$/.test(el.value.trim());
        const isOk = ok && phoneOk;
        setError(el.id, !isOk);
        if (!isOk) valid = false;
      });

      if (!valid) {
        if (status) {
          status.textContent = 'Revisa los campos marcados.';
          status.classList.remove('is-ok');
        }
        const firstInvalid = form.querySelector('.is-invalid input, .is-invalid select, .is-invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const msg =
        'Hola, soy ' + fields.nombre.value.trim() +
        ' del negocio "' + fields.negocio.value.trim() + '"' +
        ' (' + fields.tipo.value + ').' +
        ' Mi WhatsApp: ' + fields.whatsapp.value.trim() + '.' +
        (fields.mensaje && fields.mensaje.value.trim()
          ? ' Mensaje: ' + fields.mensaje.value.trim()
          : ' Quiero cotizar una landing para mi negocio.');

      pushEvent('submit_form_contacto', {
        section: 'cta_final',
        tipo_negocio: fields.tipo.value,
        cta_text: 'Enviar y abrir WhatsApp'
      });

      if (status) {
        status.textContent = 'Abriendo WhatsApp con tu mensaje listo…';
        status.classList.add('is-ok');
      }

      window.open(buildWaUrl(msg), '_blank', 'noopener');
    });

    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        if (el.closest('.field').classList.contains('is-invalid')) {
          setError(el.id, false);
        }
      });
    });
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Init ---------- */
  function init() {
    wirePresetWaLinks();
    wireEventTracking();
    wireHeaderScroll();
    wireMobileMenu();
    wireReveal();
    wireForm();
    setYear();
    pushEvent('view_landing_dos_nodos', { section: 'page' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
