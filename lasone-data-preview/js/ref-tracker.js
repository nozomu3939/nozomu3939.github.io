/* ラスワンデータ 紹介元トラッカー
 * 役割:
 *   1) URLの ?ref=xxx を90日間保存(localStorage + Cookie)し、URLバーからは消して見た目をキレイに保つ
 *   2) お問い合わせフォームに hidden項目「紹介元」を自動付与 → 通知メールに紹介元が載る
 *   3) アプリ(scraping-saas)への導線に ?ref=xxx を付与(将来の成約計測の布石)
 * 紹介経由でない通常訪問では一切なにもしない。
 */
(function () {
  "use strict";

  var KEY = "lasone_ref";
  var DAYS = 90;
  var FIELD = "紹介元"; // 問い合わせメールに表示されるラベル
  // 紹介元コード → 問い合わせメールに表示する名称(新パートナー追加時はここに1行足す)
  var NAMES = { ftj: "株式会社FTJ" };

  function normalize(v) {
    return v ? String(v).trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40) : "";
  }

  function store(ref) {
    var exp = Date.now() + DAYS * 86400000;
    try { localStorage.setItem(KEY, JSON.stringify({ ref: ref, exp: exp })); } catch (e) {}
    document.cookie = KEY + "=" + encodeURIComponent(ref) +
      "; max-age=" + (DAYS * 86400) + "; path=/; SameSite=Lax";
  }

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && o.ref && o.exp && Date.now() < o.exp) { return normalize(o.ref); }
      }
    } catch (e) {}
    // Cookieの値が不正な%エンコードでも例外で全体が止まらないよう保護
    try {
      var m = document.cookie.match(/(?:^|;\s*)lasone_ref=([^;]+)/);
      return m ? normalize(decodeURIComponent(m[1])) : "";
    } catch (e) { return ""; }
  }

  // 1) URLに ?ref= があれば保存し、URLバーから消す
  var urlRef = "";
  try {
    var params = new URLSearchParams(window.location.search);
    urlRef = normalize(params.get("ref"));
    if (urlRef) {
      store(urlRef);
      params.delete("ref");
      var qs = params.toString();
      var clean = window.location.pathname + (qs ? "?" + qs : "") + window.location.hash;
      try { window.history.replaceState(null, "", clean); } catch (e) {}
    }
  } catch (e) {}

  var ref = urlRef || read();
  if (!ref) { return; } // 紹介経由でなければ終了

  function apply() {
    // 2) 問い合わせフォームに紹介元を hidden で付与
    var form = document.querySelector("#contact-form");
    if (form && !form.querySelector('input[data-ref-field="1"]')) {
      var h = document.createElement("input");
      h.type = "hidden";
      h.name = FIELD;
      // 属性(value=)で設定する: プロパティだけだと送信成功後の form.reset() で
      // 空文字に戻り、同一ページ2回目の送信で紹介元が消えるバグになる
      h.setAttribute("value", NAMES[ref] || ref); // 対応名があれば会社名で、無ければコードのまま
      h.setAttribute("data-ref-field", "1");
      form.appendChild(h);
    }
    // 3) アプリ導線に ?ref= を付与
    var links = document.querySelectorAll('a[href*="scraping-saas.pages.dev"]');
    Array.prototype.forEach.call(links, function (a) {
      try {
        var u = new URL(a.href, window.location.origin);
        u.searchParams.set("ref", ref);
        a.setAttribute("href", u.toString());
      } catch (e) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }

  // 保険: 送信の直前に毎回値を復元する(capture段階なので main.js の送信処理より先に走る)
  document.addEventListener("submit", function (ev) {
    var t = ev.target;
    if (t && t.id === "contact-form") {
      var f = t.querySelector('input[data-ref-field="1"]');
      if (f && !f.value) { f.value = NAMES[ref] || ref; }
    }
  }, true);
})();
