(function () {
  'use strict';

  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  /* Header scroll state */
  function onScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    burger.classList.toggle('burger--open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--open');
      burger.classList.remove('burger--open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('nav__link--active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(
    '.section__header, .about__text, .about__images, .floating__card, ' +
    '.floating__unique, .details__list, .details__image, .fish__content, ' +
    '.fish__images, .certificates__grid, .audience__list, .contacts__info, ' +
    '.contacts__map, .gallery__item'
  );

  const floatingHero = document.querySelector('.floating__hero > img');

if (floatingHero) {
  const heroObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          heroObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  heroObserver.observe(floatingHero);
}

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));

  /* Gallery lightbox */
  const galleryItems = document.querySelectorAll('.gallery__item img');
  if (galleryItems.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button class="lightbox__close" aria-label="Закрыть">&times;</button><img src="" alt="">';
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.lightbox__close');

    galleryItems.forEach(img => {
      img.parentElement.addEventListener('click', () => {
        lbImg.src = img.src;
        lightbox.classList.add('lightbox--open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('lightbox--open');
      document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }
})();
