/* =============================================
   Dos Nodos · Landing
   JS mínimo: WhatsApp, formulario, medición, chat animado.
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
    window.dataLayer.push(Object.assign({
      event: name,
      component: 'landing_ventas_dos_nodos'
    }, details || {}));
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

  /* ---------- Header scroll ---------- */
  function wireHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
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
    toggle.addEventListener('click', function () { nav.classList.contains('is-open') ? close() : open(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- Reveal on scroll ---------- */
  function wireReveal() {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('.ben, .demo, .plan, .step, .spec-sheet > div, .sol-list li, .faq details');
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i, 8) * 40) + 'ms';
    });
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
      thread.innerHTML =
        '<div class="wa-msg them" style="opacity:1;transform:none">Hola, vi su landing. ¿Cuánto cuesta una para mi café?<span class="wa-time">10:24</span></div>' +
        '<div class="wa-msg me"   style="opacity:1;transform:none">¡Hola! Desde $1.200.000. Te paso info.<span class="wa-time">10:24 <span class="wa-ticks"><svg class="ico" aria-hidden="true" focusable="false"><use href="#ico-ticks"/></svg></span></span></div>' +
        '<div class="wa-msg them" style="opacity:1;transform:none">Perfecto, quiero agendar 🙌<span class="wa-time">10:25</span></div>';
      return;
    }

    const scripts = [
      [
        { side: 'them', text: '¿Tienen tours por Guatapé?',                  delayBefore: 0,    typing: 700 },
        { side: 'me',   text: '¡Sí! Plan completo $180.000 por persona',     delayBefore: 600,  typing: 900 },
        { side: 'them', text: 'Listo, somos 4 personas el sábado',           delayBefore: 700,  typing: 900 },
        { side: 'me',   text: 'Reservado ✓ Te envío el punto de encuentro',  delayBefore: 600,  typing: 1100 }
      ],
      [
        { side: 'them', text: 'Hola, ¿tienen mesa para 4 esta noche?',       delayBefore: 0,    typing: 800 },
        { side: 'me',   text: '¡Hola! Sí, a las 8:00 pm',                    delayBefore: 500,  typing: 700 },
        { side: 'them', text: 'Perfecto, confirmamos',                       delayBefore: 700,  typing: 700 },
        { side: 'me',   text: 'Reserva guardada a nombre tuyo',              delayBefore: 500,  typing: 900 }
      ],
      [
        { side: 'them', text: '¿Hacen corte + barba hoy?',                   delayBefore: 0,    typing: 700 },
        { side: 'me',   text: '¡Claro! Tenemos a las 4:30 pm',                delayBefore: 600,  typing: 800 },
        { side: 'them', text: 'Listo, ahí estoy',                            delayBefore: 600,  typing: 600 },
        { side: 'me',   text: 'Agendado ✓ Te esperamos',                     delayBefore: 500,  typing: 800 }
      ],
      [
        { side: 'them', text: '¿Cuánto cuesta el masaje descontracturante?', delayBefore: 0,    typing: 850 },
        { side: 'me',   text: 'Desde $90.000 (60 min)',                       delayBefore: 600,  typing: 800 },
        { side: 'them', text: 'Genial, agéndame para mañana',                delayBefore: 600,  typing: 700 },
        { side: 'me',   text: '¡Hecho! 10:00 am, te llega recordatorio',     delayBefore: 500,  typing: 1000 }
      ]
    ];

    const VIEW_LINGER = 1900;
    const PAUSE_BETWEEN = 1400;
    const MAX_VISIBLE = 4;
    let scriptIdx = 0;
    let cancelled = false;

    function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
    function makeTime() {
      const d = new Date();
      return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    }
    function escapeHTML(s) {
      return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    function trimOverflow() {
      const items = thread.querySelectorAll('.wa-msg, .wa-typing');
      const excess = items.length - MAX_VISIBLE;
      for (let i = 0; i < excess; i++) {
        const node = items[i];
        if (!node || node.classList.contains('leaving')) continue;
        node.classList.add('leaving');
        setTimeout(function () { node.remove(); }, 320);
      }
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
      const ticks = side === 'me' ? ' <span class="wa-ticks"><svg class="ico" aria-hidden="true" focusable="false"><use href="#ico-ticks"/></svg></span>' : '';
      el.innerHTML = escapeHTML(text) + '<span class="wa-time">' + makeTime() + ticks + '</span>';
      thread.appendChild(el);
      trimOverflow();
      return el;
    }
    async function clearAll() {
      thread.querySelectorAll('.wa-msg, .wa-typing').forEach(function (n) { n.classList.add('leaving'); });
      await sleep(320);
      thread.innerHTML = '';
    }
    async function runScript(script) {
      for (let i = 0; i < script.length && !cancelled; i++) {
        const step = script[i];
        if (step.delayBefore) await sleep(step.delayBefore);
        if (cancelled) return;
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

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !thread.dataset.running) {
            thread.dataset.running = '1';
            cancelled = false;
            loop();
          } else if (!entry.isIntersecting && thread.dataset.running) {
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

      /* El lead se guarda en el CRM de dosnodos.com.co ANTES de abrir WhatsApp.
         Antes el formulario solo abría el chat: si la persona no llegaba a
         enviar el mensaje, el contacto se perdía sin dejar rastro. */
      saveLead({
        name: fields.nombre.value.trim(),
        company: fields.negocio.value.trim(),
        phone: fields.whatsapp.value.trim(),
        message: (fields.mensaje && fields.mensaje.value.trim()) || '',
        tipo: fields.tipo.value
      });

      if (status) { status.textContent = 'Abriendo WhatsApp con tu mensaje listo…'; status.classList.add('is-ok'); }
      /* La ventana se abre de inmediato y en el mismo gesto del clic: si se
         esperara la respuesta del CRM, el navegador la bloquearía como popup. */
      window.open(buildWaUrl(msg), '_blank', 'noopener');
    });

    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        if (el.closest('.field').classList.contains('is-invalid')) setError(el.id, false);
      });
    });
  }


  /* ---------- CRM ---------- */
  var CRM_ENDPOINT = 'https://dosnodos.com.co/api/contact';

  /* Envía el lead al CRM sin bloquear la apertura de WhatsApp. Si falla, se
     registra en consola y ya: nunca debe impedir que la persona escriba. */
  function saveLead(data) {
    var payload = {
      name: data.name,
      company: data.company,
      phone: data.phone,
      message: (data.tipo ? '[' + data.tipo + '] ' : '') + (data.message || 'Quiere cotizar una landing.'),
      language: 'es',
      source: 'ventas'
    };

    try {
      fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function (e) { console.warn('CRM:', e); });
    } catch (e) {
      console.warn('CRM:', e);
    }
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Smooth in-page navigation (without polluting URL with #) ---------- */
  function wireSmoothNav() {
    function go(target) {
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    }
    document.addEventListener('click', function (e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      if (a.hasAttribute('data-wa')) return;
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      go(target);
    });
    if (location.hash && location.hash.length > 1) {
      const id = location.hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
          try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
        }, 30);
      }
    }
  }

  /* ---------- Scroll progress bar ---------- */
  function wireScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    let ticking = false;
    function update() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      bar.style.setProperty('--p', pct.toFixed(1) + '%');
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Stat counters (count-up on enter view) ---------- */
  function wireStatCounters() {
    const nums = document.querySelectorAll('[data-count-to]');
    if (!nums.length || !('IntersectionObserver' in window)) {
      nums.forEach(function (el) { el.textContent = el.getAttribute('data-count-to') + (el.getAttribute('data-count-suffix') || ''); });
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      nums.forEach(function (el) { el.textContent = el.getAttribute('data-count-to') + (el.getAttribute('data-count-suffix') || ''); });
      return;
    }
    function countUp(el) {
      const target = parseFloat(el.getAttribute('data-count-to'));
      const suffix = el.getAttribute('data-count-suffix') || '';
      const duration = 1400;
      const start = performance.now();
      function step(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
        const value = Math.round(target * eased);
        el.textContent = value + suffix;
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
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
    wireScrollProgress();
    wireStatCounters();
    wireSmoothNav();
    setYear();
    pushEvent('view_landing_dos_nodos', { section: 'page' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
