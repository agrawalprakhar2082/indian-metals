(function () {
  var toggle = document.querySelector('.nav-toggle'), nav = document.getElementById('site-nav');
  if (toggle && nav) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Product search and active group highlighting (products page)
  var search = document.getElementById('product-search');
  if (search) {
    var blocks = Array.prototype.slice.call(document.querySelectorAll('[data-division]'));
    var empty = document.getElementById('no-results');
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase(), any = false;
      blocks.forEach(function (b) {
        var shown = 0;
        b.querySelectorAll('[data-product]').forEach(function (p) {
          var hit = !q || p.getAttribute('data-product').indexOf(q) > -1;
          p.hidden = !hit; if (hit) shown++;
        });
        b.hidden = shown === 0; if (shown) any = true;
      });
      empty.hidden = any;
    });
    var links = document.querySelectorAll('.cat-nav a[data-target]');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-target') === e.target.id); });
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      blocks.forEach(function (b) { io.observe(b); });
    }
  }

  // Enquiry form: prefill product from link, send via WhatsApp
  var form = document.getElementById('enquiry');
  if (form) {
    try {
      var p = new URLSearchParams(location.search).get('product');
      if (p) {
        form.product.value = p;
        if (form.product.value !== p) { form.product.value = 'Other / made to drawing'; form.message.value = 'Product: ' + p + '\n'; }
      }
    } catch (e) {}
    var status = document.getElementById('form-status');
    function message() {
      if (!form.name.value.trim() || !form.phone.value.trim()) { status.textContent = 'Please add your name and phone number.'; return null; }
      var f = new FormData(form);
      return 'Enquiry for Indian Metals & Alloys\n\nName: ' + f.get('name') + '\nCompany: ' + f.get('company') + '\nPhone: ' + f.get('phone') + '\nEmail: ' + f.get('email') + '\nProduct: ' + f.get('product') + '\nQuantity: ' + f.get('quantity') + '\n\n' + f.get('message');
    }
    form.querySelector('[data-send="email"]').addEventListener('click', function () {
      var text = message(); if (!text) return;
      location.href = 'mailto:' + form.getAttribute('data-email') + '?subject=' + encodeURIComponent('Enquiry: ' + (form.product.value || 'Copper products')) + '&body=' + encodeURIComponent(text);
      status.textContent = 'Your email app has opened with the enquiry. Press send to reach our sales team.';
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = message(); if (!text) return;
      window.open('https://wa.me/' + form.getAttribute('data-whatsapp') + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      status.textContent = 'WhatsApp has opened with your enquiry. Press send to reach our sales team.';
    });
  }
})();
