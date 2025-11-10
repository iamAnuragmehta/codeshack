import { ChevronRight } from "lucide-react";
import { Button } from "./button.jsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// IMPORTANT: put this once in global CSS
// html { scroll-behavior: smooth; }

export function Hero({
  dark,
  eyebrow = "The Computing Clubs of Our Campus",
  title = "Codeshack — Where Builders, Hackers, and Creators Grow",
  subtitle = "A unified tech community housing Techub for full-stack development and robotics, and GLUG for GNU/Linux, open-source, and system-level engineering.",
  ctaLabel = "Explore Codeshack",
  ctaHref = "#about",
}) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // fast dome fade
  const domeOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  // smooth text fade
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const textColor = dark ? "#ffffff" : "#000000";
  const subColor = dark ? "#d1d1d1" : "#555555";
  const fadeColor = dark ? "black" : "white";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="
        relative mx-auto w-full h-[100vh] px-6 md:px-8
        overflow-hidden bg-transparent pt-32 md:pt-40 text-center
      "
    >
      {/* Dome */}
      <motion.div
        style={{
          opacity: domeOpacity,
          transition: "opacity 0.25s ease-out",
        }}
        className="
          absolute left-1/2
          top-[calc(100%-90px)] lg:top-[calc(100%-150px)]
          h-[500px] w-[700px]
          md:h-[500px] md:w-[1100px]
          lg:h-[750px] lg:w-[140%]
          -translate-x-1/2 rounded-[100%]
          pointer-events-none
        "
      >
        {/* Base Radial */}
        <div
          className="absolute inset-0 rounded-[100%]"
          style={{
            background: dark
              ? "radial-gradient(closest-side, #000000 82%, #ffffff)"
              : `radial-gradient(
                  closest-side,
                  #FFFFFF 20%,
                  #3A66FF 55%,
                  #F2A6FF 85%
                )`,
          }}
        />

        {/* Glow */}
        <div
          className="absolute inset-0 rounded-[100%]"
          style={{
            boxShadow: dark
              ? "0px -80px 150px rgba(255,255,255,0.05)"
              : "0px -80px 150px rgba(58,102,255,0.10)",
          }}
        />

        {/* Aura */}
        <div
          className="absolute inset-0 rounded-[100%]"
          style={{
            background: dark
              ? "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(255,79,163,0.10) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Text Content */}
      <motion.div
        style={{
          opacity: contentOpacity,
          transition: "opacity 0.35s ease-out",
        }}
      >
        {/* Eyebrow */}
        <a href={ctaHref} className="inline-block mb-4 relative z-10 group">
          <span
            className="
              text-xs md:text-sm px-4 py-2 rounded-full uppercase
              font-geist tracking-wide border transition-all duration-500
            "
            style={{
              color: dark ? "#cdcdcd" : "#444",
              borderColor: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
              background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            }}
          >
            {eyebrow}
            <ChevronRight className="inline w-4 h-4 ml-1 group-hover:translate-x-1 transition-all" />
          </span>
        </a>

        {/* Title */}
        <h1
          className="
            relative z-10
            font-semibold tracking-tight leading-tight
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            max-w-5xl mx-auto
          "
          style={{ color: textColor }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className="
            relative z-10 mt-6 text-base md:text-lg
            max-w-2xl mx-auto
          "
          style={{ color: subColor }}
        >
          {subtitle}
        </p>

        {/* CTA */}
        <div className="relative z-10 mt-10 flex justify-center">
          <Button
            asChild
            dark={dark}
            className="px-7 py-3 text-lg rounded-full shadow-lg transition-all"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      </motion.div>

      {/* Bottom Fade */}
      <div
        className="
          absolute bottom-0 left-0 w-full h-24 pointer-events-none z-20
        "
        style={{
          background: `linear-gradient(to top, ${fadeColor}, transparent)`,
        }}
      />
    </section>
  );
}
