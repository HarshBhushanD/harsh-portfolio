import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Full Stack Web Developer Intern',
    company: 'Digital Guruji',
    period: 'May 2025 – Oct 2025',
    color: 'var(--accent)',
    points: [
      'Developed scalable e-commerce platform using serverless architecture on AWS',
      'Wrote AWS Lambda functions to manage backend operations end-to-end',
      'Integrated PayPal for secure payment processing with real-time validation',
      'Contributed to frontend & backend, deployment, and performance optimization',
    ],
  },
  {
    role: 'Co-Founder & Lead Developer',
    company: 'Connect SRM',
    period: 'May 2024 – Present',
    color: 'var(--accent)',
    points: [
      'Built Connect SRM — student platform now serving 2,000+ active users',
      'Led web development, UI/UX design, and community engagement strategy',
      'Architected the frontend with React.js, Firebase, and Tailwind CSS',
      'Drove strategic planning and feature roadmap to establish market presence',
    ],
  },
];

const achievements = [
  { title: '2nd Place — Devalchemy', org: 'CSI', color: 'var(--accent)' },
  { title: '3rd Place — Hack The Flag', org: 'GDG', color: 'var(--accent)' },
  { title: '2nd Place — TechNation', org: 'CSI', color: 'var(--accent)' },
  { title: 'Web Dev Lead', org: 'Connect SRM', color: 'var(--accent)' },
  { title: '400+ Problems Solved', org: 'LeetCode', color: 'var(--accent)' },
];

export default function Experience() {
  const lineRef = useRef(null);
  const itemRefs = useRef([]);
  const titleRef = useRef(null);
  const achieveRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
    });

    gsap.fromTo(lineRef.current, { scaleY: 0 }, {
      scaleY: 1, duration: 1.5, ease: 'power3.inOut', transformOrigin: 'top center',
      scrollTrigger: { trigger: lineRef.current, start: 'top 80%' }
    });

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, x: i % 2 === 0 ? -50 : 50 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15,
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    gsap.fromTo(achieveRef.current?.children || [], { opacity: 0, y: 30, scale: 0.9 }, {
      opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.5, ease: 'back.out(1.5)',
      scrollTrigger: { trigger: achieveRef.current, start: 'top 85%' }
    });
  }, []);

  return (
    <section id="experience" style={{ padding: '8rem 5vw', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em' }}>05</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.15em' }}>EXPERIENCE</span>
      </div>

      <h2 ref={titleRef} style={{
        fontFamily: 'var(--ff-display)', fontWeight: 800,
        fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--white)',
        lineHeight: 1.1, marginBottom: '4rem',
      }}>
        Where I've <span style={{ color: 'var(--accent)', fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontWeight: 400 }}>worked</span>
      </h2>

      {/* Timeline */}
      <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto 5rem' }}>
        {/* Line */}
        <div ref={lineRef} style={{
          position: 'absolute', left: isMobile ? 10 : '50%', top: 0, bottom: 0,
          width: 1, background: 'linear-gradient(to bottom, var(--accent), transparent)',
          transform: isMobile ? 'none' : 'translateX(-50%)',
        }} />

        {experiences.map((exp, i) => (
          <div key={exp.company} ref={el => itemRefs.current[i] = el} style={{
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : (i % 2 === 0 ? 'flex-end' : 'flex-start'),
            marginBottom: '3rem', position: 'relative',
            paddingLeft: isMobile ? 28 : 0,
          }}>
            {/* Dot */}
            <div style={{
              position: 'absolute',
              left: isMobile ? 10 : '50%',
              top: '1.5rem',
              transform: isMobile ? 'translate(-50%,-50%)' : 'translate(-50%,-50%)',
              width: 12, height: 12, borderRadius: '50%',
              background: exp.color, boxShadow: `0 0 20px ${exp.color}80`,
              zIndex: 2,
            }} />

            {/* Card */}
            <div style={{
              width: isMobile ? '100%' : '44%',
              marginRight: isMobile ? 0 : (i % 2 === 0 ? '8%' : 0),
              marginLeft: isMobile ? 0 : (i % 2 !== 0 ? '8%' : 0),
              background: 'rgba(13,13,34,0.9)', backdropFilter: 'blur(20px)',
              border: `1px solid ${exp.color}30`, borderRadius: 12, padding: '1.8rem',
              borderLeft: isMobile ? `3px solid ${exp.color}` : (i % 2 !== 0 ? `3px solid ${exp.color}` : '1px solid rgba(255,255,255,0.07)'),
              borderRight: isMobile ? '1px solid rgba(255,255,255,0.07)' : (i % 2 === 0 ? `3px solid ${exp.color}` : '1px solid rgba(255,255,255,0.07)'),
            }}>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.65rem', color: exp.color, letterSpacing: '0.12em', marginBottom: 8 }}>
                {exp.period}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--white)', marginBottom: 4 }}>
                {exp.role}
              </h3>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '1.2rem' }}>
                @ {exp.company}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {exp.points.map(p => (
                  <li key={p} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: exp.color, marginTop: 5, flexShrink: 0, fontSize: 6 }}>◆</span>
                    <span style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(221,221,245,0.6)', lineHeight: 1.6 }}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.15em', marginBottom: '1.5rem', textAlign: 'center' }}>
          — ACHIEVEMENTS —
        </div>
        <div ref={achieveRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {achievements.map(a => (
            <div key={a.title} style={{
              padding: '0.8rem 1.4rem', borderRadius: 8,
              background: a.color + '0f', border: `1px solid ${a.color}30`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: a.color }}>{a.title}</span>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>{a.org}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
