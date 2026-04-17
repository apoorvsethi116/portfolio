import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const projects = [
  {
    title: "AI-Assisted Stock Trading Simulator",
    desc: "Full-stack MERN app with real-time stock APIs, portfolio tracking, and a rich analytics dashboard. Simulates live market conditions with AI-driven insights.",
    tags: ["MERN", "Real-time APIs", "AI", "Dashboard"],
    github: "https://github.com/apoorvsethi116/Stock-trading-app.git",
    live: null,
    emoji: "📈",
    color: "#00d4aa",
  },
  {
    title: "AI-Based Resume Ranking System",
    desc: "NLP-powered resume screening using cosine similarity and semantic matching. Ranks candidates intelligently against job descriptions.",
    tags: ["NLP", "Python", "Cosine Similarity", "Semantic AI"],
    github: "https://github.com/apoorvsethi116/Resume_Ranker.git",
    live: null,
    emoji: "🤖",
    color: "#7c6aff",
  },
  {
    title: "Conflict Intel App",
    desc: "Real-time geopolitical intelligence platform delivering conflict data, alerts, and visualizations for global situational awareness.",
    tags: ["React", "Maps", "Real-time", "Geopolitics"],
    github: null,
    live: "https://conflict-intelligence-tracker.vercel.app/",
    emoji: "🌍",
    color: "#ff6b6b",
  },
];

const skills = [
  { name: "React", level: 88 },
  { name: "Node.js", level: 82 },
  { name: "MongoDB", level: 80 },
  { name: "Java", level: 85 },
  { name: "C++", level: 80 },
  { name: "JavaScript", level: 90 },
  { name: "DSA", level: 78 },
  { name: "Express", level: 83 },
];

function FloatingOrb({ style }) {
  return (
    <motion.div
      animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute rounded-full pointer-events-none"
      style={style}
    />
  );
}

function SkillBar({ name, level, delay }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-300">{name}</span>
        <span className="text-sm text-cyan-400">{level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #00d4aa, #7c6aff)" }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group rounded-2xl overflow-hidden border border-white/10"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        boxShadow: hovered ? `0 0 40px ${project.color}33` : "none",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Top accent */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div className="p-6">
        {/* Emoji + Title */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="text-4xl flex items-center justify-center w-14 h-14 rounded-xl flex-shrink-0"
            style={{ background: `${project.color}22`, border: `1px solid ${project.color}44` }}
          >
            {project.emoji}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}44` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{ background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}55` }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
          {!project.github && !project.live && (
            <span className="text-xs text-slate-500 italic">Private project</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const roles = ["MERN Stack Developer", "AI Enthusiast", "DSA Learner", "Hackathon Winner"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (subIndex === roles[index].length) {
      setTimeout(() => { setSubIndex(0); setIndex((prev) => (prev + 1) % roles.length); }, 1200);
      return;
    }
    const t = setTimeout(() => {
      setText(roles[index].substring(0, subIndex + 1));
      setSubIndex((prev) => prev + 1);
    }, 80);
    return () => clearTimeout(t);
  }, [subIndex, index]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const navLinks = ["home", "about", "projects", "skills", "contact"];

  return (
    <div
      className="min-h-screen text-white scroll-smooth"
      style={{ background: "linear-gradient(135deg, #060614 0%, #0a0a1e 50%, #050510 100%)", fontFamily: "'Syne', sans-serif" }}
    >
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        .dm { font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0a0a1e; }
        ::-webkit-scrollbar-thumb { background: #7c6aff66; border-radius: 10px; }
      `}</style>

      {/* Ambient Orbs */}
      <FloatingOrb style={{ width: 400, height: 400, top: "5%", left: "-5%", background: "radial-gradient(circle, #7c6aff18, transparent 70%)" }} />
      <FloatingOrb style={{ width: 500, height: 500, top: "10%", right: "-8%", background: "radial-gradient(circle, #00d4aa12, transparent 70%)" }} />
      <FloatingOrb style={{ width: 300, height: 300, bottom: "20%", left: "30%", background: "radial-gradient(circle, #ff6b6b0e, transparent 70%)" }} />

      {/* Navbar */}
      <nav
        className="fixed w-full top-0 z-50 px-6 py-4 flex justify-between items-center"
        style={{ background: "rgba(6, 6, 20, 0.7)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-xl font-bold" style={{ background: "linear-gradient(135deg, #00d4aa, #7c6aff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Apoorv Sethi
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex gap-8">
          {navLinks.map((item) => (
            <a key={item} href={`#${item}`} className="capitalize text-sm text-slate-400 hover:text-white transition-colors duration-200 dm">
              {item}
            </a>
          ))}
        </motion.div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full py-4 md:hidden"
              style={{ background: "rgba(6,6,20,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {navLinks.map((item) => (
                <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)} className="block px-6 py-3 capitalize text-slate-300 hover:text-white dm">
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section id="home" className="relative flex flex-col justify-center items-center min-h-screen text-center px-6 pt-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full dm text-xs"
            style={{ background: "rgba(0, 212, 170, 0.1)", border: "1px solid rgba(0, 212, 170, 0.3)", color: "#00d4aa" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-7xl md:text-9xl font-extrabold leading-none mb-4"
          >
            <span className="text-white">Hi, I'm</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #00d4aa 0%, #7c6aff 60%, #ff6b6b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Apoorv
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="h-10 mb-8">
            <p className="text-xl md:text-2xl dm font-light" style={{ color: "#94a3b8" }}>
              <span style={{ color: "#7c6aff", fontWeight: 500 }}>{text}</span>
              <span className="animate-pulse text-cyan-400">|</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 rounded-full blur-xl opacity-60" style={{ background: "linear-gradient(135deg, #00d4aa, #7c6aff)" }} />
              <img
                src="/pic-formal.png"
                className="relative w-36 h-36 rounded-full object-cover"
                style={{ border: "3px solid rgba(124, 106, 255, 0.5)" }}
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap justify-center gap-4">
            <a
              href="/resume.pdf"
              download="Apoorv_Sethi_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 dm"
              style={{ background: "linear-gradient(135deg, #00d4aa, #7c6aff)", color: "white" }}
            >
              Download Resume
            </a>
            <a href="https://github.com/apoorvsethi116" target="_blank" className="px-6 py-3 rounded-xl font-medium text-sm dm transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0" }}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/apoorv-sethi/" target="_blank" className="px-6 py-3 rounded-xl font-medium text-sm dm transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0" }}>
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-white/30" />
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-28 px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <p className="text-cyan-400 text-sm font-medium dm mb-3 tracking-widest uppercase">Who I am</p>
          <h2 className="text-5xl font-extrabold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-400 text-lg leading-relaxed dm mb-6">
                Detail-oriented MERN Stack Developer with strong foundations in Data Structures & Algorithms. I build scalable web applications, optimize backend performance, and craft efficient software solutions.
              </p>
              <p className="text-slate-400 dm leading-relaxed">
                Passionate about AI integration, I'm constantly exploring where machine learning meets real-world applications — from stock trading simulations to intelligent recruitment systems.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Java", "C++", "JavaScript", "React", "Node.js", "MongoDB", "DSA", "OOP", "Express", "REST APIs", "Git"].map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 rounded-xl text-sm font-medium dm cursor-default"
                  style={{ background: "rgba(124, 106, 255, 0.12)", border: "1px solid rgba(124, 106, 255, 0.25)", color: "#a78bfa" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-28 px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium dm mb-3 tracking-widest uppercase">What I've built</p>
            <h2 className="text-5xl font-extrabold">Projects</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-28 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-medium dm mb-3 tracking-widest uppercase">My toolkit</p>
          <h2 className="text-5xl font-extrabold">Skills</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-x-12">
          {skills.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-28 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-cyan-400 text-sm font-medium dm mb-3 tracking-widest uppercase">Get in touch</p>
          <h2 className="text-5xl font-extrabold mb-8">Contact</h2>

          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl dm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <a href="mailto:apoorv116oorv@gmail.com" className="flex items-center gap-3 text-lg text-slate-300 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              apoorv116oorv@gmail.com
            </a>
            <a href="tel:+919009260152" className="flex items-center gap-3 text-lg text-slate-300 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              +91 9009260152
            </a>
            <div className="flex gap-4 mt-2">
              <a href="https://github.com/apoorvsethi116" target="_blank" className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0" }}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/apoorv-sethi/" target="_blank" className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105" style={{ background: "rgba(0, 212, 170, 0.1)", border: "1px solid rgba(0, 212, 170, 0.3)", color: "#00d4aa" }}>
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="text-center pb-8 text-sm dm" style={{ color: "rgba(148,163,184,0.4)" }}>
        Designed & built by Apoorv Sethi
      </div>
    </div>
  );
}
