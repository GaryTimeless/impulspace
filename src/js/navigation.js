/**
 * Navigation: sticky effect, mobile toggle, scroll-spy
 */
export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections = document.querySelectorAll('section[id]');

  let isMenuOpen = false;

  // --- Sticky navbar: transparent on hero, solid on scroll ---
  const heroSection = document.getElementById('hero');
  const navLogo = navbar?.querySelector('span');
  const navIcon = navbar?.querySelector('.w-10');

  function updateNavState() {
    if (!navbar) return;
    const heroBottom = heroSection ? heroSection.offsetHeight : window.innerHeight;
    const scrolled = window.scrollY > heroBottom - 80;

    if (scrolled) {
      // Light background, dark text
      navbar.classList.add('bg-offwhite/90', 'backdrop-blur-md', 'border-gray-200', 'shadow-sm');
      navbar.classList.remove('bg-transparent');
      navbar.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('text-white', 'hover:text-gold');
        l.classList.add('text-text-secondary', 'hover:text-gold');
      });
      if (navLogo) navLogo.classList.remove('text-white');
      if (navLogo) navLogo.classList.add('text-text-primary');
      if (navIcon) navIcon.classList.remove('bg-gold/20');
      if (navIcon) navIcon.classList.add('bg-text-primary');
      // Mobile hamburger bars
      navbar.querySelectorAll('#menu-toggle span').forEach(b => {
        b.classList.remove('bg-white');
        b.classList.add('bg-text-primary');
      });
    } else {
      // Transparent, white text over dark hero
      navbar.classList.remove('bg-offwhite/90', 'backdrop-blur-md', 'border-gray-200', 'shadow-sm');
      navbar.classList.add('bg-transparent');
      navbar.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('text-text-secondary', 'hover:text-gold');
        l.classList.add('text-white', 'hover:text-gold');
      });
      if (navLogo) navLogo.classList.remove('text-text-primary');
      if (navLogo) navLogo.classList.add('text-white');
      if (navIcon) navIcon.classList.remove('bg-text-primary');
      if (navIcon) navIcon.classList.add('bg-gold/20');
      navbar.querySelectorAll('#menu-toggle span').forEach(b => {
        b.classList.remove('bg-text-primary');
        b.classList.add('bg-white');
      });
    }
  }

  window.addEventListener('scroll', updateNavState, { passive: true });
  updateNavState();

  // --- Mobile menu toggle ---
  const bars = menuToggle?.querySelectorAll('span');

  function openMenu() {
    isMenuOpen = true;
    mobileMenu?.classList.remove('opacity-0', 'pointer-events-none');
    mobileMenu?.classList.add('opacity-100', 'pointer-events-auto');
    menuToggle?.setAttribute('aria-label', 'Menü schließen');
    menuToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Animate hamburger to X
    if (bars) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    }
  }

  function closeMenu() {
    isMenuOpen = false;
    mobileMenu?.classList.remove('opacity-100', 'pointer-events-auto');
    mobileMenu?.classList.add('opacity-0', 'pointer-events-none');
    menuToggle?.setAttribute('aria-label', 'Menü öffnen');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Reset hamburger
    if (bars) {
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    }
  }

  menuToggle?.addEventListener('click', () => {
    isMenuOpen ? closeMenu() : openMenu();
  });

  // Close menu on mobile link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
      menuToggle?.focus();
    }
  });

  // --- Scroll-spy ---
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (entry.isIntersecting && link) {
        navLinks.forEach(l => l.classList.remove('text-gold'));
        link.classList.add('text-gold');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}
