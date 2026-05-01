import './index.css';
import Cursor from './components/Cursor';
import ParticleField from './components/ParticleField';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Cursor />
      <ParticleField />
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        {/* Pure black base + subtle multi-color glows */}
        <div style={{ position:'absolute', inset:0, background:'#000' }} />
        {/* Purple */}
        <div style={{ position:'absolute', top:'-22%', left:'-12%', width:760, height:760, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,111,255,0.06) 0%, transparent 62%)', filter:'blur(75px)' }} />
        {/* Sky blue */}
        <div style={{ position:'absolute', top:'18%', right:'-18%', width:720, height:720, borderRadius:'50%', background:'radial-gradient(circle, rgba(56,189,248,0.045) 0%, transparent 62%)', filter:'blur(90px)' }} />
        {/* Green */}
        <div style={{ position:'absolute', bottom:'-30%', left:'10%', width:820, height:820, borderRadius:'50%', background:'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 62%)', filter:'blur(95px)' }} />
        {/* Navy depth */}
        <div style={{ position:'absolute', top:'40%', left:'45%', width:900, height:900, borderRadius:'50%', background:'radial-gradient(circle, rgba(11,27,58,0.28) 0%, transparent 60%)', filter:'blur(120px)' }} />
      </div>
      <div style={{ position:'relative', zIndex:1 }}>
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </>
  );
}
