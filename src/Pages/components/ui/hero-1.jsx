import { ChevronRight } from "lucide-react";
import { Button } from "./button.jsx";

export function Hero({
  dark,
  eyebrow = "The Computing Clubs of Our Campus",
  title = "Codeshack — Where Builders, Hackers, and Creators Grow",
  subtitle = "A unified tech community housing Techub for full-stack development and robotics, and GLUG for GNU/Linux, open-source, and system-level engineering.",
  ctaLabel = "Explore Codeshack",
  ctaHref = "#",
}) {
  const textColor = dark ? "#ffffff" : "#000000";
  const subColor = dark ? "#d1d1d1" : "#555555";
  const fadeColor = dark ? "black" : "white";

  return (
    <section
      id="hero"
      className="
        relative mx-auto w-full h-[100vh] px-6 md:px-8 
        overflow-hidden bg-transparent pt-32 md:pt-40 text-center
      "
    >
      {/* ✅ Radial Accent + Glow */}
      <div
        className="
          absolute left-1/2
          top-[calc(100%-90px)] lg:top-[calc(100%-150px)]
          h-[500px] w-[700px]
          md:h-[500px] md:w-[1100px]
          lg:h-[750px] lg:w-[140%]
          -translate-x-1/2 rounded-[100%]
          animate-fade-up transition-all duration-500
        "
        style={{
          background: dark
            ? /* ✅ DARK MODE (unchanged, already good) */
              "radial-gradient(closest-side, #000000 82%, #ffffff)"
            : /* ✅ LIGHT MODE (Codeshack Colors) */
              `radial-gradient(
                closest-side,
                rgba(242,166,255,0.55) 25%,  /* light pink */
                rgba(58,102,255,0.40) 55%,  /* blue */
                rgba(255,79,163,0.32) 85%   /* pink */
              )`,
          filter: dark
            ? "drop-shadow(0px -40px 120px rgba(255,255,255,0.08)) drop-shadow(0px -60px 140px rgba(255,255,255,0.03))"
            : "drop-shadow(0px -40px 140px rgba(58,102,255,0.10)) drop-shadow(0px -60px 160px rgba(255,79,163,0.08))",
        }}
      >
        {/* Inner Glow */}
        <div
          className="absolute inset-0 rounded-[100%] pointer-events-none"
          style={{
            boxShadow: dark
              ? "0px -80px 150px rgba(255,255,255,0.05)"
              : "0px -80px 150px rgba(58,102,255,0.12)",
          }}
        ></div>

        {/* Aura Ring */}
        <div
          className="absolute inset-0 rounded-[100%] pointer-events-none"
          style={{
            background: dark
              ? "radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, transparent 65%)"
              : "radial-gradient(circle at center, rgba(255,79,163,0.10) 0%, transparent 70%)",
          }}
        ></div>

        {/* Shadow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-12 rounded-full pointer-events-none"
          style={{
            boxShadow: dark
              ? "0px -20px 60px rgba(255,255,255,0.05)"
              : "0px -20px 60px rgba(0,0,0,0.10)",
          }}
        />
      </div>

      {/* ✅ Eyebrow */}
      <a href="#" className="inline-block mb-4 relative z-10 group">
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

      {/* ✅ Title */}
      <h1
        className="
          relative z-10 
          font-semibold tracking-tight leading-tight 
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          max-w-5xl mx-auto transition-colors duration-500
        "
        style={{ color: textColor }}
      >
        {title}
      </h1>

      {/* ✅ Subtitle */}
      <p
        className="
          relative z-10 mt-6 text-base md:text-lg 
          max-w-2xl mx-auto transition-colors duration-500
        "
        style={{ color: subColor }}
      >
        {subtitle}
      </p>

      {/* ✅ CTA Button */}
      <div className="relative z-10 mt-10 flex justify-center">
        <Button
          asChild
          dark={dark}
          className="px-7 py-3 text-lg rounded-full shadow-lg transition-all"
        >
          <a href={ctaHref}>{ctaLabel}</a>
        </Button>
      </div>

      {/* ✅ Bottom Fade */}
      <div
        className="
          absolute bottom-0 left-0 w-full h-24 pointer-events-none 
          z-20 transition-all duration-500
        "
        style={{
          background: `linear-gradient(to top, ${fadeColor}, transparent)`,
        }}
      />
    </section>
  );
}
