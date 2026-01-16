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

    const isHomePage = currentPage === 'index' || currentPage === '';
    
    const navItems = isHomePage ? [
      { key: 'nav.home', href: '#home' },
      { key: 'nav.schedule', href: '#schedule' },
      { key: 'nav.rsvp', href: '#rsvp' },
      { key: 'nav.faq', href: '#faq' },
      { key: 'nav.travel', href: '/travel.html' },
      { key: 'nav.contact', href: '#contact' }
    ] : [
      { key: 'nav.home', href: '/index.html#home' },
      { key: 'nav.schedule', href: '/index.html#schedule' },
      { key: 'nav.rsvp', href: '/index.html#rsvp' },
      { key: 'nav.faq', href: '/index.html#faq' },
      { key: 'nav.travel', href: '/travel.html' },
      { key: 'nav.contact', href: '/index.html#contact' }
    ];

    const navLinksHTML = navItems.map(item => {
      return `<li><a href="${item.href}" class="nav-link" data-i18n="${item.key}"></a></li>`;
    }).join('');

    header.innerHTML = `
      <div class="header-inner">
        <a href="${isHomePage ? '#home' : '/index.html'}" class="site-logo">O & I</a>
        
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
      <!-- Header -->
      <div class="envelope-header">
        <h1 class="envelope-header-title">Oleh & Inna</h1>
        <p class="envelope-header-date">May 24 – May 26, 2026</p>
        <p class="envelope-header-location">Budva, Montenegro</p>
      </div>
      
      <!-- Decorative elements -->
      <span class="envelope-decor envelope-decor-1">✿</span>
      <span class="envelope-decor envelope-decor-2">❀</span>
      <span class="envelope-decor envelope-decor-3">✾</span>
      
      <div class="envelope-scene">
        <!-- The envelope itself -->
        <div class="envelope-container" id="envelope">
          <!-- Envelope body (burgundy background) -->
          <div class="envelope-body"></div>
          
          <!-- Inner card visible inside envelope -->
          <div class="envelope-inner-card" id="invitation-card">
            <h2 class="invitation-card-title" id="invitation-card-title">You're Invited</h2>
            <div class="invitation-card-divider"></div>
            <p class="invitation-card-names">Oleh & Inna</p>
          </div>
          
          <!-- Left flap (side fold) -->
          <div class="envelope-flap-left"></div>
          
          <!-- Right flap (side fold) -->
          <div class="envelope-flap-right"></div>
          
          <!-- Bottom flap (bottom fold) -->
          <div class="envelope-flap-bottom"></div>
          
          <!-- Language buttons on envelope body -->
          <div class="envelope-lang-buttons">
            <button class="envelope-lang-btn" data-lang="en">🇬🇧 EN</button>
            <button class="envelope-lang-btn" data-lang="uk">🇺🇦 UA</button>
          </div>
          
          <!-- Top flap (opens when clicked) -->
          <div class="envelope-flap" id="envelope-flap">
            <div class="envelope-flap-front"></div>
            <div class="envelope-flap-back"></div>
          </div>
          
          <!-- Wax seal -->
          <div class="envelope-seal" id="envelope-seal">
            <div class="envelope-seal-circle">O&I</div>
          </div>
        </div>
      </div>
      
      <!-- Language hint -->
      <div class="envelope-hint">
        <span class="envelope-hint-text" id="envelope-hint-text">Choose your language</span>
        <div class="envelope-hint-arrows">
          <span class="envelope-hint-arrow"></span>
          <span class="envelope-hint-arrow"></span>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    initEnvelopeInteraction();
  }

  function initEnvelopeInteraction() {
    let isAnimating = false;

    const invitationTexts = {
      en: "You're Invited",
      uk: "Вас Запрошено"
    };

    document.querySelectorAll('.envelope-lang-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        if (isAnimating) return;
        isAnimating = true;

        const lang = btn.dataset.lang;
        
        const cardTitle = document.getElementById('invitation-card-title');
        if (cardTitle) {
          cardTitle.textContent = invitationTexts[lang] || invitationTexts.en;
        }
        
        await I18n.setLang(lang);
        
        Animations.animateEnvelopeOpenAndDismiss(() => {
          const scrollContainer = document.getElementById('scroll-container');
          if (scrollContainer) {
            scrollContainer.scrollTo({ top: 0, behavior: 'instant' });
          }
          Animations.init();
          Animations.initFullPageScroll();
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
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);
          const scrollContainer = document.getElementById('scroll-container');
          
          if (targetSection && scrollContainer) {
            const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            scrollContainer.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
        
        menuToggle.classList.remove('is-open');
        mainNav.classList.remove('is-open');
      });
    });
  }

  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollContainer = document.getElementById('scroll-container');
    
    if (sections.length === 0 || !scrollContainer) return;

    const updateActiveLink = () => {
      const scrollPosition = scrollContainer.scrollTop + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          navLinks.forEach(link => {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('is-active');
            }
          });
        }
      });
    };

    scrollContainer.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  function initCountdown() {
    const weddingDate = new Date('2026-05-25T00:00:00');
    
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
      const now = new Date();
      const diff = weddingDate - now;
      
      if (diff <= 0) {
        daysEl.textContent = '0';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      daysEl.textContent = days;
      hoursEl.textContent = hours.toString().padStart(2, '0');
      minutesEl.textContent = minutes.toString().padStart(2, '0');
      secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
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
    initScrollSpy();
    initCountdown();

    const currentLang = I18n.getCurrentLang();
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
