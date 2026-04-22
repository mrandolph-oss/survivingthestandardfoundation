import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: FoundationSite,
})

// ─── Types ───────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string
  name: string
  lastName: string
  title: string
  bio: string
  photo: string | null
  isOpen?: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface FounderInfo {
  email: string
}

const FOUNDER_EMAILS: Record<string, FounderInfo> = {
  randolph: { email: 'Mrandolph@survivingthestandard.com' },
  brooks: { email: 'Cbrooks@survivingthestandard.com' },
  forbes: { email: 'Sforbes@survivingthestandard.com' },
  alves: { email: 'Lalves@survivingthestandard.com' },
  scott: { email: 'Ascott@survivingthestandard.com' },
  blansit: { email: 'Eblansit@survivingthestandard.com' },
  bosch: { email: 'KBosch@survivingthestandard.com' },
}

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'randolph',
    name: 'M. Randolph',
    lastName: '',
    title: 'CEO / Founder',
    bio: 'As CEO and Founder of the Surviving The Standard Foundation, M. Randolph leads the strategic vision connecting aspiring public safety professionals with life-changing scholarship opportunities. Inspired by personal experience navigating the financial and institutional challenges of pursuing a career in law enforcement—chronicled in Earned: Born for the Badge—Randolph created this foundation to ensure that financial barriers never stand between a calling and a career. With a deep commitment to service and equity, Randolph drives every initiative forward with purpose and passion.',
    photo: '/team/randolph.png',
  },
  {
    id: 'brooks',
    name: 'C. Brooks',
    lastName: '',
    title: 'Chief Operating Officer',
    bio: 'C. Brooks oversees the day-to-day operations of the Foundation, ensuring that scholarship programs run smoothly and that every applicant receives a fair, thorough review. With operational discipline and a servant-leader mindset, Brooks brings structure and accountability to every initiative the Foundation undertakes, keeping the mission on track and moving forward.',
    photo: '/team/brooks.jpg',
  },
  {
    id: 'forbes',
    name: 'S. Forbes',
    lastName: '',
    title: 'Director of Author Services & Speaking',
    bio: 'S. Forbes leads the Foundation\'s literary and speaking outreach programs, connecting scholarship recipients and the broader community with mentorship, publishing guidance, and professional development resources. Forbes believes that supporting students\' voices—in writing and in service—is central to the Foundation\'s mission of empowering future public safety professionals.',
    photo: '/team/forbes.png',
  },
  {
    id: 'alves',
    name: 'L. Alves',
    lastName: '',
    title: 'Director of Social Media & Marketing with Community Relations',
    bio: 'L. Alves shapes how the world sees the Surviving The Standard Foundation—amplifying stories of scholarship recipients, building community partnerships, and crafting campaigns that inspire donors and applicants alike. With a background in communications and nonprofit storytelling, Alves ensures the Foundation\'s message reaches those who need it most and strengthens ties with the communities we serve.',
    photo: '/team/placeholder.png',
  },
  {
    id: 'scott',
    name: 'A. Scott',
    lastName: '',
    title: 'Director of Events and Programming',
    bio: 'A. Scott designs and executes the Foundation\'s signature events—from annual scholarship galas to community outreach workshops. Each event is crafted to celebrate recipients, cultivate donor relationships, and raise visibility for public safety education and the Foundation\'s mission across the region.',
    photo: '/team/placeholder.png',
  },
  {
    id: 'blansit',
    name: 'E. Blansit',
    lastName: '',
    title: 'Executive Administrator',
    bio: 'E. Blansit is the operational backbone of the Foundation, managing administrative systems, donor records, and communications that keep every program running with precision. With exceptional organizational skills and genuine warmth, Blansit ensures that every interaction with the Foundation feels personal and purposeful.',
    photo: '/team/placeholder.png',
  },
  {
    id: 'bosch',
    name: 'K. Bosch',
    lastName: '',
    title: 'Financial & Fiscal Management',
    bio: 'K. Bosch leads the financial and fiscal management efforts of the Surviving The Standard Foundation, ensuring that every dollar donated is allocated responsibly and transparently. With a strong background in financial stewardship, Bosch provides the fiscal discipline and strategic oversight that keeps the Foundation accountable to its donors and mission.',
    photo: '/team/placeholder.png',
  },
]

const STORAGE_KEY = 'stsf_team_profiles'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadTeam(): TeamMember[] {
  if (typeof window === 'undefined') return DEFAULT_TEAM
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return DEFAULT_TEAM
    const parsed = JSON.parse(stored) as TeamMember[]
    return DEFAULT_TEAM.map((d) => {
      const found = parsed.find((p) => p.id === d.id)
      return found ? { ...d, ...found } : d
    })
  } catch {
    return DEFAULT_TEAM
  }
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconShield() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}

function IconHeart() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

function IconStar() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9fa8da" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

// ─── Components ───────────────────────────────────────────────────────────────

function NavBar({ onNavClick }: { onNavClick: (id: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { id: 'mission', label: 'Mission' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'donors', label: 'Donors' },
    { id: 'leadership', label: 'Founders' },
    { id: 'newsletter', label: 'Community' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleClick = (id: string) => {
    setMobileOpen(false)
    onNavClick(id)
  }

  return (
    <>
      <nav className="nav-sticky" aria-label="Main navigation">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo / Name */}
          <button
            onClick={() => onNavClick('hero')}
            aria-label="Surviving The Standard Foundation - Go to top"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: 0 }}
          >
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(201,168,76,0.2)',
              border: '2px solid rgba(201,168,76,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(201,168,76,0.3)" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: '1.15rem', color: 'white', whiteSpace: 'nowrap', lineHeight: 1.2, letterSpacing: '0.01em' }}>
              Surviving The Standard<br />
              <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'rgba(201,168,76,0.75)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: "'EB Garamond', Georgia, serif" }}>Foundation</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="nav-links-desktop" style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
            {links.map((l) => (
              <button
                key={l.id}
                className="nav-link"
                onClick={() => handleClick(l.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {l.label}
              </button>
            ))}
            <a href="mailto:apply@survivingthestandard.com" className="btn-gold btn-sm" style={{ marginLeft: '0.5rem', borderRadius: '1px', textDecoration: 'none', display: 'inline-block', padding: '0.45rem 1.1rem', fontFamily: "'EB Garamond', serif", fontSize: '0.88rem', letterSpacing: '0.06em', fontWeight: 600, color: '#0d1257', background: '#c9a84c', transition: 'background 0.2s' }}>
              Apply Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
          >
            <IconMenu />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Navigation menu">
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <IconClose />
          </button>
          {links.map((l) => (
            <button
              key={l.id}
              className="mobile-nav-link"
              onClick={() => handleClick(l.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {l.label}
            </button>
          ))}
          <a href="mailto:apply@survivingthestandard.com" className="btn-gold" style={{ marginTop: '0.5rem', textDecoration: 'none', borderRadius: '1px' }}>
            Apply Now
          </a>
        </div>
      )}
    </>
  )
}

function HeroSection() {
  return (
    <section id="hero" className="hero-bg" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      {/* Blended photograph overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.18,
        mixBlendMode: 'luminosity',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, rgba(13,18,87,0.92) 0%, rgba(26,35,126,0.85) 40%, rgba(40,53,147,0.8) 100%)',
      }} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.6)' }} />
            <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '0.8rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.85)' }}>
              Public Safety Scholarship Fund
            </span>
          </div>

          <h1 className="reveal" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: 'white', lineHeight: 1.05, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
            Surviving<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>The Standard.</em>
          </h1>

          <div style={{ width: '64px', height: '3px', background: 'linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.3))', margin: '1.5rem 0' }} />

          <p className="reveal reveal-delay-1" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, margin: '0 0 1.25rem', maxWidth: '560px', fontWeight: 300 }}>
            Surviving The Standard Foundation exists to support individuals pursuing careers in public safety. Our mission is to provide scholarships to those entering law enforcement, fire rescue, EMS, corrections, and other public safety professions.
          </p>
          <p className="reveal reveal-delay-1" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 2.5rem', maxWidth: '560px', fontWeight: 300 }}>
            Through community support, corporate sponsorships, and donations, we are committed to investing in the next generation of public safety professionals. Together, we can support those who serve.
          </p>

          <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="mailto:apply@survivingthestandard.com" className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.9rem 2.25rem', background: 'white', color: '#1a237e', fontWeight: 600 }}>
              Apply for a Scholarship
            </a>
            <a href="https://www.zeffy.com/en-US/donation-form/surviving-the-standard-public-safety-scholarship-fund" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '1.05rem', padding: '0.9rem 2.25rem' }}>
              Support Our Mission
            </a>
          </div>

          {/* Book reference */}
          <div className="reveal reveal-delay-3" style={{ marginTop: '3rem', padding: '1.25rem 1.5rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px', maxWidth: '480px' }}>
            <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', display: 'block', marginBottom: '0.4rem' }}>Built on the foundation of</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'white', fontWeight: 700, fontStyle: 'italic' }}>
              EARNED: Born for the Badge
            </span>
            <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', marginLeft: '0.5rem', fontWeight: 300 }}>
              by Malachi Alexander-Randolph
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem'
      }}>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))', animation: 'revealUp 2s ease infinite' }} />
      </div>
    </section>
  )
}

function MissionSection() {
  const cards = [
    {
      icon: <IconStar />,
      title: 'Scholarships',
      desc: 'We provide direct financial assistance to individuals committed to serving their communities, covering academy tuition, training equipment, uniforms, certification fees, and education expenses.',
      accent: '#1a237e',
    },
    {
      icon: <IconShield />,
      title: 'Public Safety',
      desc: 'From law enforcement to fire rescue, EMS to corrections—we support the full spectrum of public safety disciplines. Our scholarships help remove the financial barriers that stand between aspiring professionals and their calling.',
      accent: '#283593',
    },
    {
      icon: <IconHeart />,
      title: 'Community',
      desc: 'Through community partnerships, corporate sponsorships, and individual donations, we are committed to investing in the next generation of public safety professionals who protect and serve their communities.',
      accent: '#3949ab',
    },
    {
      icon: <IconGlobe />,
      title: 'Inspired by Service',
      desc: 'This foundation is rooted in the experiences shared in Earned: Born for the Badge by Malachi Alexander-Randolph, a memoir highlighting the personal, financial, and institutional challenges faced while pursuing a career in law enforcement.',
      accent: '#1a237e',
    },
  ]

  return (
    <section id="mission" style={{ padding: '6rem 1.5rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">Who We Are</span>
          <div className="section-divider" />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--navy)', margin: '0 0 1rem', lineHeight: 1.1 }}>
            Our Mission
          </h2>
          <div style={{ maxWidth: '720px' }}>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1rem' }}>
              Surviving The Standard Foundation is dedicated to supporting individuals pursuing careers in public safety. Our mission is to provide scholarship opportunities to those entering law enforcement, fire rescue, EMS, corrections, and related fields.
            </p>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1rem' }}>
              Many aspiring public safety professionals encounter financial barriers when pursuing academy training, certifications, and higher education. The Foundation seeks to reduce these obstacles by offering direct financial assistance to individuals committed to serving their communities.
            </p>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1rem' }}>
              The mission behind this initiative is rooted in the experiences shared in <em style={{ color: 'var(--navy)' }}>Earned: Born for the Badge</em> by Malachi Alexander-Randolph. The memoir highlights the personal, financial, and institutional challenges faced while pursuing a career in law enforcement, ultimately inspiring the creation of this foundation to support others navigating similar paths.
            </p>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>
              We are currently accepting contributions to fund the inaugural Surviving The Standard Public Safety Scholarship. Every donation directly supports individuals who are committed to protecting and serving their communities. Together, we can invest in those who answer the call to serve.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {cards.map((card, i) => (
            <div key={card.title} className="mission-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ color: card.accent, marginBottom: '1.25rem', opacity: 0.8 }}>{card.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: 'var(--navy)', margin: '0 0 0.75rem' }}>{card.title}</h3>
              <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.75, margin: 0, fontWeight: 300 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScholarshipSection() {
  const eligibility = [
    'Pursuing a career in public safety',
    'Accepted into training, academy, or education program',
    'Demonstrated financial need',
    'Essay submission required',
  ]

  const fundUses = [
    'Academy tuition',
    'Training equipment',
    'Uniforms',
    'Certification fees',
    'Education expenses',
  ]

  const questions = [
    {
      q: 'Tell us about your academic and professional background.',
      detail: 'Include your current enrollment status, GPA, relevant coursework, certifications, and any work or volunteer experience in public safety.',
    },
    {
      q: 'What drew you to public safety as a career?',
      detail: 'Describe the moment, experience, or person that set you on this path. We want to understand the story behind your choice—not just the career goal.',
    },
    {
      q: 'How has financial hardship affected your educational journey?',
      detail: 'Be candid about the challenges you have faced. Describe how financial barriers have shaped your path and what receiving this scholarship would mean for your ability to continue.',
    },
    {
      q: 'Describe your vision for the community you intend to serve.',
      detail: 'Where do you see yourself in five years? What community—geographic, professional, or otherwise—do you intend to serve, and how does your education prepare you for that role?',
    },
  ]

  return (
    <section id="scholarships" style={{ padding: '6rem 1.5rem', background: 'white' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-label">Apply</span>
          <div className="section-divider" />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--navy)', margin: '0 0 1rem', lineHeight: 1.1 }}>
            Surviving The Standard Public Safety Scholarship
          </h2>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: '1rem' }}>
            The Surviving The Standard Foundation provides scholarships to individuals pursuing careers in public safety. This scholarship is designed to assist applicants entering law enforcement, fire rescue, EMS, corrections, dispatch, or related public safety fields.
          </p>
        </div>

        {/* Award & Eligibility */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {/* Award Amount */}
          <div style={{ background: '#f0f2ff', border: '1px solid #c5cae9', borderTop: '4px solid var(--navy)', padding: '1.75rem', borderRadius: '2px' }}>
            <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.7 }}>Award Amount</span>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy)', margin: '0.5rem 0' }}>$500 – $1,000</div>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, fontWeight: 300 }}>per recipient</p>
          </div>

          {/* Eligibility */}
          <div style={{ background: '#f0f2ff', border: '1px solid #c5cae9', borderTop: '4px solid var(--gold)', padding: '1.75rem', borderRadius: '2px' }}>
            <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.7 }}>Eligibility</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {eligibility.map((item) => (
                <li key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: 'var(--text-dark)', lineHeight: 1.5, fontWeight: 300 }}>
                  <span style={{ color: 'var(--gold)', flexShrink: 0, paddingTop: '2px' }}><IconCheck /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Funds May Be Used For */}
          <div style={{ background: '#f0f2ff', border: '1px solid #c5cae9', borderTop: '4px solid #283593', padding: '1.75rem', borderRadius: '2px' }}>
            <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.7 }}>Funds May Be Used For</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {fundUses.map((item) => (
                <li key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: 'var(--text-dark)', lineHeight: 1.5, fontWeight: 300 }}>
                  <span style={{ color: '#283593', flexShrink: 0, paddingTop: '2px' }}><IconCheck /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Application Instructions */}
        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: '2rem' }}>
          Applications are reviewed on a rolling basis. Submit your responses and essay to <strong style={{ color: 'var(--navy)' }}>apply@survivingthestandard.com</strong> with the subject line <em>"Scholarship Application — [Your Full Name]."</em>
        </p>

        {/* Questions */}
        <div style={{ marginBottom: '3rem' }}>
          {questions.map((item, i) => (
            <div key={i} className="question-item">
              <span className="question-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--navy)', margin: '0 0 0.4rem' }}>{item.q}</h4>
                <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.7, fontWeight: 300 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Essay prompt */}
        <div style={{ background: '#f0f2ff', border: '1px solid #c5cae9', borderLeft: '4px solid var(--navy)', padding: '2rem 2rem 2rem 1.75rem', borderRadius: '2px', marginBottom: '2.5rem' }}>
          <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--navy)', opacity: 0.7 }}>Essay Prompt</span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: 'var(--navy)', margin: '0.5rem 0 0.75rem' }}>
            What does it mean to survive the standard?
          </h3>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.97rem', color: 'var(--text-muted)', lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
            Reflect on a challenge—personal, professional, or academic—that required you to push beyond what was expected. What did you overcome, what did you learn, and how does that experience shape the professional and community member you are becoming?
          </p>
          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.82rem', color: 'var(--navy)', opacity: 0.65 }}>
              No AI-generated content. No minimum or maximum word count. Write what is true.
            </span>
          </div>
        </div>

        <a href="mailto:apply@survivingthestandard.com" className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.9rem 2.25rem', textDecoration: 'none' }}>
          Submit Your Application
        </a>
      </div>
    </section>
  )
}

function DonorSection() {
  const tiers = [
    {
      cls: 'tier-bronze',
      badge: 'badge-bronze',
      label: 'Bronze',
      range: '$0 – $500',
      perks: [
        'Receive a thank you letter from the leadership team',
        'Shoutout on our social media page',
        'Mentioned in a podcast',
      ],
      metal: '#a0765a',
      cta: 'Become a Bronze Supporter',
    },
    {
      cls: 'tier-silver',
      badge: 'badge-silver',
      label: 'Silver',
      range: '$501 – $1,500',
      perks: [
        'Receive a thank you letter',
        'Shoutout on social media',
        'Logo issued on the scholarship check',
      ],
      metal: '#8e9eab',
      cta: 'Become a Silver Supporter',
    },
    {
      cls: 'tier-gold',
      badge: 'badge-gold',
      label: 'Gold',
      range: '$1,501 – $5,000+',
      perks: [
        'Donor Founder designation',
        'Permanent emblem/logo branding',
        'Social media recognition',
        'Invitation to our annual Founding Donor recognition event',
        'Permanent recognition on our website and materials',
        'Direct updates from foundation leadership',
        'Lifetime sponsorship through our foundation',
      ],
      metal: '#c9a84c',
      cta: 'Become a Founding Donor',
    },
  ]

  return (
    <section id="donors" style={{ padding: '6rem 1.5rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">Give</span>
          <div className="section-divider" />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--navy)', margin: '0 0 1rem', lineHeight: 1.1 }}>
            Support Future Public Safety Professionals
          </h2>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '620px', lineHeight: 1.75, fontWeight: 300 }}>
            Your donation to Surviving The Standard Foundation directly funds scholarships for individuals pursuing careers in public safety. Every contribution helps remove financial barriers for those committed to serving their communities.
          </p>
        </div>

        {/* Donation Options */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {['One-time donation', 'Monthly supporter', 'Corporate sponsorship', 'Scholarship sponsor'].map((opt) => (
              <span key={opt} style={{
                fontFamily: "'EB Garamond', serif", fontSize: '0.9rem', padding: '0.5rem 1.25rem',
                border: '1px solid var(--border-light)', borderRadius: '2px', color: 'var(--navy)',
                background: 'white', letterSpacing: '0.04em'
              }}>
                {opt}
              </span>
            ))}
          </div>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300 }}>
            All donations go toward funding scholarships, supporting applicants, and expanding opportunities for future public safety professionals. Help us fund the next generation of public safety leaders.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {tiers.map((tier) => (
            <div key={tier.label} className={tier.cls} style={{ borderRadius: '2px', padding: '2.25rem 2rem' }}>
              <span className={`tier-badge ${tier.badge}`}>{tier.label}</span>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: tier.metal, marginBottom: '0.25rem', letterSpacing: '-0.01em' }}>
                {tier.range}
              </div>
              <div style={{ width: '40px', height: '2px', background: tier.metal, opacity: 0.4, margin: '1rem 0 1.5rem' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {tier.perks.map((p) => (
                  <li key={p} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', fontFamily: "'Source Serif 4', serif", fontSize: '0.92rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.55, fontWeight: 300 }}>
                    <span style={{ color: tier.metal, flexShrink: 0, paddingTop: '2px' }}><IconCheck /></span>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="https://www.zeffy.com/en-US/donation-form/surviving-the-standard-public-safety-scholarship-fund"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block', textDecoration: 'none',
                  padding: '0.7rem 1.5rem', border: `1.5px solid ${tier.metal}`,
                  color: tier.metal, fontFamily: "'EB Garamond', serif",
                  fontSize: '0.88rem', letterSpacing: '0.08em',
                  transition: 'background 0.2s', borderRadius: '1px',
                }}
                onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.background = 'transparent' }}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LeadershipSection({ team, onCardClick }: { team: TeamMember[], onCardClick: (m: TeamMember) => void }) {
  return (
    <section id="leadership" style={{ padding: '6rem 1.5rem', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">Our People</span>
          <div className="section-divider" />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--navy)', margin: '0 0 1rem', lineHeight: 1.1 }}>
            Founders
          </h2>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '520px', lineHeight: 1.75, fontWeight: 300 }}>
            The leadership team behind the Surviving The Standard Foundation. Click any card to learn more.
          </p>
        </div>

        {/* Team grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {team.map((member) => {
            const founderInfo = FOUNDER_EMAILS[member.id]
            return (
              <div key={member.id} className="team-card" onClick={() => onCardClick(member)} role="button" tabIndex={0} aria-label={`View bio of ${member.name}, ${member.title}`} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCardClick(member) } }}>
                {/* Photo */}
                {member.photo ? (
                  <img src={member.photo} alt={`Photo of ${member.name}`} className="team-avatar" />
                ) : (
                  <div className="team-avatar-placeholder" aria-hidden="true">
                    <IconUser />
                  </div>
                )}
                {/* Info */}
                <div style={{ padding: '1rem 1.1rem 1.25rem' }}>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--navy)', margin: '0 0 0.2rem' }}>{member.name}</h4>
                  <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 0.35rem', letterSpacing: '0.02em', lineHeight: 1.4 }}>{member.title}</p>
                  {founderInfo && (
                    <a href={`mailto:${founderInfo.email}`} style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.75rem', color: 'var(--gold)', textDecoration: 'none', letterSpacing: '0.02em', display: 'block', marginBottom: '0.35rem' }}
                      onClick={(e) => e.stopPropagation()}>
                      {founderInfo.email}
                    </a>
                  )}
                  <span className="card-reveal">View bio →</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function BioModal({ member, onClose }: { member: TeamMember, onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const founderInfo = FOUNDER_EMAILS[member.id]

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Biography of ${member.name}`} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-content">
        {/* Header */}
        <div style={{ background: 'var(--navy)', padding: '2rem 2rem 1.5rem', position: 'relative' }}>
          <button
            onClick={onClose}
            aria-label="Close biography"
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <IconClose />
          </button>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            {member.photo ? (
              <img src={member.photo} alt={member.name} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(201,168,76,0.4)', flexShrink: 0 }} />
            ) : (
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(201,168,76,0.3)' }}>
                <IconUser />
              </div>
            )}
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'white', margin: '0 0 0.25rem', fontWeight: 700 }}>{member.name}</h3>
              <p style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.88rem', color: 'rgba(201,168,76,0.85)', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{member.title}</p>
              {founderInfo && (
                <a href={`mailto:${founderInfo.email}`} style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', marginTop: '0.25rem', display: 'inline-block' }}>
                  {founderInfo.email}
                </a>
              )}
            </div>
          </div>
        </div>
        {/* Body */}
        <div style={{ padding: '2rem' }}>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1rem', color: 'var(--text-dark)', lineHeight: 1.85, margin: 0, fontWeight: 300 }}>
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  )
}

function NewsletterSection() {
  return (
    <section id="newsletter" style={{ padding: '6rem 1.5rem', background: 'white' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label">Community</span>
          <div className="section-divider" />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--navy)', margin: '0 0 1rem', lineHeight: 1.1 }}>
            Community Updates
          </h2>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '620px', lineHeight: 1.75, fontWeight: 300 }}>
            Highlighting our generous donors and scholarship recipients who are making a difference in public safety.
          </p>
        </div>

        <div style={{ padding: '3rem 2rem', background: 'var(--cream)', borderRadius: '2px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.5rem', color: 'var(--navy)', margin: '0 0 1rem', lineHeight: 1.2 }}>
            Thank You to Our Prospective Donors
          </h3>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: 'var(--text-muted)', margin: '0 0 1rem', fontWeight: 300, lineHeight: 1.75 }}>
            The Surviving The Standard Foundation extends its heartfelt gratitude to everyone considering a contribution to our mission. Your generosity has the power to change lives by helping aspiring public safety professionals overcome financial barriers and pursue their calling to serve.
          </p>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.05rem', color: 'var(--text-muted)', margin: '0 0 1.5rem', fontWeight: 300, lineHeight: 1.75 }}>
            Every dollar donated goes directly toward funding scholarships for individuals entering law enforcement, fire rescue, EMS, corrections, and other public safety fields. Whether you give once or become a monthly supporter, your investment in these future professionals makes a lasting impact on the communities they will serve.
          </p>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.1rem', color: 'var(--navy)', margin: 0, fontWeight: 500, fontStyle: 'italic' }}>
            Together, we can support those who serve.
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
      {/* Background texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", pointerEvents: 'none' }} />
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.8)' }}>Get Involved</span>
        <div style={{ width: '64px', height: '3px', background: 'linear-gradient(90deg, rgba(201,168,76,0.7), rgba(201,168,76,0.2))', margin: '1rem auto 1.5rem' }} />
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', margin: '0 0 1.25rem', lineHeight: 1.1 }}>
          Take the Next Step
        </h2>
        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '2.5rem', fontWeight: 300 }}>
          Whether you're a student ready to apply, a donor who believes in our mission, or someone who wants to learn more—we want to hear from you.
        </p>

        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <a href="mailto:apply@survivingthestandard.com" className="btn-primary" style={{ background: 'white', color: 'var(--navy)', fontSize: '1.05rem', padding: '0.9rem 2.25rem', textDecoration: 'none', fontWeight: 600 }}>
            Apply for a Scholarship
          </a>
          <a href="https://www.zeffy.com/en-US/donation-form/surviving-the-standard-public-safety-scholarship-fund" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '1.05rem', padding: '0.9rem 2.25rem', textDecoration: 'none' }}>
            Make a Donation
          </a>
          <a href="mailto:contact@survivingthestandard.com" className="btn-outline" style={{ fontSize: '1.05rem', padding: '0.9rem 2.25rem', textDecoration: 'none' }}>
            General Inquiry
          </a>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Applications', email: 'apply@survivingthestandard.com' },
            { label: 'Donations', email: 'Donations@survivingthestandard.com' },
            { label: 'General', email: 'contact@survivingthestandard.com' },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)', marginBottom: '0.3rem' }}>{item.label}</div>
              <a href={`mailto:${item.email}`} style={{ fontFamily: "'Source Serif 4', serif", fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', transition: 'color 0.2s', fontWeight: 300 }}>
                {item.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" style={{ padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'white', marginBottom: '0.25rem' }}>
            Surviving The Standard Foundation
          </div>
          <div style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Public Safety Scholarship Fund
          </div>
        </div>
        <div style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Surviving The Standard Foundation. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Apply', href: 'mailto:apply@survivingthestandard.com', external: false },
            { label: 'Donate', href: 'https://www.zeffy.com/en-US/donation-form/surviving-the-standard-public-safety-scholarship-fund', external: true },
            { label: 'Contact', href: 'mailto:contact@survivingthestandard.com', external: false },
          ].map((l) => (
            <a key={l.label} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ fontFamily: "'EB Garamond', serif", fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.05em' }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)' }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)' }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function FoundationSite() {
  const [team] = useState<TeamMember[]>(() => loadTeam())
  const [modalMember, setModalMember] = useState<TeamMember | null>(null)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <NavBar onNavClick={scrollTo} />
      <main id="main-content">
        <HeroSection />
        <MissionSection />
        <ScholarshipSection />
        <DonorSection />
        <LeadershipSection team={team} onCardClick={setModalMember} />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />

      {modalMember && (
        <BioModal member={modalMember} onClose={() => setModalMember(null)} />
      )}
    </>
  )
}
