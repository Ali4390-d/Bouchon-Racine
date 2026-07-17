/* ===== DUST MOTES ===== */
const dust = document.getElementById('dust');
for (let i = 0; i < 24; i++) {
  const s = document.createElement('span');
  s.style.left = Math.random() * 100 + '%';
  s.style.animationDuration = (8 + Math.random() * 12) + 's';
  s.style.animationDelay = (Math.random() * 10) + 's';
  s.style.opacity = (0.2 + Math.random() * 0.5);
  s.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
  dust.appendChild(s);
}

/* ===== HAMBURGER / MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ===== CONCEPT TOGGLE ===== */
const conceptBtns = document.querySelectorAll('.concept-toggle-btn');
const conceptSlider = document.querySelector('.concept-toggle-slider');
conceptBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    conceptBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const floor = btn.dataset.floor;
    document.querySelectorAll('.concept-pane').forEach(p => p.classList.remove('active'));
    document.getElementById('pane-' + floor).classList.add('active');
    if (floor === 'downstairs') conceptSlider.classList.add('right');
    else conceptSlider.classList.remove('right');
  });
});

/* ===== MENU TABS ===== */
const menuTabs = document.querySelectorAll('.menu-tab');
menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    document.querySelectorAll('.menu-pane').forEach(p => p.classList.remove('active'));
    document.getElementById('pane-' + target).classList.add('active');
  });
});

/* ===== RESERVATION FORM VENUE TOGGLE ===== */
const venueBtns = document.querySelectorAll('.form-venue-btn');
venueBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    venueBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ===== RESERVATION FORM SUBMIT ===== */
document.getElementById('reserveForm').addEventListener('submit', e => {
  e.preventDefault();
  const venue = document.querySelector('.form-venue-btn.active').dataset.venue;
  const venueName = venue === 'bouchon' ? 'Bouchon Racine' : 'Three Compasses';
  showToast(`Reservation request received for ${venueName}. We'll confirm by email shortly.`);
  e.target.reset();
  document.querySelector('.form-venue-btn[data-venue="bouchon"]').classList.add('active');
  document.querySelector('.form-venue-btn[data-venue="pub"]').classList.remove('active');
  // Reset date to today
  const dateInput = document.getElementById('reserveDate');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
});

/* ===== NEWSLETTER ===== */
document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('newsSuccess').classList.add('show');
  e.target.reset();
  setTimeout(() => document.getElementById('newsSuccess').classList.remove('show'), 4000);
});

/* ===== MENU PDF DOWNLOAD ===== */
document.getElementById('downloadMenu').addEventListener('click', e => {
  e.preventDefault();
  showToast('Menu PDF download will be available soon.');
});

/* ===== SEARCH MODAL ===== */
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
document.getElementById('searchOpen').addEventListener('click', () => {
  searchModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput.focus(), 200);
});
document.getElementById('searchClose').addEventListener('click', closeSearch);
searchModal.addEventListener('click', e => {
  if (e.target === searchModal) closeSearch();
});

function closeSearch() {
  searchModal.classList.remove('active');
  document.body.style.overflow = '';
}

/* Search tag clicks */
document.querySelectorAll('.search-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const term = tag.dataset.term;
    closeSearch();
    showToast(`Searching for "${term}"... Try the menus below!`);
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  });
});

/* Search submit (Enter key) */
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && searchInput.value.trim()) {
    const term = searchInput.value.trim();
    closeSearch();
    showToast(`Searching for "${term}"... Try the menus below!`);
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    searchInput.value = '';
  }
});

/* ===== TOAST ===== */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3800);
}

/* ===== REVEAL ON SCROLL ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===== NAV SCROLL EFFECT ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 80) {
    nav.style.boxShadow = '0 4px 24px -8px rgba(0,0,0,.5)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

/* ===== SET MIN DATE FOR RESERVATION ===== */
const dateInput = document.getElementById('reserveDate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  dateInput.value = today;
}

/* ===== ESC TO CLOSE MODALS ===== */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (searchModal.classList.contains('active')) closeSearch();
    if (mobileMenu.classList.contains('active')) hamburger.click();
  }
});

/* ===== GALLERY ITEM ACCESSIBILITY ===== */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
});
