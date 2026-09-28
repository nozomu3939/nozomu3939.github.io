(function () {
  'use strict';
  var nav = document.querySelector('.gnav');
  if (!nav) return;
  var submenuButtons = nav.querySelectorAll('.nav-subtoggle');
  function closeSubmenus(except) {
    submenuButtons.forEach(function (button) {
      if (button === except) return;
      button.setAttribute('aria-expanded', 'false');
      document.getElementById(button.getAttribute('aria-controls')).classList.remove('open');
    });
  }
  submenuButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') !== 'true';
      closeSubmenus(button);
      button.setAttribute('aria-expanded', String(open));
      document.getElementById(button.getAttribute('aria-controls')).classList.toggle('open', open);
    });
  });
  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target)) closeSubmenus();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      var group = document.activeElement.closest('.nav-group');
      closeSubmenus();
      if (group && window.matchMedia('(min-width:1180px)').matches) group.querySelector('.nav-subtoggle').focus();
    }
  });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeSubmenus();
  });
  var screen = window.matchMedia('(min-width:1180px)');
  screen.addEventListener('change', function () {
    nav.classList.remove('open'); closeSubmenus();
    var toggle = document.querySelector('.nav-toggle');
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'メニューを開く'); }
  });
  var current = location.pathname.replace(/index\.html$/, '');
  nav.querySelectorAll('a').forEach(function (link) {
    if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'page');
  });
  var search = document.querySelector('#article-query');
  if (search) {
    var category = 'all';
    var cards = document.querySelectorAll('.article-card');
    function filterArticles() {
      var query = search.value.trim().toLocaleLowerCase('ja');
      var count = 0;
      cards.forEach(function (card) {
        var visible = (category === 'all' || card.dataset.category === category) && card.dataset.search.toLocaleLowerCase('ja').includes(query);
        card.hidden = !visible;
        if (visible) count++;
      });
      document.querySelector('#article-count').textContent = count + '本の記事';
      document.querySelector('#article-empty').hidden = count !== 0;
    }
    search.addEventListener('input', filterArticles);
    document.querySelectorAll('[data-filter]').forEach(function (button) {
      button.addEventListener('click', function () {
        category = button.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach(function (other) { other.setAttribute('aria-pressed', String(other === button)); });
        filterArticles();
      });
    });
  }
})();
