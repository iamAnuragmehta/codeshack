// TeamShowcaseHorizontal.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamShowcaseHorizontal({ dark = true }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const progressFillRef = useRef(null);
  const sectionsRef = useRef([]);

  const CS = {
    BLACK: "#000000",
    WHITE: "#FFFFFF",
    PINK: "#FF4FA3",
    LIGHT_PINK: "#F2A6FF",
    BLUE: "#3A66FF",
    DARK_BLUE: "#1A2B8F",
    ORANGE: "#F7931A",
  };

  const sections = [
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
  ];

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    gsap.killTweensOf("*");
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const totalPanels = sections.length;
    const totalShift = (totalPanels - 1) * -100;

    const horizontal = gsap.to(track, {
      xPercent: totalShift,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${window.innerWidth * (totalPanels - 1)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.fromTo(
      progressFillRef.current,
      { width: "0%" },
      {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${window.innerWidth * (totalPanels - 1)}`,
          scrub: 1,
        },
      }
    );

    const panels = sectionsRef.current.filter(Boolean);
    panels.forEach((panel) => {
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

    setTimeout(() => ScrollTrigger.refresh(), 50);
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [dark]);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        color: dark ? CS.WHITE : CS.BLACK,

        // ✅ THE NEW SUBTLE BRAND GRADIENT
        background: dark
          ? "linear-gradient(135deg, rgba(58,102,255,0.10), rgba(255,79,163,0.08), rgba(247,147,26,0.07))"
          : "linear-gradient(135deg, rgba(58,102,255,0.06), rgba(255,79,163,0.06), rgba(247,147,26,0.05))",
      }}
    >
      {/* Sticky container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Progress Bar */}
        <div
          style={{
            position: "absolute",
            top: "5rem",
            left: "10vw",
            width: "60vw",
            height: 10,
            background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            borderRadius: 999,
            overflow: "hidden",
            zIndex: 10,
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

        {/* Next Section */}
        <div
          style={{
            position: "absolute",
            right: "4vw",
            bottom: "5vh",
            fontSize: "0.9rem",
            opacity: 0.6,
            zIndex: 10,
          }}
        >
          Next Section →
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
          {sections.map((s, idx) => (
            <section
              key={s.id}
              ref={(el) => (sectionsRef.current[idx] = el)}
              style={{
                width: "100vw",
                height: "100vh",
                padding: "18vh 10vw",
                position: "relative",
                flexShrink: 0,
              }}
            >
              {/* Grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: dark
                    ? "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)"
                    : "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                  opacity: dark ? 0.08 : 0.15,
                  pointerEvents: "none",
                }}
              />

              {/* Content */}
              <span
                className="anim"
                style={{ color: s.accent, fontSize: "1rem", fontWeight: 600 }}
              >
                {s.subtitle}
              </span>

              <h1
                className="anim"
                style={{
                  fontSize: "clamp(2rem, 6vw, 3.6rem)",
                  fontWeight: 700,
                }}
              >
                {s.title}
              </h1>

              <p
                className="anim"
                style={{
                  maxWidth: 720,
                  marginTop: "1rem",
                  opacity: dark ? 0.75 : 0.85,
                }}
              >
                {s.description}
              </p>

              <div
                className="anim"
                style={{ display: "flex", gap: "2rem", marginTop: "1.2rem" }}
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
                    <div style={{ opacity: 0.6 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              <div
                className="anim"
                style={{ display: "flex", gap: 8, marginTop: 12 }}
              >
                {s.tags.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "6px 12px",
                      background: dark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)",
                      borderRadius: 999,
                      fontSize: "0.75rem",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
