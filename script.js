/* ============================================
   BURGER MENU
   ============================================ */
const burger = document.querySelector('.header__burger');
const mobileNav = document.querySelector('.mobile-nav');

burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('is-open');
  mobileNav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

/* Close mobile nav on link click */
mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('is-open');
    mobileNav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ============================================
   PARTENAIRES — duplicate logos for infinite scroll
   ============================================ */
const track = document.querySelector('.partenaires__track');
if (track) {
  const logos = [...track.children];
  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
}

/* ============================================
   CONTACT FORM — validation & confirmation
   ============================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    contactForm.querySelectorAll('.contact__error').forEach(el => el.textContent = '');
    contactForm.querySelectorAll('.contact__input--error').forEach(el => el.classList.remove('contact__input--error'));

    const prenom = contactForm.querySelector('#contact-prenom');
    if (!prenom.value.trim()) {
      showError(prenom, 'Le prénom est requis.');
      valid = false;
    }

    const email = contactForm.querySelector('#contact-email');
    if (!email.value.trim()) {
      showError(email, "L'email est requis.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError(email, "L'email n'est pas valide.");
      valid = false;
    }

    const sujet = contactForm.querySelector('#contact-sujet');
    if (!sujet.value) {
      const wrapper = sujet.closest('.contact__form-group');
      sujet.classList.add('contact__input--error');
      wrapper.querySelector('.contact__error').textContent = 'Veuillez choisir un sujet.';
      valid = false;
    }

    if (valid) {
      contactForm.hidden = true;
      document.querySelector('.contact__header').hidden = true;
      document.getElementById('contact-success').hidden = false;
    }
  });

  function showError(input, message) {
    input.classList.add('contact__input--error');
    const group = input.closest('.contact__form-group');
    group.querySelector('.contact__error').textContent = message;
  }
}
