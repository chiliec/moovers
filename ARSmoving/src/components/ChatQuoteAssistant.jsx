import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WDAYS  = ['Mo','Tu','We','Th','Fr','Sa','Su'];

const QUESTIONS = [
  { key:'from', prompt:"Hey there — I'm your moving assistant at ARS. Let's get a ballpark in about a minute. Where are you moving from?", placeholder:'City or zip (e.g. Herndon 20170)' },
  { key:'to',   prompt:"Got it. And where to?", placeholder:'City, state, or zip' },
  { key:'type', prompt:"What kind of move is it?", chips:['Local','Long-distance','Office','Specialty'] },
  { key:'size',      prompt:"How big is the place you're moving out of?", chips:['Studio','1 BR','2 BR','3 BR','4+ BR'] },
  { key:'specialty', prompt:"Any specialty items we should know about? Pick all that apply.", type:'multiselect', chips:['Piano','Antiques','Fine art','Gym equipment','Safe / heavy','Lots of fragile','None of these'] },
  { key:'date',      prompt:"When are you hoping to move? Pick a date below.", type:'calendar' },
];

const BASE_RANGES = {
  Studio:[550,850], '1 BR':[800,1200], '2 BR':[1100,1700],
  '3 BR':[1500,2400], '4+ BR':[2200,3600],
};
const TYPE_MULT = { Local:1, 'Long-distance':1.8, Office:1.4, Specialty:1.5 };

function calcRange(a) {
  const [lo,hi] = BASE_RANGES[a.size] || [900,1800];
  const m = TYPE_MULT[a.type] || 1;
  return [Math.round(lo*m/50)*50, Math.round(hi*m/50)*50];
}

function fmtDate(d) {
  return d.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
}

function TypingDots() {
  return <div className="cqa-typing" aria-label="Assistant is typing"><span/><span/><span/></div>;
}

function AddressInput({ value, onChange, onSubmit, placeholder, disabled }) {
  const [suggs, setSuggs] = useState([]);
  const [open,  setOpen]  = useState(false);
  const timer = useRef(null);

  const parseSugg = (r) => {
    const a = r.address;
    const main = [
      a.house_number && a.road ? `${a.house_number} ${a.road}` : a.road,
      !a.road && (a.city || a.town || a.village || a.hamlet) ? (a.city || a.town || a.village || a.hamlet) : null,
    ].filter(Boolean).join(' ') || r.display_name.split(',')[0];
    const city  = a.city || a.town || a.village || a.suburb || a.hamlet || '';
    const state = a.state || '';
    const zip   = a.postcode || '';
    const sub   = [city, [state, zip].filter(Boolean).join(' ')].filter(Boolean).join(', ');
    const full  = [main, sub].filter(Boolean).join(', ');
    return { main, sub, full };
  };

  const fetchSuggs = (q) => {
    clearTimeout(timer.current);
    if (q.length < 3) { setSuggs([]); setOpen(false); return; }
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&addressdetails=1&countrycodes=us`,
          { headers: { 'Accept': 'application/json', 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        const seen = new Set();
        const items = data.map(parseSugg).filter(s => {
          if (!s.full || seen.has(s.full)) return false;
          seen.add(s.full); return true;
        });
        setSuggs(items);
        setOpen(items.length > 0);
      } catch { setSuggs([]); setOpen(false); }
    }, 500);
  };

  const pick = (s) => { onChange(s.full); setOpen(false); setSuggs([]); };

  return (
    <div style={{ flex:1, position:'relative', minWidth:0 }}>
      <input
        value={value}
        onChange={e => { onChange(e.target.value); fetchSuggs(e.target.value); }}
        onKeyDown={e => { if (e.key==='Escape') setOpen(false); }}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width:'100%', padding:'12px 14px', fontSize:15, boxSizing:'border-box',
          background:'var(--ars-cream)', border:'1px solid var(--border-strong)',
          borderRadius:'var(--r-md)', fontFamily:'var(--font-sans)',
          color:'var(--ars-deep-navy)', outline:'none',
          transition:'border-color 150ms var(--ease), box-shadow 150ms var(--ease)',
        }}
        onFocus={e => { e.target.style.borderColor='var(--ars-cyan)'; e.target.style.boxShadow='var(--focus-ring)'; }}
        onBlur={e => { e.target.style.borderColor='var(--border-strong)'; e.target.style.boxShadow='none'; setTimeout(() => setOpen(false), 150); }}
      />
      {open && suggs.length > 0 && (
        <div style={{
          position:'absolute', bottom:'calc(100% + 6px)', left:0, right:0,
          background:'#fff', border:'1px solid var(--border)',
          borderRadius:'var(--r-lg)', boxShadow:'var(--shadow-3)', zIndex:200, overflow:'hidden',
        }}>
          {suggs.map((s,i) => (
            <button key={i} type="button" onMouseDown={() => pick(s)}
              style={{
                display:'flex', alignItems:'center', gap:12, width:'100%', textAlign:'left',
                padding:'12px 16px', background:'transparent', border:'none', cursor:'pointer',
                fontFamily:'var(--font-sans)',
                borderBottom: i < suggs.length-1 ? '1px solid var(--border)' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.background='var(--ars-cream)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <span style={{ color:'var(--ars-cyan)', flexShrink:0, marginTop:1 }}>
                <Icon name="map-pin" size={16}/>
              </span>
              <span>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--ars-deep-navy)', lineHeight:1.3 }}>{s.main}</div>
                {s.sub && <div style={{ fontSize:12, color:'var(--fg-quiet)', marginTop:2, lineHeight:1.2 }}>{s.sub}</div>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
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

function MultiSelectChips({ items, selected, onToggle }) {
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:4, marginBottom:4 }}>
      {items.map(c => (
        <button key={c} type="button" className="cqa-chip"
          style={selected.includes(c) ? { background:'var(--ars-deep-navy)', color:'#fff', borderColor:'var(--ars-deep-navy)' } : {}}
          onClick={() => onToggle(c)}
        >{c}</button>
      ))}
    </div>
  );
}

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
          ['Move type', answers.type],
          answers.specialty && answers.specialty !== 'None' ? ['Specialty', answers.specialty] : null,
        ].filter(Boolean).map(([label,val]) => (
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

export default function ChatQuoteAssistant({ onSubmit }) {
  const [history,  setHistory]  = useState([{ from:'bot', text:QUESTIONS[0].prompt }]);
  const [step,     setStep]     = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [input,    setInput]    = useState('');
  const [busy,     setBusy]     = useState(false);
  const [done,     setDone]     = useState(false);
  const [multiSel, setMultiSel] = useState([]);
  const scrollerRef = useRef(null);
  const priceRef    = useRef(null);

  const cur = QUESTIONS[step];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const last = history[history.length - 1];
    if (last?.type === 'price' && priceRef.current) {
      el.scrollTop = priceRef.current.offsetTop;
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }, [history, busy]);

  const sendUser = (val) => {
    if (!val || busy || done) return;
    const updated = { ...answers, [cur.key]: val };
    setAnswers(updated);
    setHistory(h => [...h, { from:'user', text:val }]);
    setInput('');
    setMultiSel([]);
    setBusy(true);

    setTimeout(() => {
      const nextStep = step + 1;
      if (nextStep < QUESTIONS.length) {
        setHistory(h => [...h, { from:'bot', text:QUESTIONS[nextStep].prompt }]);
        setStep(nextStep);
        setBusy(false);
      } else {
        setHistory(h => [...h, { from:'bot', type:'price', answers:updated }]);
        setBusy(false);
        setDone(true);
      }
    }, 650);
  };

  const reset = () => {
    setHistory([{ from:'bot', text:QUESTIONS[0].prompt }]);
    setAnswers({}); setStep(0); setDone(false); setInput('');
  };

  const isCalendar   = !done && !busy && cur?.type === 'calendar';
  const isMulti      = !done && !busy && cur?.type === 'multiselect';
  const showChips    = !done && !busy && cur?.chips && !isMulti;

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

      {/* Chat body */}
      <div ref={scrollerRef} style={{ flex:1, overflowY:'auto', padding:'18px 18px 8px', background:'var(--ars-cream)' }}>
        {history.map((m,i) => {
          if (m.type==='price') {
            return (
              <div key={i} ref={priceRef} style={{ display:'flex', justifyContent:'flex-start', marginBottom:10 }}>
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

        {showChips && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:4, marginBottom:4 }}>
            {cur.chips.map(c => <button key={c} className="cqa-chip" onClick={() => sendUser(c)}>{c}</button>)}
          </div>
        )}

        {isMulti && (
          <MultiSelectChips
            items={cur.chips}
            selected={multiSel}
            onToggle={item => {
              if (item === 'None of these') { sendUser('None'); return; }
              setMultiSel(prev =>
                prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
              );
            }}
          />
        )}

        {isCalendar && (
          <div style={{ display:'flex', justifyContent:'flex-start', marginBottom:10 }}>
            <div style={{ borderRadius:'4px 16px 16px 16px', overflow:'hidden', border:'1px solid var(--border)', background:'#fff', boxShadow:'0 1px 2px rgba(32,30,31,.04)', minWidth:240 }}>
              <MiniCalendar onSelect={d => sendUser(fmtDate(d))}/>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={e => { e.preventDefault(); sendUser(input.trim()); }}
        style={{ padding:14, background:'#fff', borderTop:'1px solid var(--border)', display:'flex', gap:8 }}
      >
        {!done ? (
          <>
            {cur?.key === 'from' || cur?.key === 'to' ? (
              <>
                <AddressInput
                  value={input}
                  onChange={setInput}
                  placeholder={cur.placeholder}
                  disabled={busy}
                  onSubmit={() => sendUser(input.trim())}
                />
                <button type="submit" className="btn btn--primary" disabled={busy||!input.trim()}
                  style={{ padding:'0 16px', flex:'0 0 auto' }} aria-label="Send">
                  <Icon name="send" size={16}/>
                </button>
              </>
            ) : (
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={
                  isCalendar ? 'or type a date, e.g. June 14' :
                  isMulti    ? 'Select items above, then click Confirm' :
                  cur && !cur.chips ? cur.placeholder : 'Pick one above, or type…'
                }
                disabled={busy || isMulti}
                style={{
                  flex:1, padding:'12px 14px', fontSize:15,
                  background:'var(--ars-cream)', border:'1px solid var(--border-strong)',
                  borderRadius:'var(--r-md)', fontFamily:'var(--font-sans)',
                  color:'var(--ars-deep-navy)', outline:'none', minWidth:0,
                  transition:'border-color 150ms var(--ease), box-shadow 150ms var(--ease)',
                  opacity: isMulti ? 0.5 : 1,
                }}
                onFocus={e=>{e.target.style.borderColor='var(--ars-cyan)';e.target.style.boxShadow='var(--focus-ring)';}}
                onBlur={e=>{e.target.style.borderColor='var(--border-strong)';e.target.style.boxShadow='none';}}
              />
            )}
            {!(cur?.key === 'from' || cur?.key === 'to') && (
              <button type="button" className="btn btn--primary"
                disabled={busy || (isMulti ? multiSel.length === 0 : !input.trim())}
                style={{ padding:'0 16px', flex:'0 0 auto' }} aria-label="Send"
                onClick={() => isMulti ? sendUser(multiSel.join(', ')) : sendUser(input.trim())}
              >
                <Icon name="send" size={16}/>
              </button>
            )}
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
