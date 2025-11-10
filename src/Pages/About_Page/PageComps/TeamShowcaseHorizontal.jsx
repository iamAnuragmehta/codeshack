// TeamShowcaseHorizontal.jsx
import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define static color constants for clean use in useMemo
const BASE_CS = {
  BLACK: "#000000",
  WHITE: "#FFFFFF",
  PINK: "#FF4FA3",
  LIGHT_PINK: "#F2A6FF",
  BLUE: "#3A66FF",
  DARK_BLUE: "#1A2B8F",
  ORANGE: "#F7931A",
};

export default function TeamShowcaseHorizontal({ dark = true }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const progressFillRef = useRef(null);
  const sectionsRef = useRef(new Map());

  const PROGRESS_BAR_WIDTH = "40vw";
  const SECTION_PADDING = "18vh 10vw";

  // 1. Calculate themed styles (CS) based on the dark mode prop
  const CS = useMemo(
    () => ({
      ...BASE_CS,
      // Background: Radial gradient anchored at top-right for smooth black transition
      // Color stops match the aesthetic of the pink/light-pink blob.
      BACKGROUND: dark
        ? `radial-gradient(ellipse 700px 300px at 90% 0%, ${BASE_CS.PINK} 0%, rgba(0,0,0,0.8) 70%, ${BASE_CS.BLACK} 100%)`
        : `radial-gradient(ellipse 700px 300px at 90% 0%, ${BASE_CS.LIGHT_PINK} 0%, rgba(255,255,255,0.8) 70%, ${BASE_CS.WHITE} 100%)`,

      TEXT_COLOR: dark ? BASE_CS.WHITE : BASE_CS.BLACK,
      OPACITY_PRIMARY: dark ? 0.75 : 0.85,
      OPACITY_SECONDARY: dark ? 0.6 : 0.6,
      TRANSPARENT_BG: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      GRID_BG: dark
        ? "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)"
        : "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
      GRID_OPACITY: dark ? 0.08 : 0.15,
    }),
    [dark]
  );

  // 2. Define sections data, safely referencing CS accent colors
  const sections = useMemo(
    () => [
      {
        id: 1,
        subtitle: "January 2024",
        title: "Foundation",
        description:
          "Started our journey with a vision to build a community of passionate innovators. We united diverse talents to create something extraordinary. This marked the beginning of an ambitious movement that would grow beyond our initial expectations.",
        metrics: [
          { value: "10", label: "Founding Members" },
          { value: "3", label: "Core Teams" },
          { value: "1", label: "Shared Vision" },
        ],
        tags: ["Launch", "Community", "Innovation"],
        accent: CS.ORANGE,
      },

      {
        id: 2,
        subtitle: "March 2024",
        title: "First Projects",
        description:
          "Launched our first collaborative projects and established workflows. Teams executed seamlessly across domains, delivering consistent output. We learned essential lessons about collaboration, communication, and alignment.",
        metrics: [
          { value: "5", label: "Projects Launched" },
          { value: "25", label: "Active Members" },
          { value: "100%", label: "Success Rate" },
        ],
        tags: ["Development", "Collaboration", "Growth"],
        accent: CS.BLUE,
      },

      {
        id: 3,
        subtitle: "June 2024",
        title: "Community Growth",
        description:
          "Expanded to 70 members across 7 batches, forming an ecosystem of creativity. Mentorship, knowledge sessions, and collaboration strengthened our foundation, shaping us into a structured and scalable community.",
        metrics: [
          { value: "70", label: "Total Members" },
          { value: "7", label: "Active Batches" },
          { value: "4", label: "Departments" },
        ],
        tags: ["Expansion", "Diversity", "Mentorship"],
        accent: CS.PINK,
      },

      {
        id: 4,
        subtitle: "September 2024",
        title: "Recognition",
        description:
          "Achieved major milestones and were recognized for our innovation-driven approach. Our efforts gained visibility across industries, elevating our credibility and expanding our partnerships.",
        metrics: [
          { value: "15", label: "Awards" },
          { value: "50K+", label: "Community Reach" },
          { value: "20+", label: "Partnerships" },
        ],
        tags: ["Achievement", "Recognition", "Impact"],
        accent: CS.DARK_BLUE,
      },

      {
        id: 5,
        subtitle: "November 2024",
        title: "Today",
        description:
          "Continuing to push boundaries, explore new technologies, and build impactful products. Improving our systems, aligning our processes, and preparing the next line of innovators. The future holds unmatched potential.",
        metrics: [
          { value: "30+", label: "Active Projects" },
          { value: "∞", label: "Possibilities" },
          { value: "100%", label: "Commitment" },
        ],
        tags: ["Future", "Innovation", "Excellence"],
        accent: CS.LIGHT_PINK,
      },
    ],
    [CS]
  );

  // ----------------------------------------------------------
  // GSAP Horizontal Scroll Animation
  // ----------------------------------------------------------
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const totalPanels = sections.length;

    if (!wrapper || !track) return;

    // Kill all previous animations/triggers for clean re-initialization
    gsap.killTweensOf([track, progressFillRef.current]);
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const panelWidth = window.innerWidth;
    const scrollDistance = panelWidth * (totalPanels - 1);
    const totalShift = (totalPanels - 1) * -100;

    const scrollTriggerDefaults = {
      trigger: wrapper,
      start: "top top",
      end: () => `+=${scrollDistance}`,
      scrub: 1,
      invalidateOnRefresh: true,
    };

    // 1. Main Horizontal Scroll
    const horizontal = gsap.to(track, {
      xPercent: totalShift,
      ease: "none",
      scrollTrigger: {
        ...scrollTriggerDefaults,
        pin: true,
        anticipatePin: 1,
      },
    });

    // 2. Progress Bar Animation
    gsap.fromTo(
      progressFillRef.current,
      { width: "0%" },
      {
        width: "100%",
        ease: "none",
        scrollTrigger: scrollTriggerDefaults,
      }
    );

    // 3. Per-Panel Entrance Animation (Staggered Fade-in)
    sections.forEach((s) => {
      const panel = sectionsRef.current.get(s.id);
      if (!panel) return;

      const anims = panel.querySelectorAll(".anim");

      gsap.set(anims, { y: 40, opacity: 0 });

      gsap.to(anims, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horizontal,
          start: "left 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Final cleanup and refresh
    setTimeout(ScrollTrigger.refresh, 50);
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [dark, sections]);

  // ----------------------------------------------------------
  // UI Rendering
  // ----------------------------------------------------------

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        color: CS.TEXT_COLOR,
        // Using the radial gradient (CS.BACKGROUND) for the smooth blend
        background: CS.BACKGROUND,
      }}
    >
      {/* ---------------- Sticky container ---------------- */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          zIndex: 3,
        }}
      >
        {/* Navbar Container - Centered at the bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "5vh",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Progress Bar */}
          <div
            style={{
              width: PROGRESS_BAR_WIDTH,
              height: 10,
              background: CS.TRANSPARENT_BG,
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              ref={progressFillRef}
              style={{
                height: "100%",
                width: 0,
                background: dark ? CS.PINK : CS.BLUE,
                borderRadius: 999,
              }}
            />
          </div>

          {/* Next Section Indicator */}
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.9rem",
              opacity: CS.OPACITY_SECONDARY,
            }}
          >
            Next Section →
          </div>
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100%",
            willChange: "transform",
            zIndex: 5,
          }}
        >
          {sections.map((s) => (
            <section
              key={s.id}
              ref={(el) => {
                if (el) {
                  sectionsRef.current.set(s.id, el);
                } else {
                  sectionsRef.current.delete(s.id);
                }
              }}
              style={{
                width: "100vw",
                height: "100vh",
                padding: SECTION_PADDING,
                position: "relative",
                flexShrink: 0,
              }}
            >
              {/* Grid (Consistent Aesthetic) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: CS.GRID_BG,
                  backgroundSize: "26px 26px",
                  opacity: CS.GRID_OPACITY,
                  pointerEvents: "none",
                  zIndex: 4,
                }}
              />

              {/* Content Block */}
              <div style={{ position: "relative", zIndex: 5 }}>
                {/* Subtitle */}
                <span
                  className="anim"
                  style={{ color: s.accent, fontSize: "1rem", fontWeight: 600 }}
                >
                  {s.subtitle}
                </span>

                {/* Title */}
                <h1
                  className="anim"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 3.6rem)",
                    fontWeight: 700,
                  }}
                >
                  {s.title}
                </h1>

                {/* Description */}
                <p
                  className="anim"
                  style={{
                    maxWidth: 720,
                    marginTop: "1rem",
                    opacity: CS.OPACITY_PRIMARY,
                  }}
                >
                  {s.description}
                </p>

                {/* Metrics */}
                <div
                  className="anim"
                  style={{
                    display: "flex",
                    gap: "2rem",
                    marginTop: "1.2rem",
                  }}
                >
                  {s.metrics.map((m, i) => (
                    <div key={i}>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          fontWeight: 700,
                          color: s.accent,
                        }}
                      >
                        {m.value}
                      </div>
                      <div style={{ opacity: CS.OPACITY_SECONDARY }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags (Consistent Style) */}
                <div
                  className="anim"
                  style={{ display: "flex", gap: 8, marginTop: 12 }}
                >
                  {s.tags.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "6px 12px",
                        background: CS.TRANSPARENT_BG,
                        borderRadius: 999,
                        fontSize: "0.75rem",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
