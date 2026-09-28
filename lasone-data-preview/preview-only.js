document.addEventListener('submit', function(event) {
  event.preventDefault(); event.stopImmediatePropagation();
  alert('社内確認用プレビューです。フォームは送信されません。');
}, true);
