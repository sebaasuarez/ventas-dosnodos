/* =============================================
   Dos Nodos · Landing de ventas
   JS mínimo: WhatsApp, formulario, medición, UX, chat animado.
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

  /* ---------- WhatsApp ---------- */
  function buildWaUrl(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message || WA_MESSAGES.general);
  }
  function resolveWaMessage(el) {
    const key = el.getAttribute('data-wa');
    return (key && WA_MESSAGES[key]) ? WA_MESSAGES[key] : WA_MESSAGES.general;
  }
  function wirePresetWaLinks() {
    document.querySelectorAll('[data-wa]').forEach(function (el) {
      el.setAttribute('href', buildWaUrl(resolveWaMessage(el)));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  /* ---------- Click tracking ---------- */
  function wireEventTracking() {
    document.querySelectorAll('[data-event]').forEach(function (el) {
      el.addEventListener('click', function () {
        const name = el.getAttribute('data-event');
        if (!name || name === 'submit_form_contacto') return;
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
    function close() { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
    function open()  { nav.classList.add('is-open');    toggle.setAttribute('aria-expanded', 'true'); }
    toggle.addEventListener('click', function () {
      nav.classList.contains('is-open') ? close() : open();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- Reveal on scroll ---------- */
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

  /* ---------- WhatsApp chat animation (infinite loop) ---------- */
  function wireChatAnimation() {
    const thread = document.getElementById('wa-thread');
    if (!thread) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Render estático con 3 burbujas
      thread.innerHTML =
        '<div class="wa-msg them" style="opacity:1;transform:none">Hola, vi su landing. ¿Cuánto cuesta una para mi café?<span class="wa-time">10:24</span></div>' +
        '<div class="wa-msg me"   style="opacity:1;transform:none">¡Hola! Desde $700.000. Te paso info.<span class="wa-time">10:24 <span class="wa-ticks">✓✓</span></span></div>' +
        '<div class="wa-msg them" style="opacity:1;transform:none">Perfecto, quiero agendar 🙌<span class="wa-time">10:25</span></div>';
      return;
    }

    // Guiones (loops infinitos). Mezcla negocios reales: café, tour, spa, barbería.
    const scripts = [
      [
        { side: 'them', text: '¿Tienen tours por Guatapé?', delayBefore: 0,    typing: 700 },
        { side: 'me',   text: '¡Sí! Plan completo $180.000 por persona 🚐', delayBefore: 600,  typing: 900 },
        { side: 'them', text: 'Listo, somos 4 personas el sábado',         delayBefore: 700,  typing: 900 },
        { side: 'me',   text: 'Reservado ✅ Te envío el punto de encuentro', delayBefore: 600,  typing: 1100 }
      ],
      [
        { side: 'them', text: 'Hola, ¿tienen mesa para 4 esta noche?',     delayBefore: 0,    typing: 800 },
        { side: 'me',   text: '¡Hola! Sí, a las 8:00 pm 🍝',                delayBefore: 500,  typing: 700 },
        { side: 'them', text: 'Perfecto, confirmamos 🙌',                  delayBefore: 700,  typing: 700 },
        { side: 'me',   text: 'Reserva guardada a nombre tuyo',            delayBefore: 500,  typing: 900 }
      ],
      [
        { side: 'them', text: '¿Hacen corte + barba hoy?',                 delayBefore: 0,    typing: 700 },
        { side: 'me',   text: '¡Claro! Tenemos a las 4:30 pm 💈',           delayBefore: 600,  typing: 800 },
        { side: 'them', text: 'Listo, ahí estoy',                          delayBefore: 600,  typing: 600 },
        { side: 'me',   text: 'Agendado ✅ Te esperamos',                  delayBefore: 500,  typing: 800 }
      ],
      [
        { side: 'them', text: '¿Cuánto cuesta el masaje descontracturante?', delayBefore: 0,  typing: 850 },
        { side: 'me',   text: 'Desde $90.000 (60 min) 💆‍♀️',                 delayBefore: 600,  typing: 800 },
        { side: 'them', text: 'Genial, agéndame para mañana',              delayBefore: 600,  typing: 700 },
        { side: 'me',   text: '¡Hecho! 10:00 am, te llega recordatorio',   delayBefore: 500,  typing: 1000 }
      ]
    ];

    const VIEW_LINGER = 1900;   // pausa después de cada burbuja
    const PAUSE_BETWEEN = 1400; // pausa al terminar un guion antes del clear
    const MAX_VISIBLE = 4;      // burbujas máximas simultáneas
    let scriptIdx = 0;
    let cancelled = false;

    function now() { return Date.now(); }
    function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

    function makeTime() {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      return hh + ':' + mm;
    }

    function appendTyping() {
      const el = document.createElement('div');
      el.className = 'wa-typing';
      el.innerHTML = '<span></span><span></span><span></span>';
      thread.appendChild(el);
      trimOverflow();
      return el;
    }

    function appendMessage(side, text) {
      const el = document.createElement('div');
      el.className = 'wa-msg ' + side;
      const ticks = side === 'me' ? ' <span class="wa-ticks">✓✓</span>' : '';
      el.innerHTML = escapeHTML(text) +
        '<span class="wa-time">' + makeTime() + ticks + '</span>';
      thread.appendChild(el);
      trimOverflow();
      return el;
    }

    function escapeHTML(s) {
      return String(s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function trimOverflow() {
      // Mantén la lista corta: si excede MAX_VISIBLE, retira los primeros con animación.
      const items = thread.querySelectorAll('.wa-msg, .wa-typing');
      const excess = items.length - MAX_VISIBLE;
      for (let i = 0; i < excess; i++) {
        const node = items[i];
        if (!node || node.classList.contains('leaving')) continue;
        node.classList.add('leaving');
        setTimeout(function () { node.remove(); }, 320);
      }
    }

    async function clearAll() {
      const items = thread.querySelectorAll('.wa-msg, .wa-typing');
      items.forEach(function (n) { n.classList.add('leaving'); });
      await sleep(320);
      thread.innerHTML = '';
    }

    async function runScript(script) {
      for (let i = 0; i < script.length && !cancelled; i++) {
        const step = script[i];
        if (step.delayBefore) await sleep(step.delayBefore);
        if (cancelled) return;

        // typing indicator (solo si hay tiempo de "escribir")
        let typing = null;
        if (step.typing) {
          typing = appendTyping();
          await sleep(step.typing);
          if (cancelled) return;
          typing.classList.add('leaving');
          setTimeout(function () { typing && typing.remove(); }, 200);
          await sleep(120);
        }

        appendMessage(step.side, step.text);
        await sleep(VIEW_LINGER);
      }
    }

    async function loop() {
      while (!cancelled) {
        await runScript(scripts[scriptIdx]);
        if (cancelled) return;
        await sleep(PAUSE_BETWEEN);
        await clearAll();
        scriptIdx = (scriptIdx + 1) % scripts.length;
      }
    }

    // Inicia solo cuando el hero entra en viewport y se pausa al salir
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !thread.dataset.running) {
            thread.dataset.running = '1';
            cancelled = false;
            loop();
          } else if (!entry.isIntersecting && thread.dataset.running) {
            // Pausamos limpiamente
            cancelled = true;
            delete thread.dataset.running;
          }
        });
      }, { threshold: 0.15 });
      io.observe(thread);
    } else {
      loop();
    }
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
        if (!errEl.id) errEl.id = 'err-' + id;
        input.setAttribute('aria-describedby', errEl.id);
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
        if (status) { status.textContent = 'Revisa los campos marcados.'; status.classList.remove('is-ok'); }
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

      if (status) { status.textContent = 'Abriendo WhatsApp con tu mensaje listo…'; status.classList.add('is-ok'); }
      window.open(buildWaUrl(msg), '_blank', 'noopener');
    });

    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        if (el.closest('.field').classList.contains('is-invalid')) setError(el.id, false);
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
    wireChatAnimation();
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
