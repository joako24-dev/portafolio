/* ============================================================
   JOAQUÍN MORALES — PORTFOLIO SCRIPT
   ============================================================ */

'use strict';

// ── NAVBAR SCROLL ─────────────────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


// ── ACTIVE NAV LINK (scroll spy) ─────────────────────────────
(function initScrollSpy() {
  const links    = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();


// ── HAMBURGER MENU ────────────────────────────────────────────
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();


// ── REVEAL ON SCROLL ──────────────────────────────────────────
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay para grupos
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
})();


// ── SKILL BARS ANIMACIÓN ──────────────────────────────────────
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-w') || '0%';
        // Pequeño delay para que se vea la animación
        setTimeout(() => {
          fill.style.width = targetWidth;
        }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(fill => observer.observe(fill));
})();


// ── PORTFOLIO FILTERS ─────────────────────────────────────────
(function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.port-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cats = card.getAttribute('data-cat') || '';

        if (filter === 'all' || cats.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();


// ── FORMULARIO DE CONTACTO ────────────────────────────────────
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    // Estado de carga
    btn.innerHTML = '<span>Enviando...</span>';
    btn.disabled = true;

    // Simula envío (reemplazar con fetch a tu backend Python)
    setTimeout(() => {
      form.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
      success.classList.add('show');

      setTimeout(() => success.classList.remove('show'), 4000);
    }, 1500);
  });
})();


// ── SMOOTH SCROLL para href="#..." ───────────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navbar')?.offsetHeight || 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


// ── ANIMACIÓN DE NÚMEROS (stats opcionales) ──────────────────
function animateNumber(el, target, duration = 1500) {
  let start   = 0;
  const step  = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}


// ── PARTICLE LINES EN HERO (opcional, liviano) ───────────────
(function initHeroParticles() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  // Agrega partículas flotantes sutiles al hero
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(114,50,242,${Math.random() * 0.25 + 0.05});
      border-radius: 50%;
      top: ${Math.random() * 80 + 10}%;
      left: ${Math.random() * 80 + 10}%;
      animation: floatDot ${Math.random() * 6 + 8}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
      pointer-events: none;
      z-index: 1;
    `;
    hero.appendChild(dot);
  }

  // Inyecta keyframes si no existen
  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes floatDot {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
        33%       { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        66%       { transform: translateY(10px) translateX(-15px); opacity: 0.3; }
      }
      @keyframes fadeInCard {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
})();


// ── LOG DE BIENVENIDA ─────────────────────────────────────────
console.log('%c Joaquín Morales — Portfolio ', 'background:#7232f2;color:#fff;font-weight:bold;font-size:14px;padding:4px 8px;');
console.log('%c Frontend Developer | HTML · CSS · JS · Python ', 'color:#7232f2;font-size:11px;');
