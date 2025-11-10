import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Introduction.css";

export default function Introduction({ dark }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 25]);

  const domeOpacity = useTransform(scrollYProgress, [0, 0.3], [0.35, 0]);
  const domeScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.22]);

  // ✅ Scroll-snap to profiles
  useEffect(() => {
    let timeout;
    const handler = () => {
      const intro = ref.current;
      const next = document.getElementById("profiles-section");
      if (!intro || !next) return;

      const rect = intro.getBoundingClientRect();
      if (rect.bottom < window.innerHeight * 0.45) {
        timeout = setTimeout(() => {
          next.scrollIntoView({ behavior: "smooth" });
        }, 80);
      }
    };

    window.addEventListener("scroll", handler);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <section
      id="intro-section"
      ref={ref}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: dark ? "#000" : "#fff" }}
    >
      {/* ✅ Parallax Blobs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{
          background: dark ? "#3A66FF44" : "#3A66FF33",
          top: "-18%",
          left: "-18%",
        }}
        animate={{ x: [0, 25, -15, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full blur-[150px]"
        style={{
          background: dark ? "#FF4FA355" : "#F2A6FF55",
          bottom: "-18%",
          right: "-18%",
        }}
        animate={{ x: [0, -30, 18, 0], y: [0, 20, -18, 0] }}
        transition={{ duration: 24, repeat: Infinity }}
      />

      {/* ✅ Radial Dome */}
      <motion.div
        className="absolute w-[150%] h-[120%] rounded-full pointer-events-none"
        style={{
          top: "12%",
          left: "50%",
          translateX: "-50%",
          background: dark
            ? "radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)"
            : "radial-gradient(circle, rgba(0,0,0,0.08), transparent 70%)",
          opacity: domeOpacity,
          scale: domeScale,
        }}
      />

      {/* ✅ Floating Particles */}
      {Array.from({ length: 26 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full"
          style={{
            background: dark ? "#ffffff40" : "#00000040",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ✅ CONTENT */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ opacity, scale, y }}
      >
        {/* Eyebrow */}
        <div
          className="mb-3 text-sm tracking-wide font-medium"
          style={{ color: dark ? "#e8e8e8" : "#333" }}
        >
          <span>{"<CODESHACK />"}</span>
        </div>

        {/* ✅ Title With Shimmer */}
        <h1
          className="font-semibold leading-tight relative overflow-hidden"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 4.7rem)",
            color: dark ? "#fff" : "#000",
          }}
        >
          The Powerhouse of
          <br />
          <span className="relative inline-block shimmer-text">
            Developers, Hackers & Linux Minds
          </span>
        </h1>

        {/* ✅ Short Strong Description */}
        <p
          className="text-lg max-w-2xl mx-auto mt-5"
          style={{ color: dark ? "#d1d1d1" : "#555" }}
        >
          Codeshack blends two forces—
          <b> Techub</b> for engineering & AI,
          <b> GLUG</b> for Linux & open-source.
          <br />
          Together, we turn curiosity into mastery.
        </p>

        {/* ✅ Stats */}
        <div className="mt-10 flex justify-center gap-10">
          {[
            ["70+", "Members"],
            ["7", "Batches"],
            ["2", "Core Clubs"],
          ].map(([num, label]) => (
            <div key={label}>
              <div
                className="font-semibold text-3xl"
                style={{ color: dark ? "#fff" : "#000" }}
              >
                {num}
              </div>
              <div
                className="text-sm"
                style={{ color: dark ? "#ccc" : "#555" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Scroll Arrow (Minimal Bounce) */}
        <motion.div
          className="mt-12 flex flex-col items-center"
          style={{ color: dark ? "#999" : "#444" }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <div className="text-xl">↓</div>
          <div className="text-xs opacity-60 mt-1">Scroll to continue</div>
        </motion.div>
      </motion.div>

      <div id="intro-section-end" className="absolute bottom-[20%]" />
    </section>
  );
}
