(function () {
  'use strict';

  var WHATSAPP_NUMBER = '573127344026';
  var defaults = {
    tour: 'Hola, vi la demo de turismo y quiero una landing similar para vender reservas por WhatsApp.',
    cafe: 'Hola, vi la demo de cafe/restaurante y quiero una landing similar para mi negocio.',
    spa: 'Hola, vi la demo de spa/estetica y quiero una landing similar para agendar por WhatsApp.'
  };

  window.dataLayer = window.dataLayer || [];

  function pushEvent(name, details) {
    if (!name) return;
    window.dataLayer.push(Object.assign({
      event: name,
      component: 'demo_ventas_dos_nodos',
      demo_type: currentDemo()
    }, details || {}));
  }

  function buildWaUrl(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  function currentDemo() {
    return document.body.getAttribute('data-demo') || 'tour';
  }

  function wireWhatsAppLinks() {
    var key = currentDemo();
    document.querySelectorAll('[data-demo-wa]').forEach(function (link) {
      var msg = link.getAttribute('data-message') || defaults[key] || defaults.tour;
      link.setAttribute('href', buildWaUrl(msg));
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
      link.addEventListener('click', function () {
        pushEvent('clic_demo_whatsapp', {
          cta_text: (link.textContent || '').trim().replace(/\s+/g, ' '),
          message_preset: msg,
          destination: 'whatsapp'
        });
      }, { passive: true });
    });
  }

  function wireTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      var buttons = group.querySelectorAll('[role="tab"]');
      var panels = group.querySelectorAll('[role="tabpanel"]');
      buttons.forEach(function (button) {
        button.addEventListener('click', function () {
          var target = button.getAttribute('aria-controls');
          buttons.forEach(function (btn) { btn.setAttribute('aria-selected', String(btn === button)); });
          panels.forEach(function (panel) { panel.classList.toggle('is-active', panel.id === target); });
          pushEvent('select_demo_tab', {
            tab_id: target || '',
            tab_text: (button.textContent || '').trim()
          });
        });
      });
    });
  }

  function wireBookingForm() {
    var form = document.querySelector('[data-booking-form]');
    if (!form) return;
    var status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = String(data.get('name') || '').trim();
      var phone = String(data.get('phone') || '').trim();
      var interest = String(data.get('interest') || '').trim();
      var date = String(data.get('date') || '').trim();
      if (name.length < 2 || phone.length < 7 || interest.length < 2) {
        if (status) status.textContent = 'Completa nombre, WhatsApp e interes para abrir el mensaje listo.';
        return;
      }
      var pageTitle = document.querySelector('h1');
      var message = 'Hola, soy ' + name + '. Vi la demo "' + (pageTitle ? pageTitle.textContent.trim() : 'Dos Nodos') + '". Mi WhatsApp es ' + phone + '. Me interesa: ' + interest + (date ? '. Fecha ideal: ' + date : '') + '.';
      if (status) status.textContent = 'Abriendo WhatsApp con el mensaje listo.';
      pushEvent('submit_demo_booking', {
        lead_interest: interest,
        has_date: String(Boolean(date)),
        destination: 'whatsapp'
      });
      window.open(buildWaUrl(message), '_blank', 'noopener');
    });
  }

  function init() {
    wireWhatsAppLinks();
    wireTabs();
    wireBookingForm();
    pushEvent('view_demo_page', {
      page_title: document.title,
      page_path: window.location.pathname
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
