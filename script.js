const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;
    projects.forEach((project) => {
      project.classList.toggle('hidden', selected !== 'all' && project.dataset.category !== selected);
    });
  });
});

const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
if (modal && modalImage && modalCaption) {
  projects.forEach((project) => {
    project.addEventListener('click', () => {
      modalImage.src = project.dataset.image;
      modalImage.alt = project.dataset.title;
      modalCaption.textContent = project.dataset.title;
      modal.showModal();
    });
  });

  document.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
}

const form = document.getElementById('enquiry-form');
const formNote = document.getElementById('form-note');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const service = String(data.get('service') || '').trim();
    const location = String(data.get('location') || '').trim();
    const timeline = String(data.get('timeline') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = encodeURIComponent(`Project enquiry from ${name || 'website visitor'}`);
    const body = encodeURIComponent([
      `Name: ${name}`,
      `Phone / WhatsApp: ${phone}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Project location: ${location || 'Not provided'}`,
      `Expected start: ${timeline}`,
      '',
      'Project details:',
      message
    ].join('\n'));

    if (formNote) formNote.textContent = 'Opening your default email application…';
    window.location.href = `mailto:info@dezuri.com?subject=${subject}&body=${body}`;
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((element) => revealObserver.observe(element));
} else {
  revealItems.forEach((element) => element.classList.add('visible'));
}
