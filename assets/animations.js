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

  function animateEnvelopeEntrance() {
    if (!gsapLoaded) return;
    
    const pretext = document.querySelector('.envelope-header-pretext');
    const titleText = document.querySelector('.envelope-header-title-text');
    const date = document.querySelector('.envelope-header-date');
    const location = document.querySelector('.envelope-header-location');
    const envelope = document.querySelector('.envelope-container');
    const seal = document.getElementById('envelope-seal');
    const hint = document.querySelector('.envelope-hint');

    if (!envelope || !titleText) return;

    const tl = gsap.timeline();

    tl.to(pretext, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
    .to(titleText, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.inOut'
    }, 0.1)
    .to(titleText, {
      fillOpacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, 0.9)
    .to(date, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.7)
    .to(location, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.9)
    .to(hint, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 1.1)
    .to(envelope, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, 1.4)
    .to(seal, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(2)'
    }, '-=0.15');
  }

  function animateEnvelopeOpenAndDismiss(onComplete) {
    const overlay = document.getElementById('envelope-overlay');
    const envelope = document.getElementById('envelope');
    const flap = document.getElementById('envelope-flap');
    const seal = document.getElementById('envelope-seal');
    const invitationCard = document.getElementById('invitation-card');
    const langButtons = document.querySelector('.envelope-lang-buttons');

    if (!overlay || !flap || !envelope) {
      if (onComplete) onComplete();
      return;
    }

    if (!gsapLoaded) {
      overlay.classList.add('is-hidden');
      if (onComplete) onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.classList.add('is-hidden');
        if (onComplete) onComplete();
      }
    });

    tl.to(langButtons, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
    .to(seal, {
      opacity: 0,
      scale: 0.8,
      duration: 0.25,
      ease: 'power2.in'
    }, '-=0.1')
    .to(flap, {
      rotateX: -180,
      duration: 0.7,
      ease: 'power2.inOut'
    })
    .to(invitationCard, {
      zIndex: 9,
      duration: 0
    })
    .to(invitationCard, {
      y: -350,
      duration: 1.8,
      ease: 'power2.out'
    })
    .to(envelope, {
      y: 120,
      duration: 1.8,
      ease: 'power2.out'
    }, '<')
    .to({}, { duration: 0.8 })
    .to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
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

  function initFullPageScroll() {
    if (!gsapLoaded) return;
    
    const snapSections = document.querySelectorAll('[data-snap="true"]');
    if (snapSections.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);
    
    const scrollContainer = document.getElementById('scroll-container');
    if (scrollContainer) {
      ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
          if (arguments.length) {
            scrollContainer.scrollTop = value;
          }
          return scrollContainer.scrollTop;
        }
      });
      
      ScrollTrigger.defaults({ scroller: scrollContainer });
      
      scrollContainer.addEventListener('scroll', () => {
        ScrollTrigger.update();
      });
    }

    snapSections.forEach((section) => {
      gsap.fromTo(section.querySelectorAll('.snap-card, .intro-section, .countdown-wrapper'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            once: true
          }
        }
      );
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

  waitForGSAP();

  return {
    init,
    initFullPageScroll,
    animateEnvelopeEntrance,
    animateEnvelopeOpenAndDismiss,
    checkReducedMotion
  };
})();

export default Animations;
