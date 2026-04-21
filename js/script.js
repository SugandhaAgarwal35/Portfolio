document.addEventListener('DOMContentLoaded', () => {

  // ===== TYPING ANIMATION =====
  const typingEl = document.getElementById('typing-text');
  const phrases = [
    'Aspiring Data Scientist',
    'AI & ML Enthusiast',
    'Big Data Explorer',
    'NLP Developer',
    'Full-Stack Tinkerer'
  ];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function typeEffect() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(typeEffect, 400); return; }
    } else {
      typingEl.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) { isDeleting = true; setTimeout(typeEffect, 1800); return; }
    }
    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }
  typeEffect();

  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ===== MOBILE MENU =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== ACTIVE NAV LINK =====
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop, height = sec.offsetHeight, id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
  });

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));

  // ===== PROJECT FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) { card.style.opacity = '0'; requestAnimationFrame(() => { card.style.opacity = '1'; }); }
      });
    });
  });

  // ===== CERTIFICATE MODAL =====
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.querySelector('.modal-close');

  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('h3').textContent;
      if (img) {
        modalImg.src = img.src;
        modalImg.style.display = 'block';
      } else {
        modalImg.style.display = 'none';
      }
      modalTitle.textContent = title;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // ===== SMOOTH SCROLL FOR BUTTONS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ===== PARTICLE BACKGROUND (HERO) =====
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*2+0.5, dx: (Math.random()-0.5)*0.5, dy: (Math.random()-0.5)*0.5, opacity: Math.random()*0.5+0.1 });
    }
    function animateParticles() {
      ctx.clearRect(0,0,w,h);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(124,58,237,${p.opacity})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }
});
