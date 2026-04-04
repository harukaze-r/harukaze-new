/* ============================================================
   HARUKAZE common.js
   ハンバーガーメニュー + フローティングLINEボタン 共通スクリプト
   ============================================================ */

(function () {
  'use strict';

  /* ── ハンバーガーメニュー（DOMContentLoaded内で一本化） ── */
  // ※ 即時実行とDOMContentLoadedの二重バインドを防ぐため、ここでは何もしない

  /* ── フローティングボタン 注入（共通HTML） ── */
  function injectFloatingButtons() {
    // LINE フローティングボタン（右下）
    if (!document.querySelector('.float-line-btn')) {
      const lineBtn = document.createElement('a');
      lineBtn.href = 'https://lin.ee/VsG7xJk';
      lineBtn.target = '_blank';
      lineBtn.rel = 'noopener noreferrer';
      lineBtn.className = 'float-line-btn';
      lineBtn.textContent = 'LINEで相談する';
      document.body.appendChild(lineBtn);
    }

    // サイドフローティングボタン（右端）
    if (!document.querySelector('.float-side-btns')) {
      const sideBtns = document.createElement('div');
      sideBtns.className = 'float-side-btns';
      sideBtns.innerHTML = `
        <a href="https://lin.ee/VsG7xJk" target="_blank" rel="noopener noreferrer" class="float-side-btn">面談を予約する</a>
        <a href="https://lin.ee/VsG7xJk" target="_blank" rel="noopener noreferrer" class="float-side-btn">LINEで婚活突破口診断</a>
      `;
      document.body.appendChild(sideBtns);
    }
  }

  /* ── 共通ナビ・フッター 注入 ── */
  function injectNav() {
    if (document.querySelector('.site-nav')) return; // 既にあればスキップ

    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
      <a href="index.html" class="nav-logo">
        <span class="nav-logo-sub">IBJ正規加盟店</span>
        <span class="nav-logo-main">結婚相談所ハルカゼ</span>
        <span class="nav-logo-target">20・30代男性向け結婚相談所</span>
      </a>
      <ul class="nav-links">
        <li><a href="about.html">メッセージ</a></li>
        <li><a href="service.html">サービス・価格</a></li>
        <li><a href="flow.html">成婚までの流れ</a></li>
        <li><a href="lab.html">ハルカゼLAB</a></li>
        <li><a href="girls.html">婚活女子のGirls LAB</a></li>
        <li><a href="faq.html">よくある質問</a></li>
        <li><a href="blog.html">ブログ</a></li>
        <li><a href="https://lin.ee/VsG7xJk" target="_blank" rel="noopener noreferrer" class="nav-cta">LINEで相談</a></li>
      </ul>
      <button class="hamburger-btn" id="hamburgerBtn" aria-label="メニューを開く">
        <span></span><span></span><span></span>
      </button>
    `;

    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.id = 'mobileNavOverlay';
    overlay.innerHTML = `
      <button class="mobile-nav-close" id="mobileNavClose" aria-label="メニューを閉じる"><span></span><span></span></button>
      <a href="/">ホーム</a>
      <a href="about.html">メッセージ</a>
      <a href="service.html">サービス・価格</a>
      <a href="flow.html">成婚までの流れ</a>
      <a href="lab.html">ハルカゼLAB</a>
      <a href="girls.html">婚活女子のGirls LAB</a>
      <a href="faq.html">よくある質問</a>
      <a href="blog.html">ブログ</a>
      <a href="https://lin.ee/VsG7xJk" target="_blank" rel="noopener noreferrer" class="nav-cta btn">LINEで相談</a>
    `;

    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(nav, document.body.firstChild);

    // ハンバーガーイベントを再バインド
    const btn = document.getElementById('hamburgerBtn');
    const ovl = document.getElementById('mobileNavOverlay');
    if (btn && ovl) {
      btn.addEventListener('click', function () {
        const isOpen = ovl.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
      ovl.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          ovl.classList.remove('open');
          btn.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  }

  function injectFooter() {
    if (document.querySelector('.site-footer')) return;

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-inner">
        <p class="footer-brand">大阪・吹田結婚相談所 ハルカゼ</p>
        <nav class="footer-links">
          <a href="about.html">メッセージ</a>
          <a href="about.html#vision">ハルカゼの想い（VISION）</a>
          <a href="lab.html">ハルカゼLAB</a>
          <a href="girls.html">婚活女子のGirls LAB</a>
          <a href="service.html">サービス内容</a>
          <a href="service.html#price">サービス・料金</a>
          <a href="flow.html">ご成婚までの流れ</a>
          <a href="faq.html">よくある質問</a>
          <a href="blog.html">ブログ</a>
          <a href="privacy.html">プライバシーポリシー</a>
        </nav>
        <a href="https://lin.ee/VsG7xJk" target="_blank" rel="noopener noreferrer" class="footer-line-btn">LINEで無料相談する</a>
        <p class="footer-copy">© 2025 結婚相談所ハルカゼ</p>
      </div>
    `;
    document.body.appendChild(footer);
  }

  /* harukaze-mod: 修正3 フローティングボタン スクロール表示 */
  function initFloatSideScroll() {
    var sideBtns = document.querySelector('.float-side-btns');
    if (!sideBtns) return;

    var hero = document.querySelector('.hero');
    var threshold = hero ? hero.offsetHeight : window.innerHeight;

    function onScroll() {
      if (window.scrollY > threshold) {
        sideBtns.classList.add('is-visible');
      } else {
        sideBtns.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // 初期チェック
  }

  /* ── DOMContentLoaded で全部実行 ── */
  document.addEventListener('DOMContentLoaded', function () {
    // ナビ・フッターはHTMLに直書きしているページもあるため、
    // data-inject="true" 属性があるページのみ動的注入する
    if (document.body.dataset.inject === 'true') {
      injectNav();
      injectFooter();
    }

    // ハンバーガー（HTMLに直書きされている場合のバインド）
    const btn = document.getElementById('hamburgerBtn');
    const ovl = document.getElementById('mobileNavOverlay');

    function closeNav() {
      ovl.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (btn && ovl && !btn._bound) {
      btn._bound = true;
      btn.addEventListener('click', function () {
        const isOpen = ovl.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
      ovl.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeNav);
      });
      // 閉じるボタン
      const closeBtn = document.getElementById('mobileNavClose');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
      }
    }

    injectFloatingButtons();
    initFloatSideScroll(); /* harukaze-mod: 修正3 */
  });

})();
