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
    
    const scene = document.querySelector('.envelope-scene');
    const envelope = document.getElementById('envelope');
    const seal = document.getElementById('envelope-seal');
    const decors = document.querySelectorAll('.envelope-decor');

    if (!envelope) return;

    const tl = gsap.timeline();

    gsap.set(scene, { opacity: 0, y: 50, scale: 0.9 });
    gsap.set(seal, { scale: 0, rotation: -180 });
    gsap.set(decors, { opacity: 0, scale: 0 });

    tl.to(scene, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    })
    .to(seal, {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.3')
    .to(decors, {
      opacity: 0.4,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)'
    }, '-=0.4');
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
