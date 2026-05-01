import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const roles = ['Full Stack Developer', 'React Specialist', 'UI/UX Enthusiast', 'Open Source Builder'];

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const roleRef = useRef(null);
  const ctaRef = useRef(null);
  const imgContainerRef = useRef(null);
  const globeRef = useRef(null);
  const roleIdx = useRef(0);

  // Three.js globe
  useEffect(() => {
    const mount = globeRef.current;
    const size = 320;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Wireframe sphere
    const geo = new THREE.IcosahedronGeometry(1.2, 4);
    const wireGeo = new THREE.EdgesGeometry(geo);
    const ACCENT = 0x7c6fff;
    const wireMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.25 });
    const wire = new THREE.LineSegments(wireGeo, wireMat);
    scene.add(wire);

    // Inner glow sphere
    const glowGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.04 });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Orbiting ring
    const ringGeo = new THREE.TorusGeometry(1.5, 0.005, 8, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.22 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.8;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.75, 0.003, 8, 100),
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.14 })
    );
    ring2.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    // Dots on sphere surface
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = [];
    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dotPositions.push(
        1.22 * Math.sin(phi) * Math.cos(theta),
        1.22 * Math.sin(phi) * Math.sin(theta),
        1.22 * Math.cos(phi)
      );
    }
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.025, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(dotGeo, dotMat));

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      wire.rotation.y += 0.003;
      wire.rotation.x += 0.001;
      ring.rotation.z += 0.008;
      ring2.rotation.z -= 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => { cancelAnimationFrame(raf); renderer.dispose(); mount.removeChild(renderer.domElement); };
  }, []);

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    // Split heading chars
    const heading = headingRef.current;
    const text = heading.innerText;
    heading.innerHTML = text.split('').map(c =>
      `<span style="display:inline-block;opacity:0;transform:translateY(60px) rotateX(-90deg)">${c === ' ' ? '&nbsp;' : c}</span>`
    ).join('');

    tl.to(heading.querySelectorAll('span'), {
      opacity: 1, y: 0, rotateX: 0, stagger: 0.025, duration: 0.7, ease: 'back.out(1.5)'
    })
      .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .fromTo(roleRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo(ctaRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(imgContainerRef.current, { opacity: 0, scale: 0.85, rotateY: 15 }, { opacity: 1, scale: 1, rotateY: 0, duration: 1, ease: 'expo.out' }, '-=0.8');

    // Role cycling
    const cycle = setInterval(() => {
      roleIdx.current = (roleIdx.current + 1) % roles.length;
      gsap.to(roleRef.current, {
        opacity: 0, y: -10, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          roleRef.current.textContent = roles[roleIdx.current];
          gsap.to(roleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        }
      });
    }, 2800);

    return () => clearInterval(cycle);
  }, []);

  return (
    <section id="home" ref={sectionRef} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '0 5vw', position: 'relative', zIndex: 1,
      gap: '4rem',
    }}>
      {/* Left content */}
      <div style={{ flex: 1, maxWidth: 640 }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          width: 'fit-content',
          marginLeft: 'auto',
          padding: '10px 20px', borderRadius: 100,
          border: '1px solid rgba(124,111,255,0.3)',
          background: 'rgba(124,111,255,0.08)',
          marginBottom: '2rem',
          fontFamily: 'var(--ff-mono)', fontSize: '0.72rem', color: 'var(--accent)',
          letterSpacing: '0.12em',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s infinite' }} />
          AVAILABLE FOR WORK
        </div>
        <h3 ref={headingRef} style={{
          fontFamily: 'var(--ff-display)', fontWeight: 600,
          fontSize: 'clamp(1rem, 6vw, 2.5rem)', lineHeight: 0.5,
          letterSpacing: '-0.02em', color: 'var(--white)',
          perspective: '300px',
          marginBottom: '1.5rem',
        }}>
           Hi, I am
        </h3>


        <h1 ref={headingRef} style={{
          fontFamily: 'var(--ff-display)', fontWeight: 800,
          fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.0,
          letterSpacing: '-0.02em', color: 'var(--white)',
          perspective: '600px',
          marginBottom: '1.5rem',
        }}>
           Harsh 
        </h1>
        <h3 ref={headingRef} style={{
          fontFamily: 'var(--ff-display)', fontWeight: 600,
          fontSize: 'clamp(1rem, 6vw, 2.5rem)', lineHeight: 0.5,
          letterSpacing: '-0.02em', color: 'var(--white)',
          perspective: '300px',
          marginBottom: '1.5rem',
        }}>
           Bhushan Dixit
        </h3>

        {/* Role ticker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
          <span style={{ width: 28, height: 1, background: 'var(--accent)' }} />
          <span ref={roleRef} style={{
            fontFamily: 'var(--ff-mono)', fontSize: '1.05rem',
            color: 'var(--accent)', letterSpacing: '0.08em',
          }}>
            {roles[0]}
          </span>
        </div>

        <p ref={subRef} style={{
          fontFamily: 'var(--ff-serif)', fontStyle: 'italic',
          fontSize: '1.15rem', lineHeight: 1.75, color: 'rgba(221,221,245,0.65)',
          maxWidth: 520, marginBottom: '2.5rem',
        }}>
          Full Stack Developer skilled in building scalable web applications using the MERN stack. Passionate about cloud computing and DevOps, with hands-on experience in AWS and Docker. Focused on creating efficient, real-world solutions.
          {/* Building immersive digital experiences at the intersection of design and technology.
          Co-Founder of Connect SRM — a platform empowering 2,000+ students. */}
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '2.8rem' }}>
          {[
            { val: '500+', label: 'LeetCode Solved' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--white)', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.12em', marginTop: 4, textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#projects" data-cursor="true"
            style={{
              padding: '0.85rem 2rem', background: 'var(--accent)',
              color: 'var(--white)', borderRadius: 4, fontWeight: 700,
              fontSize: '0.85rem', letterSpacing: '0.08em', border: '1px solid var(--accent)',
              transition: 'all 0.3s', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--white)'; }}
          >
            View Projects ↓
          </a>
          <a href="https://github.com/HarshBhushanD" target="_blank" rel="noreferrer" data-cursor="true"
            style={{
              padding: '0.85rem 2rem', background: 'transparent',
              color: 'var(--text)', borderRadius: 4, fontWeight: 600,
              fontSize: '0.85rem', letterSpacing: '0.08em',
              border: '1px solid var(--border2)',
              transition: 'all 0.3s', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text)'; }}
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Right — Photo + Globe */}
      <div ref={imgContainerRef} style={{ position: 'relative', flexShrink: 0 }}>
        {/* Globe behind */}
        <div ref={globeRef} style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 320, height: 320, zIndex: 0,
        }} />

        {/* Photo */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: 280, height: 340,
          borderRadius: '2px 80px 2px 80px',
          overflow: 'hidden',
          border: '1px solid rgba(124,111,255,0.25)',
          boxShadow: '0 0 60px rgba(124,111,255,0.2), 0 0 120px rgba(124,111,255,0.08)',
        }}>
          <img src="/assets/harsh.png" alt="Harsh Bhushan Dixit"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
          {/* Overlay gradient */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(to top, rgba(6,6,15,0.9), transparent)',
          }} />
          {/* Name tag */}
          <div style={{
            position: 'absolute', bottom: '1.2rem', left: '1.2rem',
            fontFamily: 'var(--ff-mono)', fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em',
          }}>
            SRM IST — CSE '27
          </div>
        </div>

        {/* Floating tech tags */}
        {[
          { label: 'React.js', top: '-10%', right: '-20%', color: 'var(--accent)' },
          { label: 'Node.js', bottom: '15%', right: '-25%', color: 'var(--accent)' },
          { label: 'AWS', top: '30%', left: '-25%', color: 'var(--accent)' },
        ].map(tag => (
          <div key={tag.label} style={{
            position: 'absolute', top: tag.top, bottom: tag.bottom,
            right: tag.right, left: tag.left,
            fontFamily: 'var(--ff-mono)', fontSize: '0.7rem',
            color: tag.color, padding: '5px 12px',
            border: `1px solid ${tag.color}40`,
            background: `${tag.color}0f`,
            borderRadius: 4, letterSpacing: '0.1em', whiteSpace: 'nowrap',
          }}>
            {tag.label}
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        fontFamily: 'var(--ff-mono)', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.15em',
        animation: 'float 2.5s ease-in-out infinite',
      }}>
        SCROLL
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        @keyframes float { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-8px)} }
      `}</style>
    </section>
  );
}
