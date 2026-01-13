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
    const hint = document.getElementById('envelope-hint');
    const decors = document.querySelectorAll('.envelope-decor');

    if (!envelope) return;

    const tl = gsap.timeline();

    gsap.set(scene, { opacity: 0, y: 50, scale: 0.9 });
    gsap.set(seal, { scale: 0, rotation: -180 });
    gsap.set(hint, { opacity: 0, y: 10 });
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
    .to(hint, {
      opacity: 0.8,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.2')
    .to(decors, {
      opacity: 0.4,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)'
    }, '-=0.4');
  }

  function animateEnvelopeOpen() {
    if (!gsapLoaded) {
      document.getElementById('envelope')?.classList.add('is-open');
      return;
    }

    const envelope = document.getElementById('envelope');
    const flap = document.getElementById('envelope-flap');
    const seal = document.getElementById('envelope-seal');
    const card = document.getElementById('envelope-card');
    const hint = document.getElementById('envelope-hint');

    if (!envelope || !flap) return;

    envelope.classList.add('is-open');

    const tl = gsap.timeline();

    tl.to(hint, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: 'power2.in'
    })
    .to(seal, {
      scale: 1.2,
      duration: 0.15,
      ease: 'power2.out'
    })
    .to(seal, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(flap, {
      rotateX: -180,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.2')
    .to(card, {
      y: -20,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3');
  }

  async function animateEnvelopeClose() {
    const overlay = document.getElementById('envelope-overlay');
    const card = document.getElementById('envelope-card');
    const scene = document.querySelector('.envelope-scene');

    if (!overlay) return;

    if (!gsapLoaded) {
      overlay.classList.add('is-hidden');
      return;
    }

    const tl = gsap.timeline();

    await new Promise(resolve => {
      tl.to(card, {
        y: -100,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.in'
      })
      .to(scene, {
        scale: 1.5,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      }, '-=0.2')
      .to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          overlay.classList.add('is-hidden');
          resolve();
        }
      }, '-=0.2');
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
    animateEnvelopeEntrance,
    animateEnvelopeOpen,
    animateEnvelopeClose,
    checkReducedMotion
  };
})();

export default Animations;
