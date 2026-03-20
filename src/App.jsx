import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "AI-Assisted Stock Trading Simulator",
    desc: "Full-stack MERN app with real-time stock APIs, portfolio tracking, and analytics dashboard.",
    link: "https://github.com/apoorvsethi116/Stock-trading-app.git",
    image: "/project1.jpg",
  },
  {
    title: "AI-Based Resume Ranking System",
    desc: "NLP-based resume screening using cosine similarity and semantic matching.",
    link: null,
    image: "/project2.jpg",
  }
];

export default function Portfolio() {

  // Typing Effect
  const roles = ["MERN Stack Developer", "AI Enthusiast", "DSA Learner", "Hackathon Winner"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    if (subIndex === roles[index].length) {
      setTimeout(() => setSubIndex(0), 1000);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(roles[index].substring(0, subIndex + 1));
      setSubIndex((prev) => prev + 1);
    }, 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index]);

  // Parallax Scroll
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 text-gray-800 scroll-smooth">

      {/* Glow */}
      <motion.div style={{ y }} className="absolute w-full h-full -z-10">
        <div className="absolute w-72 h-72 bg-blue-300 opacity-30 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-blue-200 opacity-30 rounded-full blur-3xl bottom-10 right-10"></div>
      </motion.div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/60 backdrop-blur-lg shadow-md fixed w-full top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-600">Apoorv Sethi</h1>
        <div className="space-x-8">
          {['home','about','projects','skills','contact'].map((item)=> (
            <a key={item} href={`#${item}`} className="capitalize hover:text-blue-500">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="flex flex-col justify-center items-center h-screen text-center px-4">
        <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:1}} className="text-6xl font-bold text-blue-700">
          <br />Hi, I'm Apoorv
        </motion.h1>

        <p className="mt-6 text-xl text-blue-600 font-medium h-8">
          {text}
          <span className="animate-pulse">|</span>
        </p>

        <motion.img
          src="/pic-formal.png"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="w-44 h-44 rounded-full mt-8 shadow-xl object-cover border-4 border-white"
        />

        <a href="/resume.pdf" className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-full shadow hover:scale-105 transition">
          Download Resume
        </a>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}} className="mt-6 flex gap-4">
          <a href="https://github.com/apoorvsethi116" target="_blank" className="px-5 py-2 bg-blue-600 text-white rounded-full hover:scale-110 transition">GitHub</a>
          <a href="https://www.linkedin.com/in/apoorv-sethi/" target="_blank" className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:scale-110 transition">LinkedIn</a>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-24 text-center max-w-4xl mx-auto">
        <motion.h2 initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl font-bold text-blue-600">About Me</motion.h2>
        
        <motion.p
          initial={{opacity:0}}
          whileInView={{opacity:1}}
          transition={{delay:0.3}}
          className="mt-6 text-gray-600 text-lg"
        >
          Detail-oriented MERN Stack Developer with strong foundations in Data Structures & Algorithms, seeking an opportunity in a growth-oriented technology company where I can build scalable web applications, optimize backend performance, and contribute efficient software solutions while continuously strengthening my technical expertise.
        </motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          {['Java','C++','JavaScript','React','Node.js','MongoDB','DSA'].map(skill => (
            <span key={skill} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 bg-blue-50">
        <motion.h2 initial={{opacity:0}} whileInView={{opacity:1}} className="text-4xl text-center font-bold text-blue-600">Projects</motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{opacity:0,y:50}}
              whileInView={{opacity:1,y:0}}
              whileHover={{scale:1.05}}
              transition={{delay:i*0.2}}
              className="rounded-xl overflow-hidden shadow-lg bg-white"
            >
              <div className="relative group">
                <img src={p.image} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  {p.link && (
                    <a href={p.link} target="_blank" className="bg-white px-4 py-2 rounded-full text-blue-600 font-medium">
                      View Code
                    </a>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-700">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 text-center">
        <motion.h2 initial={{opacity:0}} whileInView={{opacity:1}} className="text-4xl font-bold text-blue-600">Skills</motion.h2>
        <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:0.3}} className="mt-6 text-gray-600">
          Java, C++, JavaScript | React, Node.js, Express | MongoDB | DSA | OOP
        </motion.p>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 text-center">
        <motion.h2 initial={{opacity:0}} whileInView={{opacity:1}} className="text-4xl font-bold text-blue-600">Contact</motion.h2>
        <motion.p initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:0.3}} className="mt-4">apoorv116oorv@gmail.com</motion.p>
        <p>📞 9009260152</p>
      </section>
    </div>
  );
}
