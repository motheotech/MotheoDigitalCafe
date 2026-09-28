(function () {
  var b = document.getElementById('burger'), m = document.getElementById('menu');
  if (b && m) {
    b.addEventListener('click', function () {
      var open = m.classList.toggle('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  var els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (e) { io.observe(e); });
})();

/* Booking form: sends through WhatsApp or email, no server needed */
(function () {
  var f = document.getElementById('book-form');
  if (!f) return;
  var WA = '27638763337', MAIL = 'naledi@motheodigitalcafe.co.za';
  function text() {
    var v = function (id) { return (document.getElementById(id).value || '').trim(); };
    return 'Hi Motheo Digital Cafe, I would like to book a job.\n\n' +
      'Name: ' + v('n') + '\nNumber: ' + v('p') + '\nService: ' + v('s') +
      '\n\n' + v('m');
  }
  function ok() {
    if (f.checkValidity()) return true;
    f.reportValidity(); return false;
  }
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!ok()) return;
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(text()), '_blank', 'noopener');
  });
  var em = document.getElementById('book-email');
  if (em) em.addEventListener('click', function () {
    if (!ok()) return;
    window.location.href = 'mailto:' + MAIL + '?subject=' +
      encodeURIComponent('Job request from ' + document.getElementById('n').value.trim()) +
      '&body=' + encodeURIComponent(text());
  });
})();

