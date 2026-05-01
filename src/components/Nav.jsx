import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Nav() {
  const navRef = useRef(null);
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 }
    );

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.4rem 3rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(6,6,15,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      {/* Logo */}
      <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.85rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
        HBD<span style={{ color: 'var(--muted)' }}>.dev</span>
      </div>

      {/* Links */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {links.map(link => (
          <li key={link}>
            <button onClick={() => scrollTo(link)} style={{
              background: 'none', border: 'none', cursor: 'none',
              fontFamily: 'var(--ff-display)', fontSize: '0.8rem',
              fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: active === link ? 'var(--accent)' : 'var(--muted)',
              transition: 'color 0.3s',
              position: 'relative', padding: '4px 0',
            }}
              data-cursor="true"
              onMouseEnter={e => { if (active !== link) e.target.style.color = 'var(--text)'; }}
              onMouseLeave={e => { if (active !== link) e.target.style.color = 'var(--muted)'; }}
            >
              {link}
              {active === link && (
                <span style={{
                  position: 'absolute', bottom: -2, left: 0, right: 0,
                  height: 1, background: 'var(--accent)',
                }} />
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="mailto:harshbhushandixit@email.com" data-cursor="true" style={{
        fontFamily: 'var(--ff-mono)', fontSize: '0.75rem', letterSpacing: '0.1em',
        padding: '0.5rem 1.2rem', border: '1px solid var(--accent)',
        color: 'var(--accent)', borderRadius: 4,
        transition: 'all 0.3s',
      }}
        onMouseEnter={e => { e.target.style.background = 'var(--accent)'; e.target.style.color = '#fff'; }}
        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)'; }}
      >
        Hire Me ↗
      </a>
    </nav>
  );
}
