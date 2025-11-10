import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Timeline from "./Timeline";
import EventDetail from "./EventDetail";
import tv5 from "../../assets/TechVistara5.jpg";
import "./Introduction.css";

const events = [
  {
    id: 1,
    title: "TechVistara 5.0",
    date: "12 Nov 2025",
    desc: "TechVistara 5.0 — Where code meets creativity and ideas spark innovation! 🚀Dive into the world of tech, explore every domain, and build the future 👨‍💻",
    long: `🚀 Registrations for TechVistara 5.0 are now open!
    Get ready to dive into the world of technology as we introduce you to the exciting domains of our club — from coding and design to AI and beyond! 💡 
    Join us for an interactive session filled with fun games, insights, and a glimpse into what our tech community has to offer.

📅 Register now: https://forms.gle/yvSKdSEBtHRUy2f67
📌Date: 12th November 2025
📍Venue: New Auditorium

Let’s kickstart your tech journey with TechVistara 5.0! 💫`,
    visual: tv5,
    poster: "",
  },
];

export default function Introduction({ dark }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [selectedId, setSelectedId] = useState(null);

  const selected = events.find((e) => e.id === selectedId) || null;

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
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
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
        {/* ✅ Title With Shimmer */}
        <h1
          className="font-semibold leading-tight relative overflow-hidden"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 4.7rem)",
            color: dark ? "#fff" : "#000",
          }}
        >
          <span className="relative inline-block shimmer-text text-left">
            Events
          </span>
        </h1>

        <div
          className="mb-3 text-sm tracking-wide font-medium"
          style={{ color: dark ? "#e8e8e8" : "#333" }}
        >
          <span>Explore our past and upcoming events — click any item to read more.</span>
        </div>
      </motion.div>

      <Timeline events={events} onSelect={(id) => setSelectedId(id)} />

      {selected && (
        <EventDetail
          event={selected}
          onClose={() => setSelectedId(null)}
          onPrev={() => {
            const idx = events.findIndex((x) => x.id === selected.id);
            const prev = events[idx - 1];
            if (prev) setSelectedId(prev.id);
          }}
          onNext={() => {
            const idx = events.findIndex((x) => x.id === selected.id);
            const next = events[idx + 1];
            if (next) setSelectedId(next.id);
          }}
        />
      )}

      <div id="intro-section-end" className="absolute bottom-[20%]" />
    </section>
  );
}
