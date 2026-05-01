import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    title: 'Programming Languages',
    accent: 'var(--accent2)',
    items: ['JavaScript (ES6+)', 'C++', 'Java'],
  },
  {
    title: 'Frontend Technologies',
    accent: 'var(--accent3)',
    items: ['HTML5', 'CSS3', 'React.js', 'Tailwind CSS'],
  },
  {
    title: 'Backend Technologies',
    accent: 'var(--accent3)',
    items: ['Node.js', 'Express.js'],
  },
  {
    title: 'Databases',
    accent: 'var(--accent2)',
    items: ['MongoDB', 'Firebase','MySQL','Supabase'],
  },
  {
    title: 'Tools & Technologies',
    accent: 'var(--accent3)',
    items: ['Git & GitHub','GitLab', 'Docker', 'AWS (EC2, Lambda, ECR)', 'REST APIs','Jenkins'],
  },
  {
    title: 'Core Concepts',
    accent: 'var(--accent2)',
    items: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'System Design (Basic)', 'Cloud Computing'],
  },
];

export default function Skills() {
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    );

    gsap.fromTo(gridRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section id="skills" style={{ padding: '8rem 5vw', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em' }}>03</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.15em' }}>SKILLS</span>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <h2 ref={titleRef} style={{
          fontFamily: 'var(--ff-display)', fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--white)',
          lineHeight: 1.1, marginBottom: '0.75rem',
        }}>
          Tooling that ships <span style={{ color: 'var(--accent)', fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontWeight: 400 }}>fast</span>
        </h2>
        <p style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', color: 'rgba(221,221,245,0.55)', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1rem', maxWidth: 760 }}>
          A clean, practical set of skills I use to build and ship full-stack products.
        </p>

        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1.5rem' }}>
          {SKILL_GROUPS.map(group => (
            <div key={group.title} style={{
              padding: '1.6rem',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(18px)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Subtle corner glow */}
              <div style={{
                position: 'absolute', inset: -120,
                background: `radial-gradient(circle at top left, ${group.accent}12 0%, transparent 55%)`,
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  fontFamily: 'var(--ff-mono)', fontSize: '0.72rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: group.accent,
                  marginBottom: '1rem',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: group.accent, boxShadow: `0 0 12px ${group.accent}80` }} />
                  {group.title}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {group.items.map(item => (
                    <span key={item} style={{
                      fontFamily: 'var(--ff-mono)',
                      fontSize: '0.72rem',
                      padding: '6px 10px',
                      borderRadius: 999,
                      background: 'rgba(0,0,0,0.35)',
                      border: `1px solid ${group.accent}35`,
                      color: 'rgba(221,221,245,0.8)',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

