import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from './Icon';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WDAYS  = ['Mo','Tu','We','Th','Fr','Sa','Su'];

const QUESTIONS = [
  { key:'from', prompt:"Hey there — I'm your ARS moving assistant. Let's get a ballpark in about a minute. Where are you moving from?", type:'address', placeholder:'Address, city, or zip' },
  { key:'to',   prompt:"Got it. And where to?", type:'address', placeholder:'Address, city, or zip' },
  { key:'date', prompt:"When are you hoping to move? Pick a date below.", type:'calendar' },
  { key:'size', prompt:"How big is the place you're moving out of?", type:'chips', chips:['Studio','1 BR','2 BR','3 BR','House'] },
  { key:'items', prompt:"Any specialty items? Pick everything that applies.", type:'multi' },
];

const BASE_BY_SIZE = {
  'Studio': 2200, '1 BR': 2800, '2 BR': 3800, '3 BR': 4800, 'House': 6800,
};

const ITEM_OPTIONS = [
  { label:'Piano',          add:650 },
  { label:'Antiques',       add:350 },
  { label:'Art',            add:300 },
  { label:'Gym equipment',  add:400 },
  { label:'Safe',           add:450 },
  { label:'Fragile',        add:250 },
  { label:'None',           add:0   },
];

function calcRange(a) {
  const base = BASE_BY_SIZE[a.size] || 3000;
  const itemsAdd = (a.items || []).reduce((s, i) => s + (i.add || 0), 0);
  const subtotal = base + itemsAdd;
  return [
    Math.round((subtotal * 0.92) / 50) * 50,
    Math.round((subtotal * 1.12) / 50) * 50,
  ];
}

function fmtDate(d) {
  return d.toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' });
}

/* ---------- Address autocomplete: cities fallback + Nominatim ---------- */

const STATE_ABBR = {
  'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA',
  'Colorado':'CO','Connecticut':'CT','Delaware':'DE','District of Columbia':'DC',
  'Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID','Illinois':'IL',
  'Indiana':'IN','Iowa':'IA','Kansas':'KS','Kentucky':'KY','Louisiana':'LA',
  'Maine':'ME','Maryland':'MD','Massachusetts':'MA','Michigan':'MI','Minnesota':'MN',
  'Mississippi':'MS','Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV',
  'New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY',
  'North Carolina':'NC','North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR',
  'Pennsylvania':'PA','Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD',
  'Tennessee':'TN','Texas':'TX','Utah':'UT','Vermont':'VT','Virginia':'VA',
  'Washington':'WA','West Virginia':'WV','Wisconsin':'WI','Wyoming':'WY'
};

const CITIES = [
  'Herndon, VA','Reston, VA','Sterling, VA','Ashburn, VA','Leesburg, VA','Chantilly, VA',
  'Fairfax, VA','Vienna, VA','Arlington, VA','Alexandria, VA','McLean, VA','Manassas, VA',
  'Falls Church, VA','Springfield, VA','Annandale, VA','Burke, VA','Centreville, VA',
  'Woodbridge, VA','Lorton, VA','Tysons, VA','Great Falls, VA','Oakton, VA',
  'Washington, DC','Bethesda, MD','Silver Spring, MD','Rockville, MD','Gaithersburg, MD',
  'Frederick, MD','Germantown, MD','Hyattsville, MD','College Park, MD','Bowie, MD',
  'Baltimore, MD','Annapolis, MD','Columbia, MD','Towson, MD',
  'New York, NY','Brooklyn, NY','Manhattan, NY','Queens, NY','Bronx, NY','Staten Island, NY',
  'Jersey City, NJ','Hoboken, NJ','Newark, NJ','Philadelphia, PA','Pittsburgh, PA',
  'Boston, MA','Hartford, CT','New Haven, CT','Stamford, CT',
  'Los Angeles, CA','San Francisco, CA','San Diego, CA','San Jose, CA','Sacramento, CA',
  'Seattle, WA','Portland, OR','Denver, CO','Salt Lake City, UT','Phoenix, AZ','Las Vegas, NV',
  'Chicago, IL','Detroit, MI','Cleveland, OH','Columbus, OH','Cincinnati, OH','Indianapolis, IN',
  'Houston, TX','Dallas, TX','Austin, TX','San Antonio, TX','Fort Worth, TX','El Paso, TX',
  'Miami, FL','Orlando, FL','Tampa, FL','Jacksonville, FL','Fort Lauderdale, FL',
  'Atlanta, GA','Charlotte, NC','Raleigh, NC','Durham, NC','Nashville, TN','Memphis, TN',
  'New Orleans, LA','Birmingham, AL','Louisville, KY','St. Louis, MO','Kansas City, MO',
  'Minneapolis, MN','Saint Paul, MN','Milwaukee, WI','Madison, WI','Omaha, NE',
];

function searchCities(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const starts = [], contains = [];
  for (const c of CITIES) {
    const cL = c.toLowerCase();
    if (cL.startsWith(q)) starts.push(c);
    else if (cL.includes(q)) contains.push(c);
    if (starts.length >= 8) break;
  }
  return [...starts, ...contains].slice(0, 6);
}

function formatAddress(a) {
  if (!a) return '';
  const street = [a.house_number, a.road || a.pedestrian || a.footway].filter(Boolean).join(' ');
  const city = a.city || a.town || a.village || a.suburb || a.borough || a.neighbourhood || a.municipality || '';
  const state = STATE_ABBR[a.state] || a.state || '';
  const zip = a.postcode || '';
  const tail = [state, zip].filter(Boolean).join(' ');
  return [street, city, tail].filter(Boolean).join(', ');
}

async function searchAddresses(query, signal) {
  const q = query.trim();
  if (q.length < 3) return [];
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=us&limit=6&q=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url, { signal, headers: { 'Accept-Language': 'en' } });
    if (!res.ok) throw new Error('net');
    const data = await res.json();
    const results = data
      .map(r => ({ display: formatAddress(r.address), raw: r }))
      .filter(x => x.display && x.display.length > 2);
    const seen = new Set();
    return results.filter(r => {
      if (seen.has(r.display)) return false;
      seen.add(r.display);
      return true;
    });
  } catch (e) {
    if (e.name === 'AbortError') return null;
    return null;
  }
}

function splitDisplay(d) {
  const parts = d.split(', ');
  if (parts.length <= 1) return { primary: d, secondary: '' };
  return { primary: parts[0], secondary: parts.slice(1).join(', ') };
}

function highlight(text, q) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

/* ---------- AddressInput component ---------- */

function AddressInput({ value, onChange, placeholder, onEnterSubmit, disabled, autoFocus }) {
  const [items, setItems]   = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen]   = useState(false);
  const debounceRef = useRef(null);
  const ctrlRef     = useRef(null);
  const inputRef    = useRef(null);
  const blurTimer   = useRef(null);

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (ctrlRef.current) ctrlRef.current.abort();
    if (blurTimer.current) clearTimeout(blurTimer.current);
  }, []);

  const runRemote = useCallback(async (q) => {
    if (ctrlRef.current) ctrlRef.current.abort();
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;
    setLoading(true);
    let results = await searchAddresses(q, ctrl.signal);
    if (ctrl.signal.aborted) return;
    if (results === null) {
      results = searchCities(q).map(c => ({ display: c, raw: null }));
    }
    setItems(results);
    setActiveIdx(-1);
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const v = e.target.value;
    onChange(v);
    const q = v.trim();
    if (debounceRef.current) { clearTimeout(debounceRef.current); debounceRef.current = null; }
    if (q.length < 3) {
      if (ctrlRef.current) { ctrlRef.current.abort(); ctrlRef.current = null; }
      setLoading(false);
      setItems(searchCities(q).map(c => ({ display: c, raw: null })));
      setActiveIdx(-1);
      setOpen(true);
      return;
    }
    setOpen(true);
    debounceRef.current = setTimeout(() => runRemote(q), 350);
  };

  const pick = (val) => {
    onChange(val);
    setItems([]);
    setActiveIdx(-1);
    setLoading(false);
    setOpen(false);
    if (ctrlRef.current) { ctrlRef.current.abort(); ctrlRef.current = null; }
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (activeIdx >= 0 && items[activeIdx]) {
        e.preventDefault();
        pick(items[activeIdx].display);
        return;
      }
      if (onEnterSubmit) {
        e.preventDefault();
        onEnterSubmit(value);
      }
      return;
    }
    if (loading || !items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => (i + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => (i - 1 + items.length) % items.length);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const showList = open && (loading || items.length > 0);
  const q = value.trim();

  return (
    <div className="cqa-addr" style={{ position:'relative', flex:1, minWidth:0 }}>
      <input
        ref={inputRef}
        autoFocus={autoFocus}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={(e) => {
          if (items.length || loading) setOpen(true);
          e.target.style.borderColor='var(--ars-cyan)';
          e.target.style.boxShadow='var(--focus-ring)';
        }}
        onBlur={(e) => {
          blurTimer.current = setTimeout(() => setOpen(false), 140);
          e.target.style.borderColor='var(--border-strong)';
          e.target.style.boxShadow='none';
        }}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        style={{
          width:'100%', padding:'12px 14px', fontSize:15,
          background:'var(--ars-cream)', border:'1px solid var(--border-strong)',
          borderRadius:'var(--r-md)', fontFamily:'var(--font-sans)',
          color:'var(--ars-deep-navy)', outline:'none', minWidth:0,
          transition:'border-color 150ms var(--ease), box-shadow 150ms var(--ease)',
          boxSizing:'border-box',
        }}
      />
      {showList && (
        <ul className="cqa-suggestions" role="listbox">
          {loading ? (
            <li className="cqa-suggestion cqa-loading">
              <span className="cqa-spinner" aria-hidden="true"/>
              <span className="cqa-sugg-text"><span className="cqa-sugg-name">Searching…</span></span>
            </li>
          ) : items.map((it, i) => {
            const { primary, secondary } = splitDisplay(it.display);
            return (
              <li
                key={it.display + i}
                role="option"
                className={'cqa-suggestion' + (i === activeIdx ? ' active' : '')}
                onMouseDown={(e) => { e.preventDefault(); pick(it.display); }}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <Icon name="map-pin" size={16}/>
                <span className="cqa-sugg-text">
                  <span className="cqa-sugg-name">{highlight(primary, q)}</span>
                  {secondary && <span className="cqa-sugg-sub">{secondary}</span>}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ---------- Misc UI ---------- */

function TypingDots() {
  return <div className="cqa-typing" aria-label="Assistant is typing"><span/><span/><span/></div>;
}

function Bubble({ from, children }) {
  return (
    <div style={{ display:'flex', justifyContent:from==='bot'?'flex-start':'flex-end', marginBottom:10 }}>
      <div style={{
        maxWidth:'82%', padding:'11px 14px',
        borderRadius: from==='bot' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
        background: from==='bot' ? '#fff' : 'var(--ars-cyan)',
        color: from==='bot' ? 'var(--ars-deep-navy)' : '#fff',
        border: from==='bot' ? '1px solid var(--border)' : 'none',
        fontSize:14.5, lineHeight:1.45,
        boxShadow: from==='bot' ? '0 1px 2px rgba(32,30,31,.04)' : 'none',
        whiteSpace:'pre-wrap',
      }}>{children}</div>
    </div>
  );
}

function MiniCalendar({ onSelect }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [yr,setYr] = useState(today.getFullYear());
  const [mo,setMo] = useState(today.getMonth());
  const [sel,setSel] = useState(null);

  const prevMo = () => mo===0 ? (setMo(11),setYr(y=>y-1)) : setMo(m=>m-1);
  const nextMo = () => mo===11 ? (setMo(0),setYr(y=>y+1)) : setMo(m=>m+1);

  const firstDow = (new Date(yr,mo,1).getDay()+6)%7;
  const daysInMo = new Date(yr,mo+1,0).getDate();
  const cells = [...Array(firstDow).fill(null), ...Array.from({length:daysInMo},(_,i)=>i+1)];

  const pick = (d) => { setSel(d); onSelect(d); };
  const pickToday = () => { setYr(today.getFullYear()); setMo(today.getMonth()); pick(today); };

  const navBtn = {
    width:28, height:28, borderRadius:6, border:'1px solid var(--border)',
    background:'transparent', color:'var(--ars-deep-navy)', cursor:'pointer',
    display:'inline-flex', alignItems:'center', justifyContent:'center',
  };

  return (
    <div style={{ padding:'12px 14px 10px', userSelect:'none' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
        <button style={navBtn} onClick={prevMo} type="button" aria-label="Previous month">
          <Icon name="chevron-left" size={14}/>
        </button>
        <span style={{ fontWeight:700, fontSize:13, color:'var(--ars-deep-navy)' }}>{MONTHS[mo]} {yr}</span>
        <button style={navBtn} onClick={nextMo} type="button" aria-label="Next month">
          <Icon name="chevron-right" size={14}/>
        </button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:2 }}>
        {WDAYS.map(d => (
          <div key={d} style={{ textAlign:'center', fontSize:10, fontWeight:700, color:'var(--fg-quiet)', textTransform:'uppercase', letterSpacing:'.05em', padding:'2px 0' }}>{d}</div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2 }}>
        {cells.map((day,i) => {
          if (!day) return <div key={i}/>;
          const dt = new Date(yr,mo,day);
          const past = dt < today;
          const isToday = dt.getTime()===today.getTime();
          const isSel = sel && dt.getTime()===sel.getTime();
          return (
            <button key={i} type="button" disabled={past}
              onClick={() => pick(new Date(yr,mo,day))}
              style={{
                height:30, borderRadius:6,
                border: isToday&&!isSel ? '1.5px solid var(--ars-cyan)' : '1.5px solid transparent',
                background: isSel ? 'var(--ars-deep-navy)' : 'transparent',
                color: isSel ? '#fff' : past ? 'var(--fg-quiet)' : 'var(--ars-deep-navy)',
                opacity: past ? 0.38 : 1,
                cursor: past ? 'not-allowed' : 'pointer',
                fontWeight: isToday||isSel ? 700 : 400,
                fontSize:12, fontFamily:'var(--font-sans)',
              }}>
              {day}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop:6, borderTop:'1px solid var(--border)', paddingTop:6 }}>
        <button type="button" onClick={pickToday}
          style={{ fontSize:11, fontWeight:700, color:'var(--ars-cyan)', background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'var(--font-sans)', letterSpacing:'.04em', textTransform:'uppercase' }}>
          Today
        </button>
      </div>
    </div>
  );
}

/* ---------- Multi-select specialty items ---------- */

function MultiSelect({ onConfirm }) {
  const [chosen, setChosen] = useState(new Set());

  const toggle = (label) => {
    setChosen(prev => {
      const next = new Set(prev);
      if (label === 'None') {
        next.clear();
        next.add('None');
        return next;
      }
      next.delete('None');
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  };

  const confirm = () => {
    if (chosen.size === 0) return;
    const picked = ITEM_OPTIONS.filter(o => chosen.has(o.label));
    onConfirm(picked);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
        {ITEM_OPTIONS.map(opt => {
          const isOn = chosen.has(opt.label);
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => toggle(opt.label)}
              className="cqa-chip"
              style={isOn ? {
                borderColor:'var(--ars-cyan)',
                background:'var(--ars-cyan)',
                color:'#fff',
              } : undefined}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="btn btn--primary"
        onClick={confirm}
        disabled={chosen.size === 0}
        style={{ alignSelf:'flex-start', height:36, padding:'0 16px', fontSize:13 }}
      >
        Confirm
      </button>
    </div>
  );
}

/* ---------- Price card ---------- */

function PriceCard({ answers, onSubmit }) {
  const [name,setName]   = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [submitted,setSubmitted] = useState(false);

  const [lo,hi] = calcRange(answers);

  const doSubmit = () => {
    if (!name.trim()||!phone.trim()) return;
    setSubmitted(true);
    onSubmit?.({...answers, name:name.trim(), phone:phone.trim(), email:email.trim()});
  };

  const inp = {
    padding:'9px 12px', fontSize:13, width:'100%',
    background:'var(--ars-cream)', border:'1px solid var(--border-strong)',
    borderRadius:'var(--r-md)', fontFamily:'var(--font-sans)',
    color:'var(--ars-deep-navy)', outline:'none', boxSizing:'border-box',
    transition:'border-color 150ms, box-shadow 150ms',
  };
  const onFocus = e => { e.target.style.borderColor='var(--ars-cyan)'; e.target.style.boxShadow='var(--focus-ring)'; };
  const onBlur  = e => { e.target.style.borderColor='var(--border-strong)'; e.target.style.boxShadow='none'; };

  if (submitted) return (
    <div>
      <div style={{ fontWeight:700, fontSize:14, color:'var(--ars-deep-navy)', marginBottom:6 }}>
        Got it, {name.split(' ')[0]}!
      </div>
      <div style={{ fontSize:13, color:'var(--fg-muted)', lineHeight:1.55 }}>
        Our team will call {phone} within a few hours (Mon–Sun, 9am–6pm) to confirm details. No commitment needed.
      </div>
    </div>
  );

  const itemsLabel = (answers.items && answers.items.length)
    ? answers.items.map(i => i.label).join(', ')
    : '—';

  return (
    <div>
      {/* Price range */}
      <div style={{ textAlign:'center', paddingBottom:14, marginBottom:12, borderBottom:'1px solid var(--border)' }}>
        <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--fg-quiet)', marginBottom:5 }}>
          Estimated range
        </div>
        <div style={{ fontSize:32, fontWeight:800, color:'var(--ars-deep-navy)', letterSpacing:'-0.03em', lineHeight:1.1 }}>
          ${lo.toLocaleString()} – ${hi.toLocaleString()}
        </div>
        <div style={{ fontSize:11, color:'var(--fg-muted)', marginTop:4 }}>
          ballpark — exact price confirmed before your move
        </div>
      </div>

      {/* Move summary */}
      <div style={{ background:'var(--ars-cream)', borderRadius:'var(--r-md)', padding:'8px 12px', marginBottom:12, fontSize:12 }}>
        {[
          ['Route',     `${answers.from} → ${answers.to}`],
          ['Move date', answers.date],
          ['Home size', answers.size],
          ['Specialty', itemsLabel],
        ].map(([label,val]) => (
          <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8, lineHeight:1.85 }}>
            <span style={{ color:'var(--fg-quiet)', fontWeight:600, flexShrink:0 }}>{label}</span>
            <span style={{ color:'var(--ars-deep-navy)', fontWeight:600, textAlign:'right' }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div style={{ display:'flex', flexDirection:'column', gap:6, marginBottom:10 }}>
        <input value={name}  onChange={e=>setName(e.target.value)}  placeholder="Your name"          style={inp} onFocus={onFocus} onBlur={onBlur}/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(703) 555-0142" type="tel"   style={inp} onFocus={onFocus} onBlur={onBlur}/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email (optional)"  type="email" style={inp} onFocus={onFocus} onBlur={onBlur}/>
      </div>

      <button className="btn btn--primary" style={{ width:'100%', height:42, fontSize:14 }}
        onClick={doSubmit} disabled={!name.trim()||!phone.trim()}>
        Confirm &amp; get my free quote
      </button>
    </div>
  );
}

/* ---------- Main widget ---------- */

export default function ChatQuoteAssistant({ onSubmit }) {
  const [history,  setHistory]  = useState([{ from:'bot', text:QUESTIONS[0].prompt }]);
  const [step,     setStep]     = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [input,    setInput]    = useState('');
  const [busy,     setBusy]     = useState(false);
  const [done,     setDone]     = useState(false);
  const scrollerRef = useRef(null);

  const cur = QUESTIONS[step];

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, busy]);

  const sendUser = (val, displayText) => {
    if (val === undefined || val === null || busy || done) return;
    // For multi-select, val is an array of item objects.
    const valForAnswer = val;
    const text = displayText ?? (typeof val === 'string' ? val : '');
    if (typeof val === 'string' && !val.trim()) return;

    const updated = { ...answers, [cur.key]: valForAnswer };
    setAnswers(updated);
    setHistory(h => [...h, { from:'user', text }]);
    setInput('');
    setBusy(true);

    setTimeout(() => {
      const nextStep = step + 1;
      if (nextStep < QUESTIONS.length) {
        setHistory(h => [...h, { from:'bot', text:QUESTIONS[nextStep].prompt }]);
        setStep(nextStep);
        setBusy(false);
      } else {
        setHistory(h => [...h, { from:'bot', text:"Crunching the numbers…" }]);
        setBusy(false);
        setTimeout(() => {
          setHistory(h => [...h, { from:'bot', type:'price', answers:updated }]);
          setDone(true);
        }, 600);
      }
    }, 650);
  };

  const reset = () => {
    setHistory([{ from:'bot', text:QUESTIONS[0].prompt }]);
    setAnswers({}); setStep(0); setDone(false); setInput('');
  };

  const isCalendar = !done && !busy && cur?.type === 'calendar';
  const isChips    = !done && !busy && cur?.type === 'chips';
  const isMulti    = !done && !busy && cur?.type === 'multi';
  const isAddress  = !done && !busy && cur?.type === 'address';

  return (
    <div style={{
      width:'100%', maxWidth:'100%', borderRadius:'var(--r-xl)',
      overflow:'hidden', boxShadow:'var(--shadow-3)',
      border:'1px solid var(--border)', background:'var(--bg)',
      display:'flex', flexDirection:'column', height:540,
    }}>
      {/* Header */}
      <div style={{ background:'var(--ars-deep-navy)', color:'#fff', padding:'14px 18px', display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:40, height:40, borderRadius:999, background:'rgba(48,165,216,.20)', color:'var(--ars-cyan)', display:'inline-flex', alignItems:'center', justifyContent:'center', flex:'0 0 40px' }}>
          <Icon name="truck" size={20}/>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontWeight:700, fontSize:15, letterSpacing:'-0.01em' }}>Moving Assistant</div>
          <div style={{ fontSize:12, opacity:.82, display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ width:7, height:7, borderRadius:999, background:'#3CCB7F', boxShadow:'0 0 0 3px rgba(60,203,127,.18)' }}/>
            Online · replies instantly
          </div>
        </div>
        {!done && (
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'rgba(255,255,255,.62)', padding:'4px 8px', borderRadius:'var(--r-sm)', border:'1px solid rgba(255,255,255,.18)' }}>
            {Math.min(step+1,QUESTIONS.length)}/{QUESTIONS.length}
          </div>
        )}
      </div>

      {/* Progress bar */}
      {!done && (
        <div style={{ height:3, background:'rgba(48,165,216,.12)', position:'relative' }}>
          <div style={{
            position:'absolute', left:0, top:0, bottom:0,
            width: `${(step / QUESTIONS.length) * 100}%`,
            background:'var(--ars-cyan)',
            transition:'width 300ms var(--ease)',
          }}/>
        </div>
      )}

      {/* Chat body */}
      <div ref={scrollerRef} style={{ flex:1, overflowY:'auto', padding:'18px 18px 8px', background:'var(--ars-cream)' }}>
        {history.map((m,i) => {
          if (m.type==='price') {
            return (
              <div key={i} style={{ display:'flex', justifyContent:'flex-start', marginBottom:10 }}>
                <div style={{ maxWidth:'92%', padding:'16px 18px', borderRadius:'4px 16px 16px 16px', background:'#fff', border:'1px solid var(--border)', boxShadow:'0 1px 2px rgba(32,30,31,.04)' }}>
                  <PriceCard answers={m.answers} onSubmit={onSubmit}/>
                </div>
              </div>
            );
          }
          return <Bubble key={i} from={m.from}>{m.text}</Bubble>;
        })}

        {busy && (
          <div style={{ display:'flex', justifyContent:'flex-start', marginBottom:10 }}>
            <div style={{ padding:'12px 14px', borderRadius:'4px 16px 16px 16px', background:'#fff', border:'1px solid var(--border)' }}>
              <TypingDots/>
            </div>
          </div>
        )}

        {isChips && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:4, marginBottom:4 }}>
            {cur.chips.map(c => <button key={c} className="cqa-chip" onClick={() => sendUser(c, c)}>{c}</button>)}
          </div>
        )}

        {isMulti && (
          <div style={{ display:'flex', justifyContent:'flex-start', marginBottom:10 }}>
            <div style={{ maxWidth:'92%', padding:'14px 16px', borderRadius:'4px 16px 16px 16px', background:'#fff', border:'1px solid var(--border)', boxShadow:'0 1px 2px rgba(32,30,31,.04)' }}>
              <MultiSelect
                onConfirm={(picked) => {
                  const label = picked.map(p => p.label).join(', ');
                  sendUser(picked, label);
                }}
              />
            </div>
          </div>
        )}

        {isCalendar && (
          <div style={{ display:'flex', justifyContent:'flex-start', marginBottom:10 }}>
            <div style={{ borderRadius:'4px 16px 16px 16px', overflow:'hidden', border:'1px solid var(--border)', background:'#fff', boxShadow:'0 1px 2px rgba(32,30,31,.04)', minWidth:240 }}>
              <MiniCalendar onSelect={d => { const s = fmtDate(d); sendUser(s, s); }}/>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={e => { e.preventDefault(); if (typeof input === 'string') sendUser(input.trim(), input.trim()); }}
        style={{ padding:14, background:'#fff', borderTop:'1px solid var(--border)', display:'flex', gap:8 }}
      >
        {!done ? (
          <>
            {isAddress ? (
              <AddressInput
                value={input}
                onChange={setInput}
                placeholder={cur.placeholder}
                autoFocus
                disabled={busy}
                onEnterSubmit={(v) => sendUser(v.trim(), v.trim())}
              />
            ) : (
              <input
                autoFocus={!isCalendar && !isMulti && !isChips}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={
                  isCalendar ? 'or type a date, e.g. June 14' :
                  isMulti ? 'Pick items above…' :
                  isChips ? 'Pick one above, or type…' :
                  'Type your answer…'
                }
                disabled={busy}
                style={{
                  flex:1, padding:'12px 14px', fontSize:15,
                  background:'var(--ars-cream)', border:'1px solid var(--border-strong)',
                  borderRadius:'var(--r-md)', fontFamily:'var(--font-sans)',
                  color:'var(--ars-deep-navy)', outline:'none', minWidth:0,
                  transition:'border-color 150ms var(--ease), box-shadow 150ms var(--ease)',
                }}
                onFocus={e=>{e.target.style.borderColor='var(--ars-cyan)';e.target.style.boxShadow='var(--focus-ring)';}}
                onBlur={e=>{e.target.style.borderColor='var(--border-strong)';e.target.style.boxShadow='none';}}
              />
            )}
            <button type="submit" className="btn btn--primary" disabled={busy||!input.trim()}
              style={{ padding:'0 16px', flex:'0 0 auto' }} aria-label="Send">
              <Icon name="send" size={16}/>
            </button>
          </>
        ) : (
          <>
            <a href="tel:8665285358" className="btn btn--secondary" style={{ flex:1 }}>
              <Icon name="phone" size={16}/> Call now
            </a>
            <button type="button" onClick={reset} className="btn btn--primary" style={{ flex:1 }}>
              Start over
            </button>
          </>
        )}
      </form>
    </div>
  );
}
