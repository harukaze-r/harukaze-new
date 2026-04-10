/* ============================================================
   HARUKAZE common.js — 2026 redesign
   ハンバーガーメニュー + フローティングボタン表示制御
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── ハンバーガーメニュー ── */
    var btn = document.getElementById('hamburgerBtn');
    var ovl = document.getElementById('mobileNavOverlay');
    var closeBtn = document.getElementById('mobileNavClose');

    function openNav() {
      ovl.classList.add('open');
      btn.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('nav-open');
    }
    function closeNav() {
      ovl.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
      document.body.classList.remove('nav-open');
    }

    if (btn && ovl) {
      btn.addEventListener('click', function () {
        ovl.classList.contains('open') ? closeNav() : openNav();
      });
      if (closeBtn) closeBtn.addEventListener('click', closeNav);
      ovl.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeNav);
      });
    }

    /* ── フローティングサイドボタン スクロール表示（PC） ── */
    var sideBtns = document.querySelector('.float-side-btns');
    if (sideBtns) {
      var hero = document.querySelector('.hero, .page-hero');
      var threshold = hero ? hero.offsetHeight : window.innerHeight * 0.6;

      function onScroll() {
        sideBtns.classList.toggle('is-visible', window.scrollY > threshold);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ── スクロールアニメーション（.step-animate） ── */
    var animItems = document.querySelectorAll('.step-animate');
    if (animItems.length > 0 && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
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

  });
})();
