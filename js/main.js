/* ═══════════════════════════════════════════════════════════
   TECHSPIBUS — Main JavaScript
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll-aware Navigation ─────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ── Mobile Menu Toggle ──────────────────────────────── */
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      const isOpen = mobileMenu.classList.contains('open');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translateY(6.5px)' : 'none';
      spans[1].style.opacity = isOpen ? '0' : '1';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none';
    });
    mobileMenu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  /* ── Scroll Reveal Animations ────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ── Values Rotator (Homepage) ───────────────────────── */
  const valueItems = document.querySelectorAll('.value-item');
  const valueTitle = document.getElementById('value-title');
  const valueText = document.getElementById('value-text');
  if (valueItems.length && valueTitle && valueText) {
    const values = [
      { label: 'Depth Over Noise', text: 'In a world drowning in shallow content, we choose substance. We publish ideas that reward careful reading and revisiting. We measure our impact not by virality but by lasting influence.' },
      { label: 'Ancient Roots, Modern Reach', text: 'We honour the wisdom traditions — scriptural, philosophical, and intellectual — that have shaped human civilisation. We deliver them through every modern channel with craft and conviction.' },
      { label: 'Bold Authority', text: 'We do not equivocate. Our content takes positions, makes arguments, and challenges assumptions. We are intellectually generous but never intellectually timid.' },
      { label: 'Excellence Without Compromise', text: 'From manuscript to marketplace, every stage of our process reflects the highest standard we can achieve. We would rather publish fewer titles well than many titles poorly.' },
      { label: 'Global Perspective, African Voice', text: 'We are proudly rooted in Africa — one of the world\'s oldest and richest intellectual traditions — and we publish for the world. Our perspective is a strength, not a limitation.' }
    ];
    let active = 0;
    function setActiveValue(i) {
      active = i;
      valueItems.forEach((item, j) => item.classList.toggle('active', j === i));
      valueTitle.textContent = values[i].label;
      valueText.textContent = values[i].text;
    }
    valueItems.forEach((item, i) => {
      item.addEventListener('click', () => { setActiveValue(i); clearInterval(valueInterval); });
    });
    let valueInterval = setInterval(() => setActiveValue((active + 1) % values.length), 4000);
  }

  /* ── Newsletter Subscribe ────────────────────────────── */
  const subForm = document.getElementById('subscribe-form');
  const subSuccess = document.getElementById('subscribe-success');
  if (subForm) {
    subForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = subForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.includes('@')) {
        subForm.style.display = 'none';
        if (subSuccess) subSuccess.style.display = 'block';
      }
    });
  }

  /* ── Contact Form ────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      if (contactSuccess) contactSuccess.style.display = 'block';
    });
  }

  /* ── Active Nav Link Highlighting ────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });

  /* ── Smooth Scroll for Anchor Links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
