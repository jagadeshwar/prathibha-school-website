import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NAV, STATS, PROGRAMS, ABOUT_POINTS, FACULTY, NEWS, BRANCHES } from './data.js'

// Helper for files in /public — swap these out for real photos later.
const asset = (p) => `${import.meta.env.BASE_URL}${p}`

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] },
  }),
}

function Reveal({ children, i = 0, className, as = 'div' }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      variants={reveal}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </M>
  )
}

/* A soft, on-brand illustrated panel used in place of photos */
function Crest({ hue = 'var(--accent-1)', label }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center',
      background: `radial-gradient(120% 120% at 30% 20%, color-mix(in srgb, ${hue} 33%, transparent), transparent 60%),
                   linear-gradient(160deg, var(--crest-from), var(--crest-to))` }}>
      <svg width="46%" viewBox="0 0 64 64" fill="none" aria-hidden>
        <path d="M32 8 6 21l26 13 20-10v15h4V21z" fill={hue} />
        <path d="M14 31v12c0 5 8 9 18 9s18-4 18-9V31l-18 9z" fill={hue} opacity=".7" />
      </svg>
      {label && <span style={{ position: 'absolute', bottom: 14, fontSize: '.72rem', letterSpacing: '.18em',
        textTransform: 'uppercase', color: 'var(--crest-label)', fontWeight: 600 }}>{label}</span>}
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand">
          <span className="crest">P</span> Prathibha
        </a>
        <div className="nav-links" style={open ? { display: 'flex' } : undefined}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
          <a href="#contact" className="btn btn-primary nav-cta">Apply Now</a>
        </div>
        <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Menu">☰</button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header id="top" className="hero">
      <div className="container hero-grid">
        <div>
          <Reveal i={0}><span className="eyebrow">Established 2011 · A Tradition of Excellence</span></Reveal>
          <motion.h1 variants={reveal} custom={1} initial="hidden" animate="show">
            Where bright minds<br />
            grow into <span className="shine">leaders</span>.
          </motion.h1>
          <motion.p className="lead" variants={reveal} custom={2} initial="hidden" animate="show">
            Prathibha High School blends timeless values with a forward-looking education
            across our Narva and Marikal branches — nurturing curious, kind, and confident
            young people.
          </motion.p>
          <motion.div className="hero-actions" variants={reveal} custom={3} initial="hidden" animate="show">
            <a href="#contact" className="btn btn-primary">Begin Your Application →</a>
            <a href="#about" className="btn btn-ghost">Take a Tour</a>
          </motion.div>
          <motion.div className="hero-stats" variants={reveal} custom={4} initial="hidden" animate="show">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <div className="num">{s.num}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div className="hero-visual"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}>
          <div className="hero-card"><img src={asset('images/classroom.svg')} alt="Prathibha High School classroom" /></div>
          <motion.div className="hero-badge"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
            <span className="ring">★</span>
            <div>
              <div className="t1">Top 1% Nationally</div>
              <div className="t2">Academic ranking 2026</div>
            </div>
          </motion.div>
          <motion.div className="hero-float"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}>
            <span className="dot" /> Admissions open for 2026–27
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}

function About() {
  return (
    <section id="about" className="about">
      <div className="container about-grid">
        <Reveal className="about-img-wrap">
          <div className="about-img"><img src={asset('images/teaching.svg')} alt="A teacher leading a lesson at Prathibha High School" /></div>
          <span className="about-accent" />
        </Reveal>
        <div>
          <Reveal i={0}><span className="eyebrow">Our Philosophy</span></Reveal>
          <Reveal i={1}><h2 className="section-title">An education that shapes the whole child.</h2></Reveal>
          <Reveal i={2}>
            <p className="section-lead">
              Since 2011, Prathibha High School has believed that academic brilliance and good
              character belong together. Across our Narva and Marikal branches, we teach students
              not only what to think, but how to lead with integrity.
            </p>
          </Reveal>
          <Reveal i={3}>
            <ul className="points">
              {ABOUT_POINTS.map((p) => (
                <li key={p}><span className="chk">✓</span><span>{p}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Academics() {
  return (
    <section id="academics">
      <div className="container">
        <div className="head-block">
          <Reveal i={0}><span className="eyebrow">Academics</span></Reveal>
          <Reveal i={1}><h2 className="section-title">Programs that spark a lifelong love of learning.</h2></Reveal>
          <Reveal i={2}><p className="section-lead" style={{ margin: '1rem auto 0' }}>
            A broad, balanced curriculum where every student finds their passion and the support to pursue it.
          </p></Reveal>
        </div>
        <div className="grid grid-3">
          {PROGRAMS.map((p, i) => (
            <Reveal i={i % 3} key={p.title} className="card">
              <div className="ic">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Branches() {
  return (
    <section id="branches" className="about">
      <div className="container">
        <div className="head-block">
          <Reveal i={0}><span className="eyebrow">Our Campuses</span></Reveal>
          <Reveal i={1}><h2 className="section-title">Two branches, one Prathibha family.</h2></Reveal>
          <Reveal i={2}><p className="section-lead" style={{ margin: '1rem auto 0' }}>
            The same trusted education and values, now closer to home — in both Narva and Marikal.
          </p></Reveal>
        </div>
        <div className="grid grid-2">
          {BRANCHES.map((b, i) => (
            <Reveal i={i} key={b.name} className="branch-card">
              <div className="branch-visual"><Crest hue={b.hue} label={b.tagline} /></div>
              <div className="branch-body">
                <h3>{b.name}</h3>
                <p>{b.text}</p>
                <div className="branch-meta">
                  <span>📍 {b.address}</span>
                  <span>📞 {b.phone}</span>
                </div>
                {b.maps && (
                  <a className="branch-map" href={b.maps} target="_blank" rel="noopener noreferrer">
                    🗺️ View on Google Maps →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faculty() {
  return (
    <section id="faculty">
      <div className="container">
        <div className="head-block">
          <Reveal i={0}><span className="eyebrow">Our People</span></Reveal>
          <Reveal i={1}><h2 className="section-title">Mentors who inspire.</h2></Reveal>
          <Reveal i={2}><p className="section-lead" style={{ margin: '1rem auto 0' }}>
            Our teachers come from Kerala, Odisha, and states across India — bringing a rich
            blend of cultures, languages, and teaching traditions to every classroom.
          </p></Reveal>
        </div>
        <div className="grid grid-4">
          {FACULTY.map((f, i) => (
            <Reveal i={i} key={i} className="person">
              <div className="avatar"><Crest hue={f.hue} /></div>
              <h4>{f.name}</h4>
              <span>{f.role}</span>
              <div className="person-state">📍 {f.state}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Admissions() {
  return (
    <section id="admissions">
      <div className="container">
        <Reveal className="band">
          <span className="eyebrow">Admissions 2026</span>
          <h2>Your child’s next chapter starts here.</h2>
          <p>Admissions for the 2026–27 academic year are now open at both our Narva and Marikal
            branches. Visit our campus, meet our faculty, and discover the Prathibha difference
            for yourself.</p>
          <a href="#contact" className="btn btn-primary">Schedule a Visit →</a>
        </Reveal>
      </div>
    </section>
  )
}

function Gallery() {
  const tiles = [
    { img: 'images/sports.svg', label: 'Sports & Games', cls: 'wide tall' },
    { img: 'images/lab.svg', label: 'Science Lab', cls: '' },
    { img: 'images/classroom.svg', label: 'Classroom Learning', cls: '' },
    { img: 'images/teaching.svg', label: 'Our Teachers', cls: 'tall' },
    { img: 'images/library.svg', label: 'Library & Reading', cls: '' },
    { img: 'images/arts.svg', label: 'Arts & Music', cls: 'wide' },
  ]
  return (
    <section id="gallery">
      <div className="container">
        <div className="head-block">
          <Reveal i={0}><span className="eyebrow">Campus Life</span></Reveal>
          <Reveal i={1}><h2 className="section-title">A place to belong.</h2></Reveal>
        </div>
        <Reveal>
          <div className="gallery-grid">
            {tiles.map((t, i) => (
              <figure key={i} className={t.cls}>
                <img src={asset(t.img)} alt={t.label} loading="lazy" />
                <figcaption>{t.label}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function News() {
  return (
    <section id="news" className="about">
      <div className="container">
        <div className="head-block">
          <Reveal i={0}><span className="eyebrow">Latest News</span></Reveal>
          <Reveal i={1}><h2 className="section-title">What’s happening at Prathibha.</h2></Reveal>
        </div>
        <div className="grid grid-3">
          {NEWS.map((n, i) => (
            <Reveal i={i} key={n.title} className="news-card">
              <div className="thumb"><Crest hue={n.hue} /></div>
              <div className="body">
                <span className="date">{n.date}</span>
                <h4>{n.title}</h4>
                <p>{n.text}</p>
                <a className="more" href="#news">Read more →</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <section id="contact" className="contact">
      <div className="container contact-grid">
        <div className="contact-info">
          <Reveal i={0}><span className="eyebrow">Get in Touch</span></Reveal>
          <Reveal i={1}><h2 className="section-title">We’d love to hear from you.</h2></Reveal>
          <Reveal i={2}><p className="section-lead">Have a question about admissions, programs, or campus visits? Reach out and our team will respond within one business day.</p></Reveal>
          <Reveal i={3}>
            <div className="row"><span className="ic">📍</span><div><div className="t1">Narva Branch</div><div className="t2">Narva (Village &amp; Mandal), Narayanpet District, Telangana – 509130</div></div></div>
            <div className="row"><span className="ic">📍</span><div><div className="t1">Marikal Branch</div><div className="t2">Marikal (Village &amp; Mandal), Narayanpet District, Telangana – 509105</div></div></div>
            <div className="row"><span className="ic">📞</span><div><div className="t1">Call Us</div><div className="t2">+91 99599 03776</div></div></div>
          </Reveal>
        </div>
        <Reveal i={1}>
          <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
            <div className="field"><label>Parent / Guardian Name</label><input required placeholder="Jane Doe" /></div>
            <div className="field"><label>Email Address</label><input type="email" required placeholder="jane@email.com" /></div>
            <div className="field"><label>Student’s Grade of Interest</label><input placeholder="e.g. Grade 6" /></div>
            <div className="field"><label>Message</label><textarea placeholder="Tell us a little about your child…" /></div>
            <button className="btn btn-primary" type="submit">Send Inquiry →</button>
            {sent && <div className="sent">Thank you! We’ll be in touch shortly. 🎓</div>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand"><span className="crest">P</span> Prathibha High School</div>
            <p className="desc">Cultivating curious minds and kind hearts across our Narva and Marikal branches.</p>
          </div>
          <div>
            <h5>Explore</h5>
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </div>
          <div>
            <h5>Admissions</h5>
            <a href="#contact">Apply Now</a>
            <a href="#contact">Book a Tour</a>
            <a href="#admissions">Tuition & Aid</a>
            <a href="#news">Open House</a>
          </div>
          <div>
            <h5>Connect</h5>
            <a href="#contact">Instagram</a>
            <a href="#contact">Facebook</a>
            <a href="#contact">Newsletter</a>
            <a href="#contact">Careers</a>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Prathibha High School · Narva & Marikal branches.</div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Academics />
      <Branches />
      <Faculty />
      <Admissions />
      <Gallery />
      <News />
      <Contact />
      <Footer />
    </>
  )
}
