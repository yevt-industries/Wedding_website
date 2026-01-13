const Animations = (() => {
  let gsapLoaded = false;
  let reducedMotion = false;

  function checkReducedMotion() {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return reducedMotion;
  }

  function waitForGSAP() {
    return new Promise((resolve) => {
      if (window.gsap && window.ScrollTrigger) {
        gsapLoaded = true;
        resolve();
        return;
      }

      const checkInterval = setInterval(() => {
        if (window.gsap && window.ScrollTrigger) {
          gsapLoaded = true;
          clearInterval(checkInterval);
          resolve();
        }
      }, 50);

      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 3000);
    });
  }

  function initPageTransition() {
    if (reducedMotion || !gsapLoaded) {
      document.querySelector('.page')?.classList.add('loaded');
      return;
    }

    const page = document.querySelector('.page');
    if (!page) return;

    gsap.set(page, { opacity: 0, y: 8 });
    
    gsap.to(page, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        page.classList.add('loaded');
      }
    });
  }

  function initHeroAnimations() {
    if (reducedMotion || !gsapLoaded) return;

    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-tagline, .hero-ctas');
    if (heroElements.length === 0) return;

    gsap.set(heroElements, { opacity: 0, y: 30 });
    
    gsap.to(heroElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.3
    });
  }

  function initScrollReveal() {
    if (reducedMotion || !gsapLoaded) {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('is-visible');
      });
      document.querySelectorAll('.reveal-item').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.reveal').forEach(section => {
      gsap.fromTo(section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
            onEnter: () => section.classList.add('is-visible')
          }
        }
      );
    });

    document.querySelectorAll('.reveal').forEach(section => {
      const items = section.querySelectorAll('.reveal-item');
      if (items.length === 0) return;

      gsap.fromTo(items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              items.forEach(item => item.classList.add('is-visible'));
            }
          }
        }
      );
    });
  }

  function initButtonHovers() {
    if (reducedMotion || !gsapLoaded) return;

    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          y: -2,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          y: 0,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    });
  }

  function initCardHovers() {
    if (reducedMotion || !gsapLoaded) return;

    document.querySelectorAll('.card, .day-card, .highlight-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -4,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }

  function animateModalIn(modal) {
    if (!gsapLoaded) {
      modal.classList.add('is-visible');
      return;
    }

    modal.classList.add('is-visible');
    
    const content = modal.querySelector('.lang-modal-content');
    if (content) {
      gsap.fromTo(content,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.2)' }
      );
    }
  }

  function animateModalOut(modal) {
    if (!gsapLoaded) {
      modal.classList.remove('is-visible');
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const content = modal.querySelector('.lang-modal-content');
      
      gsap.to(content, {
        scale: 0.9,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          modal.classList.remove('is-visible');
          resolve();
        }
      });
    });
  }

  async function init() {
    checkReducedMotion();
    await waitForGSAP();
    
    initPageTransition();
    initHeroAnimations();
    initScrollReveal();
    initButtonHovers();
    initCardHovers();
  }

  return {
    init,
    animateModalIn,
    animateModalOut,
    checkReducedMotion
  };
})();

export default Animations;

