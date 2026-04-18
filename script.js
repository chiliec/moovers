/* ===================================================
   METRO RELOCATORS — script
   Chat quote, reveals, nav, form, toast
   =================================================== */

(() => {
  'use strict';

  /* ---------- Helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  const header = $('.site-header');
  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const menuToggle = $('#menuToggle');
  const mobileNav = $('#mobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Toast ---------- */
  const toast = $('#toast');
  let toastTimer;
  const showToast = (msg, type = '') => {
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
  };

  /* ---------- Contact form ---------- */
  const contactForm = $('#contactForm');
  const contactNote = $('#contactNote');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contactForm).entries());
      if (!data.name || !data.phone || !data.email) {
        contactNote.textContent = 'Please fill in your name, phone, and email.';
        contactNote.className = 'form-note err';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        contactNote.textContent = 'Please enter a valid email address.';
        contactNote.className = 'form-note err';
        return;
      }
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      await sleep(800);
      btn.disabled = false;
      btn.textContent = 'Send Message';
      contactForm.reset();
      contactNote.textContent = 'Thanks! A coordinator will reach out within one business hour.';
      contactNote.className = 'form-note ok';
      showToast('Message sent. Talk soon!', 'ok');
    });
  }

  /* ===================================================
     QUOTE CHAT
     =================================================== */

  const chatBody = $('#chatBody');
  const chatInputWrap = $('#chatInputWrap');
  const chatProgress = $('#chatProgress');

  /* Step config */
  const steps = [
    {
      key: 'from',
      bot: "Hey there! I'm your moving assistant. Let's get you a quick estimate. First — what city are you moving from?",
      type: 'text',
      placeholder: 'e.g. Brooklyn, NY',
      validate: v => v.trim().length >= 2 || 'Please enter your origin city.'
    },
    {
      key: 'to',
      bot: "Got it. And where are you headed?",
      type: 'text',
      placeholder: 'e.g. Chicago, IL',
      validate: v => v.trim().length >= 2 || 'Please enter your destination city.'
    },
    {
      key: 'date',
      bot: "When are you planning to move?",
      type: 'date',
      validate: v => !!v || 'Please pick a move date.'
    },
    {
      key: 'home',
      bot: "What kind of home are you moving from?",
      type: 'options',
      options: [
        { label: 'Studio',        value: 'studio', base: 2200 },
        { label: '1 bedroom',     value: '1br',    base: 2800 },
        { label: '2 bedrooms',    value: '2br',    base: 3800 },
        { label: '3 bedrooms',    value: '3br',    base: 4800 },
        { label: 'House (4+ BR)', value: 'house',  base: 6800 }
      ]
    },
    {
      key: 'items',
      bot: "Any specialty items we should know about? Pick all that apply.",
      type: 'multi',
      options: [
        { label: 'Piano',           value: 'piano',    add: 650 },
        { label: 'Antiques',        value: 'antiques', add: 350 },
        { label: 'Fine art',        value: 'art',      add: 300 },
        { label: 'Gym equipment',   value: 'gym',      add: 400 },
        { label: 'Safe / heavy',    value: 'safe',     add: 450 },
        { label: 'Lots of fragile', value: 'fragile',  add: 250 },
        { label: 'None of these',   value: 'none',     add: 0 }
      ]
    }
  ];

  const answers = {};
  let stepIdx = 0;

  /* Rendering ---------------------- */
  const addBotMsg = async (text, delay = 600) => {
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;
    await sleep(delay);
    typing.remove();
    const msg = document.createElement('div');
    msg.className = 'msg bot';
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const addUserMsg = (text) => {
    const msg = document.createElement('div');
    msg.className = 'msg user';
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const setProgress = (pct) => {
    if (chatProgress) chatProgress.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  };

  const clearInput = () => { chatInputWrap.innerHTML = ''; chatInputWrap.classList.remove('empty'); };

  /* Input renderers ---------------------- */
  const renderTextInput = (step) => {
    clearInput();
    const wrap = document.createElement('form');
    wrap.className = 'chat-field';
    wrap.innerHTML = `
      <input type="${step.type === 'date' ? 'date' : 'text'}"
             placeholder="${step.placeholder || ''}"
             ${step.type === 'date' ? `min="${new Date().toISOString().split('T')[0]}"` : ''}
             aria-label="${step.bot}" />
      <button class="send-btn" type="submit">
        <span>Send</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    `;
    chatInputWrap.appendChild(wrap);
    const input = wrap.querySelector('input');
    setTimeout(() => input.focus(), 50);
    wrap.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      const result = step.validate ? step.validate(val) : true;
      if (result !== true) { showToast(result, 'err'); return; }
      const display = step.type === 'date' ? new Date(val).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : val;
      addUserMsg(display);
      answers[step.key] = val;
      advance();
    });
  };

  const renderOptions = (step) => {
    clearInput();
    step.options.forEach(opt => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt-btn';
      b.textContent = opt.label;
      b.addEventListener('click', () => {
        addUserMsg(opt.label);
        answers[step.key] = opt;
        advance();
      });
      chatInputWrap.appendChild(b);
    });
  };

  const renderMulti = (step) => {
    clearInput();
    const wrap = document.createElement('div');
    wrap.className = 'multi-wrap';
    const opts = document.createElement('div');
    opts.className = 'multi-options';
    const confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.className = 'confirm';
    confirm.textContent = 'Confirm';
    const chosen = new Set();

    step.options.forEach(opt => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt-btn';
      b.textContent = opt.label;
      b.addEventListener('click', () => {
        if (opt.value === 'none') {
          chosen.clear();
          opts.querySelectorAll('.opt-btn').forEach(x => x.classList.remove('checked'));
          b.classList.add('checked');
          chosen.add(opt.value);
          return;
        }
        // deselect "none" if any real item picked
        const noneBtn = Array.from(opts.querySelectorAll('.opt-btn')).find(x => x.textContent === 'None of these');
        if (noneBtn) noneBtn.classList.remove('checked');
        chosen.delete('none');

        if (chosen.has(opt.value)) {
          chosen.delete(opt.value);
          b.classList.remove('checked');
        } else {
          chosen.add(opt.value);
          b.classList.add('checked');
        }
      });
      opts.appendChild(b);
    });

    confirm.addEventListener('click', () => {
      if (chosen.size === 0) { showToast('Pick at least one option (or "None of these").', 'err'); return; }
      const picked = step.options.filter(o => chosen.has(o.value));
      const labels = picked.map(o => o.label).join(', ');
      addUserMsg(labels);
      answers[step.key] = picked;
      advance();
    });

    wrap.appendChild(opts);
    wrap.appendChild(confirm);
    chatInputWrap.appendChild(wrap);
  };

  /* Advance / estimate / lead ---------------------- */
  const advance = async () => {
    stepIdx++;
    setProgress((stepIdx / (steps.length + 1)) * 100);
    if (stepIdx < steps.length) {
      await runStep();
    } else {
      await showEstimate();
    }
  };

  const runStep = async () => {
    const step = steps[stepIdx];
    chatInputWrap.classList.add('empty');
    chatInputWrap.innerHTML = '';
    await addBotMsg(step.bot);
    if (step.type === 'options') renderOptions(step);
    else if (step.type === 'multi') renderMulti(step);
    else renderTextInput(step);
  };

  const calcEstimate = () => {
    const base = (answers.home && answers.home.base) || 3000;
    const itemsAdd = (answers.items || []).reduce((s, o) => s + (o.add || 0), 0);
    const subtotal = base + itemsAdd;
    const low  = Math.round((subtotal * 0.92) / 50) * 50;
    const high = Math.round((subtotal * 1.12) / 50) * 50;
    return { low, high };
  };

  const showEstimate = async () => {
    const { low, high } = calcEstimate();
    const fmt = n => '$' + n.toLocaleString('en-US');
    const route = `${answers.from || '—'} → ${answers.to || '—'}`;
    const dateStr = answers.date ? new Date(answers.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—';
    const homeLabel = (answers.home && answers.home.label) || '—';
    const itemsLabel = (answers.items || []).map(o => o.label).join(', ') || 'None';

    await addBotMsg("Crunching the numbers based on mileage, volume, and specialty handling…", 900);
    await sleep(400);

    const card = document.createElement('div');
    card.className = 'msg quote-card';
    card.innerHTML = `
      <h4>Estimated move cost</h4>
      <div class="price">${fmt(low)} – ${fmt(high)}</div>
      <p style="color: var(--text-3); font-size: 0.9rem;">Binding estimate · includes labor, truck, and standard packing supplies</p>
      <ul>
        <li>📍 Route: <strong>${route}</strong></li>
        <li>🗓 Move date: <strong>${dateStr}</strong></li>
        <li>🏠 Home size: <strong>${homeLabel}</strong></li>
        <li>📦 Specialty: <strong>${itemsLabel}</strong></li>
      </ul>
    `;
    chatBody.appendChild(card);
    chatBody.scrollTop = chatBody.scrollHeight;

    await sleep(500);
    await addBotMsg("Looks good? Drop your details and I'll lock in this price and connect you with a real coordinator.", 700);
    renderLeadForm();
    setProgress(92);
  };

  const renderLeadForm = () => {
    clearInput();
    const form = document.createElement('form');
    form.className = 'lead-form';
    form.innerHTML = `
      <div class="row">
        <input type="text" name="name" placeholder="Full name" autocomplete="name" required />
        <input type="tel" name="phone" placeholder="Phone number" autocomplete="tel" required />
      </div>
      <input type="email" name="email" placeholder="Email address" autocomplete="email" required />
      <button type="submit">Get My Quote</button>
    `;
    chatInputWrap.appendChild(form);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name || !data.phone || !data.email) { showToast('Please fill out all fields.', 'err'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showToast('Please enter a valid email.', 'err'); return; }

      const btn = form.querySelector('button');
      btn.disabled = true;
      btn.textContent = 'Saving…';
      await sleep(900);

      addUserMsg(`${data.name} · ${data.phone} · ${data.email}`);
      chatInputWrap.classList.add('empty');
      chatInputWrap.innerHTML = '<span>✓ Your quote is locked in. A coordinator will reach out within 1 business hour.</span>';
      await addBotMsg(`Thanks, ${data.name.split(' ')[0]}! Your quote is locked in. A move coordinator will reach out to ${data.phone} within the next business hour to schedule your walkthrough. Check your email (${data.email}) for a copy of this estimate.`, 800);
      setProgress(100);
      showToast('Quote submitted — we\'ll be in touch!', 'ok');
    });
  };

  /* Kickoff ---------------------- */
  const startChat = async () => {
    setProgress(6);
    await addBotMsg(steps[0].bot, 500);
    renderTextInput(steps[0]);
  };

  /* Start only when in view, to avoid layout running while user is far away */
  if (chatBody && chatInputWrap) {
    if ('IntersectionObserver' in window) {
      const chatIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            chatIo.disconnect();
            startChat();
          }
        });
      }, { threshold: 0.2 });
      chatIo.observe(chatBody);
    } else {
      startChat();
    }
  }
})();
