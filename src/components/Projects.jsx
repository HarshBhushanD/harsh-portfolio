import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Connect SRM',
    stack: ['React.js', 'Firebase', 'Tailwind'],
    desc: 'Student-focused platform with 2,000+ users. Led web development, UI/UX design, and community engagement with scroll animations and geometric transitions.',
    accent: '#7c6fff',
    link: '#',
    badge: 'LIVE',
    stat: '2K+ Users',
  },
  {
    name: 'E-GoldStore',
    stack: ['React.js', 'Firebase', 'Vite', 'Tailwind'],
    desc: 'Digital platform for buying Gold & Silver online securely. Integrated Firebase auth, PayPal payment gateway, and real-time database.',
    accent: '#f7c948',
    link: '#',
    badge: 'FINTECH',
    stat: 'Secure Payments',
  },
  {
    name: 'My-Chat (AI Clone)',
    stack: ['React.js', 'MongoDB', 'Express.js', 'Node.js'],
    desc: 'Conversational AI using OpenAI API. Designed intuitive chat interface with React and Tailwind, backend with Node.js and Express for API handling.',
    accent: '#00e5c0',
    link: '#',
    badge: 'AI/ML',
    stat: 'OpenAI Powered',
  },
  {
    name: 'EMS – Employee System',
    stack: ['React', 'Tailwind CSS', 'Firebase'],
    desc: 'Application to manage employee records — leaves, active projects, and task assignments with a clean, responsive dashboard.',
    accent: '#ff6b6b',
    link: '#',
    badge: 'SaaS',
    stat: 'Full Featured',
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) * 8;
    gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
    // Move glow
    const glow = card.querySelector('.glow');
    if (glow) { glow.style.left = x + 'px'; glow.style.top = y + 'px'; glow.style.opacity = '1'; }
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.7)' });
    const glow = cardRef.current.querySelector('.glow');
    if (glow) glow.style.opacity = '0';
  };

  return (
    <div ref={cardRef} className={`project-card-${index}`}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      data-cursor="true"
      style={{
        background: 'rgba(13,13,34,0.8)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, padding: '2rem',
        position: 'relative', overflow: 'hidden',
        cursor: 'none', transformStyle: 'preserve-3d',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = project.accent + '40'; }}
    >
      {/* Glow */}
      <div className="glow" style={{
        position: 'absolute', width: 250, height: 250, borderRadius: '50%',
        background: `radial-gradient(circle, ${project.accent}22 0%, transparent 70%)`,
        transform: 'translate(-50%,-50%)', pointerEvents: 'none', opacity: 0,
        transition: 'opacity 0.3s', zIndex: 0,
      }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem', position: 'relative', zIndex: 1 }}>
        <span style={{
          fontFamily: 'var(--ff-mono)', fontSize: '0.65rem', letterSpacing: '0.14em',
          padding: '4px 10px', borderRadius: 100,
          background: project.accent + '18', color: project.accent,
          border: `1px solid ${project.accent}40`,
        }}>
          {project.badge}
        </span>
        <span style={{
          fontFamily: 'var(--ff-mono)', fontSize: '0.7rem',
          color: 'var(--muted)', letterSpacing: '0.08em',
        }}>
          {project.stat}
        </span>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: 'var(--ff-display)', fontWeight: 700,
        fontSize: '1.4rem', color: 'var(--white)',
        marginBottom: '0.75rem', position: 'relative', zIndex: 1,
        lineHeight: 1.2,
      }}>
        {project.name}
      </h3>

      {/* Desc */}
      <p style={{
        fontFamily: 'var(--ff-serif)', fontStyle: 'italic',
        fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(221,221,245,0.55)',
        marginBottom: '1.5rem', position: 'relative', zIndex: 1,
      }}>
        {project.desc}
      </p>

      {/* Stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        {project.stack.map(s => (
          <span key={s} style={{
            fontFamily: 'var(--ff-mono)', fontSize: '0.65rem',
            padding: '3px 10px', borderRadius: 3,
            background: 'rgba(255,255,255,0.05)', color: 'var(--muted)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {s}
          </span>
        ))}
      </div>

      {/* Link */}
      <a href={project.link} data-cursor="true" style={{
        fontFamily: 'var(--ff-mono)', fontSize: '0.72rem',
        color: project.accent, letterSpacing: '0.1em',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        position: 'relative', zIndex: 1,
        transition: 'gap 0.3s',
      }}
        onMouseEnter={e => { e.currentTarget.style.gap = '10px'; }}
        onMouseLeave={e => { e.currentTarget.style.gap = '6px'; }}
      >
        VIEW PROJECT <span>→</span>
      </a>

      {/* Corner accent */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 80, height: 80,
        background: `radial-gradient(circle at bottom right, ${project.accent}18 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

export default function Projects() {
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
      }
    );
    gsap.fromTo(gridRef.current.children,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section id="projects" style={{
      padding: '8rem 5vw', position: 'relative', zIndex: 1,
    }}>
      {/* Section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em' }}>04</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.15em' }}>SELECTED WORK</span>
      </div>

      <h2 ref={titleRef} style={{
        fontFamily: 'var(--ff-display)', fontWeight: 800,
        fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)',
        lineHeight: 1.05, letterSpacing: '-0.02em',
        marginBottom: '3.5rem',
      }}>
        Things I've<br />
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontWeight: 400 }}>Built</span>
      </h2>

      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.5rem',
      }}>
        {projects.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
      </div>
    </section>
  );
}
