import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const techBubbles = [
  'React', 'Node.js', 'MongoDB', 'AWS', 'Firebase',
  'Tailwind', 'Express', 'MySQL', 'Java', 'C++',
  'HTML5', 'CSS3', 'Vite', 'Git', 'REST API',
];

export default function About() {
  const sectionRef = useRef(null);
  const sphereRef = useRef(null);
  const titleRef = useRef(null);

  // Three.js tag cloud
  useEffect(() => {
    const mount = sphereRef.current;
    if (!mount) return;
    const size = 380;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setClearColor(0, 0);
    mount.appendChild(renderer.domElement);

    // Create text sprites as planes with canvas texture
    const createLabel = (text, color) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 256, 64);
      ctx.fillStyle = color + '22';
      ctx.roundRect(4, 4, 248, 56, 8);
      ctx.fill();
      ctx.strokeStyle = color + '55';
      ctx.lineWidth = 1;
      ctx.roundRect(4, 4, 248, 56, 8);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.font = 'bold 22px Syne, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, 32);
      const tex = new THREE.CanvasTexture(canvas);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), mat);
      return mesh;
    };
    const palette = [  '#8b5cf6','#06b6d4',  '#22c55e', '#f59e0b', '#ef4444'  ];
    // const palette = ['#7c6fff', '#38bdf8', '#22c55e'];
    const meshes = techBubbles.map((tech, i) => {
      const m = createLabel(tech, palette[i % palette.length]);
      const phi = Math.acos(-1 + (2 * i) / techBubbles.length);
      const theta = Math.sqrt(techBubbles.length * Math.PI) * phi;
      const r = 2.6;
      m.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
      scene.add(m);
      return m;
    });

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      meshes.forEach(m => { m.lookAt(camera.position); });
      scene.rotation.y += 0.004;
      scene.rotation.x = Math.sin(Date.now() * 0.0003) * 0.2;
      renderer.render(scene, camera);
    };
    animate();

    return () => { cancelAnimationFrame(raf); renderer.dispose(); mount.removeChild(renderer.domElement); };
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    );
  }, []);

  return (
    <section id="about" style={{ padding: '8rem 5vw', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.2em' }}>02</span>
        <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.15em' }}>ABOUT</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        {/* Left: About */}
        <div>
          <h2 ref={titleRef} style={{
            fontFamily: 'var(--ff-display)', fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--white)',
            lineHeight: 1.1, marginBottom: '0.75rem',
          }}>
            Crafting with <span style={{ color: 'var(--accent)', fontFamily: 'var(--ff-serif)', fontStyle: 'italic', fontWeight: 400 }}>precision</span>
          </h2>
          <p style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', color: 'rgba(221,221,245,0.6)', lineHeight: 1.75, marginBottom: '1.4rem', fontSize: '1rem' }}>
            I am a passionate Full Stack Developer currently pursuing B.Tech in Computer Science with a specialization in Cloud Computing. I enjoy building end-to-end web applications using the MERN stack and have hands-on experience with technologies like React.js, Node.js, Express.js, MongoDB, Firebase, and modern JavaScript.
          </p>
          <p style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', color: 'rgba(221,221,245,0.55)', lineHeight: 1.75, marginBottom: '1.4rem', fontSize: '1rem' }}>
            I have worked on multiple real-world projects, including a cloud-deployed code compiler and full-stack web applications, which helped me gain practical experience in system design, API development, and deployment. Recently, I have been focusing on DevOps practices and cloud technologies such as AWS and Docker to build scalable and efficient systems.
          </p>
          <p style={{ fontFamily: 'var(--ff-serif)', fontStyle: 'italic', color: 'rgba(221,221,245,0.55)', lineHeight: 1.75, marginBottom: '0', fontSize: '1rem' }}>
            I am always eager to learn new technologies and work in collaborative environments where I can contribute to impactful products. I am currently seeking opportunities where I can apply my skills, grow as a developer, and be part of innovative teams.
          </p>
        </div>

        {/* Right: 3D tag cloud */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div ref={sphereRef} style={{ width: 380, height: 380 }} />
        </div>
      </div>
    </section>
  );
}
