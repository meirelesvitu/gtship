// Navegação móvel e marcação de link ativo
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
navToggle?.addEventListener('click', ()=>{
  const open = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

const header = document.querySelector('.site-header');
const toTop = document.getElementById('to-top');
const onScroll = () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  header?.classList.toggle('is-elevated', y > 6);
  toTop?.classList.toggle('is-show', y > 800);
};
window.addEventListener('scroll', onScroll, { passive:true }); onScroll();
toTop?.addEventListener('click', ()=>window.scrollTo({ top:0, behavior:'smooth' }));

// Reveal on scroll
const els = document.querySelectorAll('[data-animate]');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-inview'); io.unobserve(e.target);} });
}, { rootMargin:'0px 0px -10% 0px' });
els.forEach(el => io.observe(el));

// Marca item atual do menu
(function markActive(){
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.site-nav a[href]').forEach(a=>{
    const href = a.getAttribute('href').toLowerCase();
    if ((path === '' && href.endsWith('index.html')) || href.endsWith(path)) {
      a.setAttribute('aria-current','page');
    }
  });
})();
