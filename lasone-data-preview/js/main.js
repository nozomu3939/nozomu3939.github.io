// Lasone Data — 共通スクリプト
(function () {
  "use strict";

  // モバイルナビ
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".gnav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-label", nav.classList.contains("open") ? "メニューを閉じる" : "メニューを開く");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    });
    document.addEventListener("keydown", function(e) { if(e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "メニューを開く"); toggle.focus(); } });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "メニューを開く"); }
    });
  }

  // 現在ページのナビをハイライト
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".gnav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });

  // FAQ アコーディオン
  document.querySelectorAll(".faq-item").forEach(function (item, index) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    if (!a.id) a.id = "faq-answer-" + (index + 1);
    q.setAttribute("aria-controls", a.id);
    function setOpen(open) {
      item.classList.toggle("open", open);
      // Native hiding removes collapsed links from both Tab order and the
      // accessibility tree. Open answers keep their natural, responsive height.
      a.hidden = !open;
      q.setAttribute("aria-expanded", open ? "true" : "false");
    }
    setOpen(item.classList.contains("open"));
    q.addEventListener("click", function () {
      setOpen(!item.classList.contains("open"));
    });
  });

  // スクロール演出は js/anim.js (GSAP) が担当。
  // GSAP未ロード/reduced-motion時は .fade-up が既定で表示されるため、ここでは何もしない。

  // お問い合わせフォーム（既存の Web3Forms / EmailJS 連携）
  var form = document.querySelector("#contact-form");
  if (form) {
    if (window.emailjs) { emailjs.init({ publicKey: "4bKvisaZRTO_U-evI" }); }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) { status.classList.remove("error"); status.textContent = "送信しています…"; }
      var btn = form.querySelector("button[type=submit]");
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "送信中..."; }

      var fields = {};
      new FormData(form).forEach(function (v, k) { fields[k] = v; });

      var payload = {
        access_key: "337c99dd-8454-485a-bb60-3b7a425fb42d",
        subject: "【Lasone Data】お問い合わせがありました",
        from_name: "Lasone Data お問い合わせ"
      };
      Object.keys(fields).forEach(function (k) { payload[k] = fields[k]; });

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json && json.success) {
            if (btn) { btn.textContent = "送信しました。担当者より1営業日以内にご連絡します"; }
            // 送信者本人への自動返信(EmailJS)。失敗しても通知は完了しているので致命的でない
            if (window.emailjs && fields.email) {
              emailjs.send("service_lasonedata", "template_os8bzxl", fields).catch(function () {});
            }
            if (status) status.textContent = "お問い合わせを受け付けました。担当者よりご連絡いたします。";
            if (window.gtag) window.gtag("event", "generate_lead", {page_path: location.pathname});
            form.reset();
          } else {
            throw new Error((json && json.message) || "send failed");
          }
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
          if (status) { status.classList.add("error"); status.textContent = "送信できませんでした。入力内容は残っています。再度お試しいただくか、nozomu.shimizu@zettai.co.jp へご連絡ください。"; } else { alert("送信できませんでした。再度お試しください。"); }
        });
    });
  }
})();
