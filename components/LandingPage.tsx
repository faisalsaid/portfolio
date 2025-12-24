"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Code2,
  Palette,
  Terminal,
  ExternalLink,
  Mail,
  Github,
  Instagram,
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const words = ["Fast.", "Beautiful.", "Reliable."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Berganti setiap 3 detik
    return () => clearInterval(timer);
  }, []);

  // Smooth scroll progress for progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  // Parallax: Astronot naik pelan saat scroll ke bawah
  const astronautY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  // Parallax: Terminal naik lebih cepat (efek kedalaman)
  //   const terminalY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const currentYear = new Date().getFullYear();

  return (
    <main
      ref={containerRef}
      className="bg-[#030712] text-white min-h-screen selection:bg-cyan-500/30"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section with Parallax Elements */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Background Decorative Circles */}
        <motion.div
          style={{ y: y1, rotate }}
          className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-600/20 rounded-full blur-[100px]"
        />

        {/* --- ASTRONOT (Kiri Bawah) --- */}
        <motion.div
          style={{ y: astronautY }} // Efek Parallax
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -50, 0], // Efek Melayang (Floating)
          }}
          transition={{
            opacity: { duration: 1 },
            x: { duration: 1 },
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="hidden md:block absolute bottom-[10%] left-[5%]  z-20 w-64 h-64 md:w-3xl md:h-128"
        >
          <div className="relative w-full h-full">
            <Image
              src="/img/astronot.png" // Pastikan file ada di folder public
              alt="Floating Astronaut"
              fill
              className="object-contain drop-shadow-[0_0_50px_rgba(34,211,238,0.3)]"
            />
          </div>
        </motion.div>

        <div className="z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-cyan-400 font-mono mb-4 text-lg tracking-widest">
              WEB DEVELOPER & UI/UX DESIGNER
            </h2>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white leading-tight text-center">
              Digitalize <br />
              Your Business <br />
              <span className="relative inline-block h-[1.2em] w-full overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-x-0 bottom-0 mx-auto bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block text-center"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-slate-400 text-lg mb-8">
              Creating beautiful, fast, and reliable websites that help your
              business grow online.
            </p>
          </motion.div>

          <motion.div
            className="block md:flex gap-4 justify-center "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-cyan-400 transition-colors duration-300 mb-4 md:mb-0">
              Let’s Build Something Great
            </button>
            <button className="border border-slate-700 px-8 py-3 rounded-full font-bold hover:border-white transition-all">
              Get a Free Consultation
            </button>
          </motion.div>
        </div>

        {/* Floating Code Icon Parallax */}
        <motion.div
          style={{ y: y2 }}
          className="absolute right-[15%] top-[20%] opacity-20 hidden md:block"
        >
          <Terminal size={120} />
        </motion.div>
      </section>

      {/* Section Profil / About Me */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
        {/* Dekorasi Latar Belakang - Glow di belakang foto */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-125 h-125 bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Kolom Foto Profil - Sekarang lebih lebar (6 kolom) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 relative flex justify-center lg:justify-start order-1 lg:order-2 "
          >
            <div className="relative w-full max-w-200 ">
              {/* Ukuran maksimal diperbesar */}
              {/* Foto Tanpa Bingkai */}
              <motion.img
                src="/img/foto-profil.png" // GANTI DENGAN PATH FOTO KAMU
                alt="Profile Portrait"
                className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-400 cursor-pointer drop-shadow-[0_20px_50px_rgba(8,145,178,0.2)] scale-150"
                // EFEK BERGERAK KE ATAS SAAT HOVER
                whileHover={{
                  y: -10, // Bergerak naik 20 pixel
                  scale: 1.02, // Sedikit membesar untuk efek depth
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                // Transisi kembali ke posisi awal
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
              {/* Aksen Kotak Melayang Tetap Ada sebagai pelengkap */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute bottom-10 right-0 bg-[#0f172a]/80 border border-cyan-500/30 p-5 rounded-2xl backdrop-blur-xl z-20 hidden md:block"
              >
                <span className="text-3xl font-bold text-white block">4+</span>
                <span className="text-slate-400 text-xs uppercase tracking-wider">
                  Years Exp
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Kolom Deskripsi (6 kolom) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 font-mono text-sm relative z-20">
                ABOUT ME
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Art in <span className="text-cyan-400">Code</span> & Design.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                Technology should not only work well, but also look beautiful.
                This transparent background reflects my flexibility and
                readiness to adapt to your digital vision.
              </p>
            </div>

            {/* List Keahlian Singkat */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-white text-xl mb-2">
                  Modern Tech
                </h4>
                <p className="text-sm text-slate-500">
                  Built with React, Next.js, and Framer Motion to deliver
                  smooth, high-quality animations.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white text-xl mb-2">
                  User Centric
                </h4>
                <p className="text-sm text-slate-500">
                  Creating seamless and intuitive user flows.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button className="group flex items-center gap-3 bg-white/5 hover:bg-cyan-500 border border-white/10 hover:border-cyan-400 text-white hover:text-black px-8 py-4 rounded-2xl transition-all duration-300 font-bold">
                Get In Touch
                <Mail
                  size={20}
                  className="group-hover:rotate-12 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section with Reveal Animation */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all group"
          >
            <div className="bg-cyan-500/10 p-4 w-fit rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="text-cyan-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Frontend Engineering</h3>
            <p className="text-slate-400 leading-relaxed">
              Building fast, responsive, and SEO-friendly web applications with
              React, Next.js, and Tailwind CSS.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all group"
          >
            <div className="bg-purple-500/10 p-4 w-fit rounded-2xl mb-6 group-hover:scale-110 transition-transform">
              <Palette className="text-purple-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">UI/UX Design</h3>
            <p className="text-slate-400 leading-relaxed">
              Designing intuitive, user-centered prototypes using Figma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-slate-500">
              © {new Date().getFullYear()} Crafted with ☕ on Molucass
            </p>
          </div>
          <div className="flex gap-6">
            <Github className="cursor-pointer hover:text-cyan-400 transition-colors" />
            <Instagram className="cursor-pointer hover:text-cyan-400 transition-colors" />
            <Mail className="cursor-pointer hover:text-cyan-400 transition-colors" />
          </div>
        </div>
      </footer>
    </main>
  );
}
