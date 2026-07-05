/* Analyst Den V3 — script.js */
document.addEventListener('DOMContentLoaded', () => {

  /* THEME */
  const THEME_KEY = 'ad-theme';
  const root = document.documentElement;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) root.setAttribute('data-theme', saved);
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.setAttribute('data-theme','dark');

  document.querySelectorAll('.header-right').forEach(hr => {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle dark/light mode');
    btn.innerHTML = '<span class="icon-sun">☀️</span><span class="icon-moon">🌙</span>';
    btn.addEventListener('click', () => {
      const cur = root.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
    });
    const mt = hr.querySelector('.menu-toggle');
    if (mt) hr.insertBefore(btn, mt); else hr.appendChild(btn);
  });

  /* PAGE TRANSITIONS */
  document.querySelectorAll('a[href]').forEach(a => {
    const h = a.getAttribute('href');
    if (!h || h.startsWith('#') || h.startsWith('http') || h.startsWith('mailto') || a.hasAttribute('download')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.animation = 'pageOut 0.22s ease forwards';
      setTimeout(() => window.location.href = h, 200);
    });
  });

  /* MOBILE MENU */
  const toggle = document.querySelector('.menu-toggle');
  const menu   = document.querySelector('.mobile-menu');
  const mclose = document.querySelector('.mobile-close');
  if (toggle && menu) {
    let overlay = document.querySelector('.mobile-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-overlay';
      document.body.appendChild(overlay);
    }
    const open  = () => { menu.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow='hidden' };
    const close = () => { menu.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow='' };
    toggle.onclick  = open;
    if (mclose) mclose.onclick = close;
    overlay.onclick = close;
  }

  /* SCROLL REVEAL */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } });
  }, { threshold:0.1, rootMargin:'0px 0px -32px 0px' });

  const revealTargets = [
    '.project-card-ed','.pub-card','.contributor-profile',
    '.role-card','.track-card','.perk-item','.process-row',
    '.data-number-col','.finding-col','.featured-item',
    '.contributor-col','.section-eyebrow','.hero-metric',
    '.cd-project-item','.content-section','.pull-quote'
  ];
  revealTargets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      if (i % 4 > 0) el.classList.add(`reveal-d${i % 4}`);
      io.observe(el);
    });
  });

  /* FILTERS */
  document.querySelectorAll('.filter-bar').forEach(bar => {
    const btns = bar.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter || 'all';
        const target = bar.dataset.target;
        if (target) {
          document.querySelectorAll(target).forEach(el => {
            if (filter === 'all') { el.style.display = ''; return }
            const cats = (el.dataset.category || '').toLowerCase();
            el.style.display = cats.includes(filter.toLowerCase()) ? '' : 'none';
          });
        }
      });
    });
  });

  /* ROLE CARD SELECTION */
  document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  /* FAQ */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) q.addEventListener('click', () => item.classList.toggle('open'));
  });

  /* ACTIVE NAV */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  /* STICKY HEADER SHADOW */
  const hdr = document.querySelector('.site-header');
  if (hdr) window.addEventListener('scroll', () => {
    hdr.style.boxShadow = window.scrollY > 4 ? '0 1px 0 var(--border)' : 'none';
  }, { passive:true });

  /* CONTACT FORM */
  const cf = document.getElementById('contact-form');
  if (cf) cf.addEventListener('submit', e => {
    e.preventDefault();
    const btn = cf.querySelector('button[type=submit]');
    btn.textContent = 'Message sent ✓';
    btn.disabled = true;
    setTimeout(() => { cf.reset(); btn.textContent = 'Send Message'; btn.disabled = false }, 3500);
  });

  /* APPLICATION FORM */
  const af = document.getElementById('apply-form');
  if (af) af.addEventListener('submit', e => {
    e.preventDefault();
    const btn = af.querySelector('button[type=submit]');
    btn.textContent = 'Application submitted ✓';
    btn.disabled = true;
    setTimeout(() => { af.reset(); btn.textContent = 'Submit Application'; btn.disabled = false }, 3500);
  });

  /* COUNTDOWN */
  const cd = document.getElementById('countdown-timer');
  if (cd) {
    const target = new Date(); target.setMonth(target.getMonth()+1); target.setDate(1); target.setHours(0,0,0,0);
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { cd.textContent = 'Starting today'; return }
      const d = Math.floor(diff/86400000), h = Math.floor(diff/3600000)%24, m = Math.floor(diff/60000)%60;
      cd.textContent = `${d}d ${h}h ${m}m`;
    };
    tick(); setInterval(tick, 60000);
  }

  /* TYPING EFFECT */
  const te = document.getElementById('typing-text');
  if (te) {
    const words = ['Decisions That Matter','Public Insights','Evidence-Based Action'];
    let wi=0,ci=0,del=false;
    const type = () => {
      const w = words[wi];
      if (!del) { te.textContent = w.slice(0,++ci); if(ci===w.length){del=true;setTimeout(type,1800);return} }
      else { te.textContent = w.slice(0,--ci); if(ci===0){del=false;wi=(wi+1)%words.length} }
      setTimeout(type, del?44:70);
    };
    setTimeout(type, 800);
  }

});
