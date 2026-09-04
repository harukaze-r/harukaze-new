/* ============================================================
   HARUKAZE common.js — 2026 redesign
   ハンバーガーメニュー + フローティングボタン表示制御
   ============================================================ */
(function () {
  'use strict';

  /* ── フローティングボタン スクロール表示（PC側/SP側） ── */
    var sideBtns = document.querySelector('.float-side-btns');
    var lineBtn = document.querySelector('.float-line-btn');
    if (sideBtns || lineBtn) {
      var hero = document.querySelector('.hero, .page-hero, .m-hero');
      var threshold = hero ? hero.offsetHeight : window.innerHeight * 0.6;

      function onScroll() {
        var pastHero = window.scrollY > threshold;
        if (sideBtns) sideBtns.classList.toggle('is-visible', pastHero);
        if (lineBtn) lineBtn.classList.toggle('is-visible', pastHero);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ── スクロールアニメーション（.step-animate / .fade-up） ── */
    var animItems = document.querySelectorAll('.step-animate, .fade-up');
    if (animItems.length > 0 && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08 });
      animItems.forEach(function (el) { io.observe(el); });
    }

    /* ── アコーディオン（.step-card-header） ── */
    document.querySelectorAll('.step-card-header').forEach(function (header) {
      header.addEventListener('click', function () {
        var card = header.closest('.step-card');
        if (!card) return;
        var isOpen = card.classList.toggle('is-open');
        header.setAttribute('aria-expanded', isOpen);
      });
      header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); header.click(); }
      });
    });

    /* ── FAQアコーディオン ── */
    document.querySelectorAll('.faq-question').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.faq-item');
        if (!item) return;
        var wasOpen = item.classList.contains('open');
        // 同カテゴリ内の他を閉じる
        var cat = item.closest('.faq-category');
        if (cat) {
          cat.querySelectorAll('.faq-item.open').forEach(function (el) {
            el.classList.remove('open');
          });
        }
        if (!wasOpen) item.classList.add('open');
      });
    });

    /* ── FAQ タブ切り替え ── */
    document.querySelectorAll('.faq-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.target;
        document.querySelectorAll('.faq-tab').forEach(function (t) { t.classList.remove('active'); });
        document.querySelectorAll('.faq-category').forEach(function (c) { c.classList.remove('active'); });
        tab.classList.add('active');
        var cat = document.getElementById(target);
        if (cat) cat.classList.add('active');
      });
    });

})();
