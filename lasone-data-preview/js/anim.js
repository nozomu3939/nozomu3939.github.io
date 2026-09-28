/* Lasone Data — 動的演出レイヤー(GSAP + ScrollTrigger / 軽量版)
   方針: 上質×テック。演出は「効果が大きい場所」に絞り、監視・レイヤー数を最小化して60fpsを維持する。
   コンテンツは既定で表示済み。GSAPが読めて reduced-motion でない時だけ演出モードに切り替える。 */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return; // 演出なし=静的表示のまま

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);

  // ここで初めて .fade-up の初期非表示が有効になる(チラ見え防止)
  document.documentElement.classList.add("anim-ready");

  var EASE = "power3.out";

  /* ---- 汎用: .fade-up をバッチで入場(監視は1つに集約・軽い) ---- */
  window.ScrollTrigger.batch(".fade-up", {
    start: "top 88%",
    once: true,
    onEnter: function (batch) {
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.08, overwrite: true, clearProps: "willChange" });
    }
  });
  // 初期表示時点で画面内にある要素は即表示(リロード位置が下部でも消えない保険)
  window.addEventListener("load", function () {
    window.ScrollTrigger.refresh();
    document.querySelectorAll(".fade-up").forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: EASE, overwrite: "auto" });
      }
    });
  });

  /* ---- ヒーロー: 1本のタイムラインのみ(初回ロード時) ---- */
  var tl = gsap.timeline({ defaults: { ease: EASE } });
  if (document.querySelector(".hero h1")) {
    tl.from(".hero h1", { opacity: 0, y: 24, duration: 0.8 }, 0.05)
      .from(".hero .lead", { opacity: 0, y: 18, duration: 0.8 }, 0.18)
      .from(".hero-cta .btn", { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 }, 0.3)
      .from(".hero-point", { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 }, 0.42)
      .from(".creator-chip", { opacity: 0, y: 14, duration: 0.6 }, 0.7);
    if (document.querySelector(".hero-visual .browser-frame")) {
      tl.from(".hero-visual .browser-frame", { opacity: 0, y: 50, scale: 0.97, duration: 1 }, 0.15);
    }
  }

  /* ---- 数値カウントアップ(対象は数個だけなので軽い) ---- */
  function countUp(el) {
    var node = el.firstChild;
    if (!node || node.nodeType !== 3) return;
    var raw = node.textContent.trim();
    var m = raw.match(/^([0-9][0-9,]*(?:\.[0-9]+)?)/);
    if (!m) return;
    var hasComma = m[1].indexOf(",") >= 0;
    var target = parseFloat(m[1].replace(/,/g, ""));
    var decimals = (m[1].split(".")[1] || "").length;
    var suffix = raw.slice(m[1].length);
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.3, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: function () {
        var val = obj.v.toFixed(decimals);
        if (hasComma) val = Number(val).toLocaleString("en-US");
        node.textContent = val + suffix;
      }
    });
  }
  Array.prototype.forEach.call(
    document.querySelectorAll(".stat .value, .mstats-bar .count .v"), countUp
  );

  /* ---- 創業者バンド: 実績ピルの積み上がり(監視1つ) ---- */
  var creds = document.querySelectorAll(".founder-band .fb-cred");
  if (creds.length) {
    gsap.from(creds, {
      opacity: 0, y: 16, duration: 0.5, ease: "back.out(1.4)", stagger: 0.1,
      scrollTrigger: { trigger: ".founder-band", start: "top 70%", once: true }
    });
  }

  /* ---- 料金: 巨大数字のスケールイン(監視1つ) ---- */
  var prices = document.querySelectorAll(".pr2-price");
  if (prices.length) {
    gsap.from(prices, {
      opacity: 0, scale: 0.85, y: 16, duration: 0.9, ease: "back.out(1.3)", stagger: 0.12,
      scrollTrigger: { trigger: ".pr2-grid", start: "top 72%", once: true }
    });
  }

  /* ---- 対応媒体のガラスチップ: 入場のみGSAP・浮遊はCSSに任せる(監視1つ) ---- */
  var glassChips = document.querySelectorAll(".glass-chip");
  if (glassChips.length) {
    gsap.from(glassChips, {
      opacity: 0, y: 24, scale: 0.88, duration: 0.7, ease: "back.out(1.4)", stagger: 0.08,
      scrollTrigger: { trigger: ".mp2-hero", start: "top 72%", once: true }
    });
  }
})();
