import I18n from './i18n.js';
import Animations from './animations.js';

const App = (() => {
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page === '' ? 'index' : page;
  }

  function renderHeader(currentPage) {
    const header = document.getElementById('site-header');
    if (!header) return;

    const navItems = [
      { slug: 'index', key: 'nav.home', href: '/index.html' },
      { slug: 'schedule', key: 'nav.schedule', href: '/schedule.html' },
      { slug: 'rsvp', key: 'nav.rsvp', href: '/rsvp.html' },
      { slug: 'faq', key: 'nav.faq', href: '/faq.html' },
      { slug: 'travel', key: 'nav.travel', href: '/travel.html' },
      { slug: 'contact', key: 'nav.contact', href: '/contact.html' }
    ];

    const navLinksHTML = navItems.map(item => {
      const isActive = item.slug === currentPage ? 'is-active' : '';
      return `<li><a href="${item.href}" class="nav-link ${isActive}" data-i18n="${item.key}"></a></li>`;
    }).join('');

    header.innerHTML = `
      <div class="header-inner">
        <a href="/index.html" class="site-logo">O & I</a>
        
        <button class="menu-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav class="main-nav">
          <ul class="nav-list">
            ${navLinksHTML}
          </ul>
          
          <div class="lang-toggle">
            <button data-lang="en">EN</button>
            <span>|</span>
            <button data-lang="uk">UA</button>
          </div>
        </nav>
      </div>
    `;

    initMobileNav();
    initLangToggle();
  }

  function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="container">
        <div class="footer-logo">Oleh & Inna</div>
        <p class="footer-text">May 24–26, 2026 • Budva, Montenegro</p>
      </div>
    `;
  }

  function renderEnvelope() {
    const existingEnvelope = document.getElementById('envelope-overlay');
    if (existingEnvelope) return;

    const overlay = document.createElement('div');
    overlay.id = 'envelope-overlay';
    overlay.className = 'envelope-overlay';
    overlay.innerHTML = `
      <!-- Decorative elements -->
      <span class="envelope-decor envelope-decor-1">✿</span>
      <span class="envelope-decor envelope-decor-2">❀</span>
      <span class="envelope-decor envelope-decor-3">✾</span>
      
      <div class="envelope-scene">
        <div class="envelope-container" id="envelope">
          <!-- Envelope body -->
          <div class="envelope-body"></div>
          
          <!-- Card inside (language selection) -->
          <div class="envelope-card" id="envelope-card">
            <h2 class="envelope-card-title">Oleh & Inna</h2>
            <div class="envelope-card-divider"></div>
            <div class="envelope-lang-buttons">
              <button class="envelope-lang-btn" data-lang="en">🇬🇧 EN</button>
              <button class="envelope-lang-btn" data-lang="uk">🇺🇦 UA</button>
            </div>
          </div>
          
          <!-- Envelope flap -->
          <div class="envelope-flap" id="envelope-flap">
            <div class="envelope-flap-front"></div>
          </div>
          
          <!-- Wax seal -->
          <div class="envelope-seal" id="envelope-seal">
            <div class="envelope-seal-circle">O&I</div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    initEnvelopeInteraction();
  }

  function initEnvelopeInteraction() {
    let isAnimating = false;

    document.querySelectorAll('.envelope-lang-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        if (isAnimating) return;
        isAnimating = true;

        const lang = btn.dataset.lang;
        await I18n.setLang(lang);
        
        Animations.animateEnvelopeOpenAndDismiss(() => {
          Animations.init();
        });
      });
    });
  }

  function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-open');
      mainNav.classList.toggle('is-open');
    });

    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-open');
        mainNav.classList.remove('is-open');
      });
    });
  }

  function initLangToggle() {
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.addEventListener('click', async () => {
        const lang = btn.dataset.lang;
        await I18n.setLang(lang);
      });
    });
  }

  function initFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const isOpen = item.classList.contains('is-open');
        
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('is-open');
        });
        
        if (!isOpen) {
          item.classList.add('is-open');
        }
      });
    });
  }

  async function init() {
    const currentPage = getCurrentPage();
    
    renderHeader(currentPage);
    renderFooter();
    renderEnvelope();

    await I18n.preloadDictionaries();

    const savedLang = I18n.getSavedLang();
    if (savedLang) {
      await I18n.setLang(savedLang);
    }

    Animations.animateEnvelopeEntrance();

    initFaqAccordion();

    const currentLang = I18n.getCurrentLang();
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
