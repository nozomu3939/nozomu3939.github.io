(function () {
  'use strict';
  var params = new URLSearchParams(location.search);
  var select = document.querySelector('#type');
  var types = {custom:'個別リスト作成の相談', consulting:'AI × 営業の個別相談', telemo:'TELEMOの相談', monthly:'無料相談', 'one-time':'資料請求(買い切り120万件リスト)'};
  if (select && types[params.get('inquiry')]) select.value = types[params.get('inquiry')];
  var form = document.querySelector('#contact-form');
  if (form) {
    var topic = (params.get('topic') || '').slice(0, 160);
    var message = form.querySelector('[name="message"]');
    if (topic && message && !message.value) message.value = '「' + topic + '」について相談したいです。\n\n';
    if (topic) {
      var source = document.createElement('input');
      source.type = 'hidden'; source.name = '相談元の記事・ページ'; source.value = topic; form.appendChild(source);
    }
  }
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link || !link.getAttribute('href').includes('#contact-form') || !window.gtag) return;
    // Record the page path, never contact details or freeform message text.
    window.gtag('event', 'consultation_click', {page_path: location.pathname});
  });
})();
