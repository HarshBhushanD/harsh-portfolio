import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: 'GitHub', handle: '@HarshBhushanD', url: 'https://github.com/HarshBhushanD', color: '#7c6fff' },
  { label: 'LinkedIn', handle: '@harshbhushandixit', url: 'https://linkedin.com/in/harshbhushandixit', color: '#00e5c0' },
  { label: 'LeetCode', handle: '@Harshbhushandixit', url: '#', color: '#f7c948' },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
    );
    gsap.fromTo(cardsRef.current?.children || [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' } }
    );

    // Marquee
    gsap.to(marqueeRef.current, { x: '-50%', duration: 20, ease: 'none', repeat: -1 });
  }, []);

  return (
    <>
      {/* Marquee strip */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1rem 0', marginBottom: 0 }}>
        <div ref={marqueeRef} style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', width: 'max-content' }}>
          {Array(4).fill(['REACT', 'NODE.JS', 'FIREBASE', 'AWS', 'MONGODB', 'TAILWIND', 'JAVASCRIPT', 'OPEN TO WORK']).flat().map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--ff-mono)', fontSize: '0.75rem', letterSpacing: '0.2em',
              color: i % 8 === 7 ? 'var(--accent)' : 'var(--muted)',
            }}>
              {item} <span style={{ color: 'var(--border2)' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <section id="contact" ref={sectionRef} style={{
        padding: '8rem 5vw 4rem', position: 'relative', zIndex: 1,
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1rem' }}>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em' }}>06</span>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.15em' }}>CONTACT</span>
        </div>

        <div ref={titleRef} style={{ maxWidth: 700, margin: '0 auto 3.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--ff-display)', fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--white)',
            lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '1.5rem',
          }}>
            Let's build something <span style={{ color: 'var(--accent)', fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontWeight: 400 }}>remarkable</span>
          </h2>
          <p style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(221,221,245,0.5)', lineHeight: 1.7 }}>
            Open to internships, freelance projects, and full-time opportunities. Let's connect and create together.
          </p>
        </div>

        {/* Email CTA */}
        <a href="mailto:harshbhushandixit@email.com" data-cursor="true"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '1.1rem 2.5rem', background: 'var(--accent)',
            color: 'var(--white)', borderRadius: 6, fontWeight: 700,
            fontSize: '1rem', letterSpacing: '0.05em', marginBottom: '4rem',
            border: '1px solid var(--accent)', transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--white)'; }}
        >
          Say Hello ↗
        </a>

        {/* Socials */}
        <div ref={cardsRef} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {socials.map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" data-cursor="true"
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '1rem 1.6rem', borderRadius: 10,
                background: 'var(--glass)', border: '1px solid var(--border)',
                transition: 'all 0.3s', textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '50'; e.currentTarget.style.background = s.color + '0f'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--glass)'; }}
            >
              <div>
                <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.65rem', color: s.color, letterSpacing: '0.1em', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 600 }}>{s.handle}</div>
              </div>
              <span style={{ color: s.color, fontSize: '1rem' }}>↗</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '6rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>
            © 2025 Harsh Bhushan Dixit
          </span>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>
            Built with React · Three.js · GSAP
          </span>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--accent)' }}>
            SRM IST '27
          </span>
        </div>
      </section>
    </>
  );
}
