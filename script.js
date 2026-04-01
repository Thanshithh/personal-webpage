// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav when link clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===========================
// HERO TYPEWRITER EFFECT
// ===========================
const roles = [
  'Software Engineer',
  'Data Analyst',
  'ML Enthusiast',
  'Full-Stack Developer',
  'Problem Solver'
];

let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
const dynamicEl = document.getElementById('hero-title-dynamic');

function typewriter() {
  const current = roles[roleIdx];
  if (!isDeleting) {
    dynamicEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typewriter, 2000);
      return;
    }
  } else {
    dynamicEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typewriter, isDeleting ? 60 : 110);
}

setTimeout(typewriter, 1800);

// ===========================
// FLOATING PARTICLES
// ===========================
const particlesContainer = document.getElementById('particles-container');
const PARTICLE_COUNT = 40;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const x = Math.random() * 100;
  const duration = 8 + Math.random() * 16;
  const delay = Math.random() * 12;
  const size = 1 + Math.random() * 3;
  const colors = ['#7c3aed', '#a855f7', '#06b6d4', '#818cf8'];
  p.style.cssText = `
    left: ${x}%;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
  `;
  particlesContainer.appendChild(p);
}

// ===========================
// SCROLL REVEAL
// ===========================
const revealElements = document.querySelectorAll(
  '.skill-category, .project-card, .timeline-item, .cert-card, .contact-card, .about-grid, .about-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animations slightly
      const siblings = Array.from(entry.target.parentElement.children).filter(c => c.classList.contains('reveal'));
      const i = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = '#a855f7';
    }
  });
});

// ===========================
// SMOOTH STAT NUMBER ANIMATION
// ===========================
function animateNumber(el, target, suffix = '') {
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (Number.isInteger(target)
      ? Math.floor(eased * target)
      : (eased * target).toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums[0] && animateNumber(statNums[0], 3.5, '');
      statNums[1] && animateNumber(statNums[1], 5, '+');
      statNums[2] && animateNumber(statNums[2], 4, '');
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutCard = document.getElementById('stat-gpa');
if (aboutCard) statsObserver.observe(aboutCard.closest('.about-stats') || aboutCard.closest('.about-card'));
