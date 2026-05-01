import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleField() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // === PARTICLES ===
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      new THREE.Color('#7c6fff'), // purple
      new THREE.Color('#38bdf8'), // sky blue
      new THREE.Color('#22c55e'), // green
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread in sphere
      const r = Math.random() * 8 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi) - 2;

      const rPick = Math.random();
      const c =
        rPick < 0.82 ? palette[0] : // mostly purple
        rPick < 0.93 ? palette[1] : // some sky
        palette[2]; // a little green
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0, 0) } },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uTime;
        uniform vec2 uMouse;
        void main() {
          vColor = color;
          vec3 pos = position;
          float dist = length(pos.xy - uMouse * 4.0);
          float repel = smoothstep(1.5, 0.0, dist) * 0.8;
          pos.xy += normalize(pos.xy - uMouse * 4.0) * repel;
          pos.x += sin(uTime * 0.3 + position.y * 0.5) * 0.15;
          pos.y += cos(uTime * 0.2 + position.x * 0.5) * 0.15;
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.2, 0.5, d);
          gl_FragColor = vec4(vColor, alpha * 0.75);
        }
      `
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // === GRID LINES ===
    const gridGeo = new THREE.BufferGeometry();
    const gridLines = [];
    const gridSize = 20;
    const gridStep = 2;
    for (let x = -gridSize; x <= gridSize; x += gridStep) {
      gridLines.push(x, -gridSize, -8, x, gridSize, -8);
    }
    for (let y = -gridSize; y <= gridSize; y += gridStep) {
      gridLines.push(-gridSize, y, -8, gridSize, y, -8);
    }
    gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridLines, 3));
    const gridMat = new THREE.LineBasicMaterial({ color: 0x7c6fff, transparent: true, opacity: 0.04 });
    scene.add(new THREE.LineSegments(gridGeo, gridMat));

    // === MOUSE ===
    const mouse = new THREE.Vector2();
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / w) * 2 - 1;
      mouse.y = -(e.clientY / h) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // === ANIMATE ===
    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mat.uniforms.uTime.value = t;
      mat.uniforms.uMouse.value.lerp(mouse, 0.05);

      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.02;

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // === RESIZE ===
    const onResize = () => {
      const nw = window.innerWidth, nh = window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none'
    }} />
  );
}
