// TeamReveal.jsx — 3-per-row centered grid + GitHub/LinkedIn/LeetCode + glowing particles

import React, { useMemo } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

/* ========= Codeshack Palette ========= */
const CS = {
  BLACK: "#000000",
  WHITE: "#FFFFFF",
  PINK: "#FF4FA3",
  LIGHT_PINK: "#F2A6FF",
  BLUE: "#3A66FF",
  DARK_BLUE: "#1A2B8F",
  ORANGE: "#F7931A",
};

/* ========= Data Definition (add `leetcode` where available) ========= */
const BASE_MEMBERS = [
  {
    name: "Lovish Jaiswal",
    title: "Frontend Developer | React, GSAP",
    role: "Core Technical",
    avatarUrl: "/src/utils/MemberImages/Lovish.png",
    bio: "Specializing in high-performance UIs and animated web experiences, focusing on GSAP and Framer Motion.",
    value: "Crafts immersive and interactive web experiences.",
    skills: "React · GSAP · Next.js · UI/UX",
    contribution: "Developed the core animation engine.",
    github: "https://github.com/lovishjaiswal",
    linkedin: "https://linkedin.com/in/lovishjaiswal",
    leetcode: "https://leetcode.com/u/lovishjaiswal", // <-- added
  },
  {
    name: "Nidhi Singh",
    title: "Social Media Designer | Figma, After Effects",
    role: "Core Design",
    avatarUrl: "/src/utils/MemberImages/Nidhi.png",
    bio: "Designs visual content for social platforms.",
    value: "Transforms ideas into visual narratives.",
    skills: "Figma · After Effects · Photoshop · Brand Identity",
    contribution: "Led visual rebranding efforts.",
    portfolio: "https://portfolio.com/nidhisingh",
    linkedin: "https://linkedin.com/in/example",
    leetcode: "https://leetcode.com/u/nidhisingh", // optional
  },
  {
    name: "Anurag",
    title: "App Developer | React Native, Firebase",
    role: "Core Technical",
    avatarUrl: "/src/utils/MemberImages/Anurag.png",
    bio: "Core contributor to mobile development.",
    value: "Builds high-performance mobile apps.",
    skills: "Flutter · Firebase · React Native · UI/UX",
    contribution: "Developed drone-control app.",
    github: "https://github.com/anurag",
    leetcode: "https://leetcode.com/u/anurag", // optional
  },
  {
    name: "Sanya Sahu",
    title: "Frontend Developer | Next.js, TypeScript",
    role: "Core Technical",
    avatarUrl: "/src/utils/MemberImages/Sanya.png",
    bio: "Key developer for main website.",
    value: "Ensures robust and scalable frontend solutions.",
    skills: "Next.js · TypeScript · React · Accessibility",
    contribution: "Architected responsive design.",
    linkedin: "https://linkedin.com/in/sanyasahu",
  },
  {
    name: "Varsha K N",
    title: "Team Manager | Project Planning, Scrum",
    role: "Core Technical",
    avatarUrl: "/src/utils/MemberImages/Varsha.png",
    bio: "Oversees team collaboration.",
    value: "Drives projects with leadership.",
    skills: "Project Management · Scrum · Agile · Leadership",
    contribution: "Managed flagship product rollout.",
  },
  {
    name: "Ankur Pathak",
    title: "Senior Manager | Strategy & Operations",
    role: "Core Manager",
    avatarUrl: "/src/utils/MemberImages/Ankur.png",
    bio: "Leads strategy and operations.",
    value: "Shapes direction and workflows.",
    skills: "Planning · Ops · Mentorship · Business",
    contribution: "Built onboarding program.",
  },
  {
    name: "Suparn",
    title: "Senior Manager | QA & Review",
    role: "Core Manager",
    avatarUrl: "/src/utils/MemberImages/Suparn.png",
    bio: "Maintains quality standards.",
    value: "Ensures consistency across outputs.",
    skills: "QA · Code Review · Risk · Processes",
    contribution: "Implemented QA pipeline.",
  },
  {
    name: "Bharat G P",
    title: "Senior Developer | DevOps, Cloud",
    role: "Lead Technical",
    avatarUrl: "/src/utils/MemberImages/Bharat.png",
    bio: "CI/CD and cloud specialist.",
    value: "Architects cloud infrastructure.",
    skills: "DevOps · AWS · Azure · CI/CD",
    contribution: "Moved backend to serverless.",
    github: "https://github.com/bharatgp",
    leetcode: "https://leetcode.com/u/bharatgp", // optional
  },
  {
    name: "Raghavendra Hande",
    title: "Senior App Dev | Flutter, Native APIs",
    role: "Lead Technical",
    avatarUrl: "/src/utils/MemberImages/Raghavendra.png",
    bio: "Mobile performance specialist.",
    value: "Builds high-performance native apps.",
    skills: "Flutter · Native APIs · Optimization",
    contribution: "Boosted startup time 60%.",
    github: "https://github.com/raghavendrahande",
  },
  {
    name: "Mohammed Sufyan B",
    title: "Social Media Manager",
    role: "Lead Socials",
    avatarUrl: "/src/utils/MemberImages/Sufyan.png",
    bio: "Manages engagement and outreach.",
    value: "Amplifies brand presence.",
    skills: "Content · Marketing · Analytics",
    contribution: "Grew following by 150%.",
  },
];

const DECLARED = [
  // Managers
  { name: "Suparn nayak", group: "Managers", label: "Core Manager" },
  { name: "Murali manohar", group: "Managers", label: "Core Manager" },
  { name: "Shivrudra", group: "Managers", label: "Core Manager" },
  { name: "Ankur", group: "Managers", label: "Core Manager" },
  { name: "Prajna", group: "Managers", label: "Lead Manager" },
  // Technical
  { name: "Supreeth", group: "Technical", label: "Core Technical" },
  { name: "Varsha K N", group: "Technical", label: "Core Technical" },
  { name: "Sanya sahu", group: "Technical", label: "Core Technical" },
  { name: "Deepanshu", group: "Technical", label: "Core Technical" },
  { name: "Rajeev tiwari", group: "Technical", label: "Core Technical" },
  { name: "Anurag", group: "Technical", label: "Core Technical" },
  { name: "Saurabh", group: "Technical", label: "Lead Technical" },
  { name: "Shishir", group: "Technical", label: "Lead Technical" },
  { name: "Bharath", group: "Technical", label: "Lead Technical" },
  { name: "Raghvendra", group: "Technical", label: "Lead Technical" },
  { name: "Rishabh", group: "Technical", label: "Lead Technical" },
  { name: "Shambhavi", group: "Technical", label: "Lead Technical" },
  // Design
  { name: "Swastik", group: "Design", label: "Core Design" },
  { name: "Nidhi", group: "Design", label: "Core Design" },
  { name: "Sajal", group: "Design", label: "Core Design" },
  { name: "Isha", group: "Design", label: "Lead Design" },
  { name: "Aishwarya", group: "Design", label: "Lead Design" },
  // Media + Social
  { name: "Lovish", group: "Media + Social", label: "Core Video Editor" },
  { name: "Nishitha", group: "Media + Social", label: "Lead Video Editor" },
  { name: "Sufyan", group: "Media + Social", label: "Lead Socials" },
];

/* ========= Utilities ========= */
const normalize = (s = "") => s.trim().toLowerCase();
const buildLookup = (arr) => {
  const m = new Map();
  arr.forEach((a) => m.set(normalize(a.name), a));
  return m;
};
const AVATAR_LOOKUP = buildLookup(BASE_MEMBERS);

const SECTIONS = [
  { key: "Managers", title: "Managers", accent: CS.ORANGE },
  { key: "Technical", title: "Technical Squad", accent: CS.BLUE },
  { key: "Design", title: "Design & Creative", accent: CS.PINK },
  { key: "Media + Social", title: "Media & Social", accent: CS.LIGHT_PINK },
];

/* ========= Fallback Avatar ========= */
function InitialAvatar({ name }) {
  const initials = useMemo(() => {
    const p = name.split(" ");
    return ((p[0]?.[0] || "") + (p[1]?.[0] || "")).toUpperCase();
  }, [name]);
  return <div className="cs-initial">{initials}</div>;
}

/* ========= Social Icon Button ========= */
function SocialIcon({ href, children, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="cs-social-btn"
      aria-label={label}
    >
      {children}
    </a>
  );
}

/* ========= Member Card ========= */
function DetailedCard({ item }) {
  const {
    name,
    title,
    role,
    avatarUrl,
    value,
    skills,
    contribution,
    github,
    linkedin,
    leetcode, // <-- use this
    portfolio,
  } = item;

  const dRole = role || "Team Member";
  const dValue = value || "A dedicated member of the team.";
  const dSkills = skills || "";
  const dContrib = contribution || "Contributed to major projects.";

  return (
    <div className="cs-detailed-card">
      <div className="cs-card-border" />
      <div className="cs-card-body">
        <div className="cs-header-info">
          <div className="cs-avatar-wrap">
            {avatarUrl ? (
              <img src={avatarUrl} className="cs-avatar" alt={name} />
            ) : (
              <InitialAvatar name={name} />
            )}
          </div>
          <div className="cs-text-wrap">
            <div className="cs-name">{name}</div>
            <div className="cs-role">{dRole}</div>
            <div className="cs-title">{title}</div>
          </div>
        </div>

        <p className="cs-value">"{dValue}"</p>

        <div className="cs-skills">
          <strong>Skills:</strong>
          {dSkills.split(" · ").map((s, i) =>
            s.trim() ? (
              <span key={i} className="cs-skill-tag">
                {s}
              </span>
            ) : null
          )}
        </div>

        <div className="cs-contribution">
          <strong>Contribution:</strong> {dContrib}
        </div>

        <div className="cs-link-separator" />

        {/* Social row */}
        <div className="cs-social-row">
          <SocialIcon href={github} label="GitHub">
            <FaGithub size={18} />
          </SocialIcon>
          <SocialIcon href={linkedin} label="LinkedIn">
            <FaLinkedin size={18} />
          </SocialIcon>
          <SocialIcon href={leetcode} label="LeetCode">
            <SiLeetcode size={18} />
          </SocialIcon>

          {/* Optional portfolio as text button on the right */}
          {portfolio && (
            <a
              href={portfolio}
              target="_blank"
              rel="noreferrer"
              className="cs-view-profile-btn"
              style={{ "--accent-color": CS.BLUE }}
            >
              View Portfolio →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========= Main ========= */
export default function TeamReveal({ dark = true }) {
  // Build grouped data
  const grouped = useMemo(() => {
    const map = new Map(SECTIONS.map((s) => [s.key, []]));
    DECLARED.forEach((d) => {
      const b = AVATAR_LOOKUP.get(normalize(d.name));
      const enriched = {
        name: d.name.replace(/\b\w/g, (c) => c.toUpperCase()),
        label: d.label,
        avatarUrl: b?.avatarUrl || null,
        title: b?.title || d.label,
        bio: b?.bio || null,
        value: b?.value || null,
        skills: b?.skills || "",
        contribution: b?.contribution || null,
        portfolio: b?.portfolio || null,
        linkedin: b?.linkedin || null,
        github: b?.github || null,
        leetcode: b?.leetcode || null, // include if present
        group: d.group,
      };
      map.get(d.group)?.push(enriched);
    });

    const rank = (s) => (/Lead/i.test(s) ? 0 : /Core/i.test(s) ? 1 : 2);
    SECTIONS.forEach((s) => {
      const arr = map.get(s.key) || [];
      arr.sort((a, b) => {
        const r = rank(a.label) - rank(b.label);
        if (r !== 0) return r;
        return a.name.localeCompare(b.name);
      });
    });

    return map;
  }, []);

  return (
    <div className={`cs-wrap ${dark ? "dark" : "light"}`}>
      {/* Glowing random particles */}
      {Array.from({ length: 48 }).map((_, i) => (
        <div
          key={i}
          className="cs-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${(Math.random() * 6).toFixed(2)}s`,
            animationDuration: `${(5 + Math.random() * 6).toFixed(2)}s`,
            boxShadow: dark
              ? "0 0 10px 2px rgba(255,255,255,0.4), 0 0 22px 6px rgba(58,102,255,0.25)"
              : "0 0 10px 2px rgba(0,0,0,0.35), 0 0 22px 6px rgba(58,102,255,0.20)",
            background:
              Math.random() > 0.7
                ? CS.PINK
                : Math.random() > 0.4
                ? CS.BLUE
                : CS.LIGHT_PINK,
            opacity: dark ? 0.7 : 0.55,
          }}
        />
      ))}

      {/* Subtle brand gradient backdrop */}
      <div className="cs-bg" aria-hidden />

      <header className="cs-header">
        <h1 className="cs-page-title">Meet the Full Team</h1>
        <p className="cs-page-sub">
          Managers, Technical, Design, and Media + Social
        </p>
      </header>

      <div className="cs-content-wrap">
        {SECTIONS.map((sec) => {
          const items = grouped.get(sec.key) || [];
          return (
            <section key={sec.key} className="cs-section">
              <div className="cs-section-head">
                <h2 className="cs-section-title" style={{ color: sec.accent }}>
                  {sec.title}
                </h2>
                <div
                  className="cs-section-accent"
                  style={{ background: sec.accent }}
                />
              </div>

              {/* Fixed 3-per-row centered grid */}
              <div className="cs-grid">
                {items.map((m, i) => (
                  <DetailedCard
                    key={`${sec.key}-${i}`}
                    item={{ ...m, role: m.label }}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <style>{`
        :root {
          --cs-black: ${CS.BLACK};
          --cs-white: ${CS.WHITE};
          --content-max-width: 1240px; /* centers 3 cards comfortably */
        }

        .cs-wrap {
          position: relative;
          min-height: 100vh;
          overflow: clip;
        }
        .cs-wrap.light { color: var(--cs-black); }
        .cs-wrap.dark { color: var(--cs-white); }

        /* Brand gradient backdrop */
        .cs-bg {
          position: fixed; inset: 0; z-index: -2;
          background:
            radial-gradient(1000px 520px at 10% 0%, ${CS.BLUE}26, transparent 60%),
            radial-gradient(1000px 520px at 90% 20%, ${CS.PINK}22, transparent 60%),
            radial-gradient(1000px 520px at 50% 100%, ${CS.ORANGE}1f, transparent 60%);
          pointer-events: none;
        }
        .cs-wrap.dark { background-color: ${CS.BLACK}; }
        .cs-wrap.light { background-color: ${CS.WHITE}; }

        /* Glowing particles */
        .cs-particle {
          position: absolute;
          z-index: -1;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          filter: blur(0.2px);
          animation-name: csDrift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
        @keyframes csDrift {
          0%   { transform: translate(0, 0) scale(1);   opacity: .65; }
          25%  { transform: translate(10px, -14px) scale(1.2); opacity: .95; }
          50%  { transform: translate(-12px, 8px) scale(0.9); opacity: .75; }
          75%  { transform: translate(6px, 16px) scale(1.1); opacity: .9; }
          100% { transform: translate(0, 0) scale(1);   opacity: .65; }
        }

        /* Header */
        .cs-header {
          padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 6vw, 6vw) clamp(1rem, 3vw, 1.5rem);
          max-width: var(--content-max-width);
          margin: 0 auto;
        }
        .cs-page-title { margin: 0; font-weight: 700; letter-spacing: -0.02em; font-size: clamp(24px, 5vw, 48px); }
        .cs-page-sub { margin: .6rem 0 0; opacity: .8; max-width: 900px; font-size: clamp(12px, 2vw, 18px); }

        /* Content wrapper */
        .cs-content-wrap {
          max-width: var(--content-max-width);
          margin: 0 auto;
          padding: 0 clamp(1rem, 6vw, 6vw) clamp(2rem, 5vw, 5rem);
        }

        .cs-section { padding: 0 0 clamp(2rem, 5vw, 3.2rem) 0; }
        .cs-section-head { display: flex; align-items: center; gap: 1rem; margin-bottom: clamp(0.8rem, 2vw, 1.2rem); flex-wrap: wrap; }
        .cs-section-title { margin: 0; font-size: clamp(18px, 3.2vw, 32px); font-weight: 700; letter-spacing: -0.01em; }
        .cs-section-accent { height: 6px; width: 64px; border-radius: 999px; opacity: .5; }

        /* Fixed 3-per-row centered grid */
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 3vw, 24px);
          max-width: 1100px;
          margin: 0 auto; /* centers the 3-column grid */
        }
        @media (max-width: 1100px) {
          .cs-grid { grid-template-columns: repeat(2, 1fr); max-width: 740px; }
        }
        @media (max-width: 768px) {
          .cs-grid { grid-template-columns: repeat(2, 1fr); gap: clamp(12px, 3vw, 18px); max-width: 100%; }
        }
        @media (max-width: 640px) {
          .cs-grid { 
            display: flex;
            flex-direction: row;
            gap: 16px;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            padding: 0 1rem 1rem 1rem;
            margin: 0;
            max-width: 100%;
            scroll-snap-type: x mandatory;
          }
          .cs-grid::-webkit-scrollbar {
            height: 6px;
          }
          .cs-grid::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .cs-grid::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
          }
          .cs-grid::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
          .light .cs-grid::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
          }
          .light .cs-grid::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.3);
          }
          .light .cs-grid::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.5);
          }
        }

        /* Card */
        .cs-detailed-card {
          position: relative; border-radius: clamp(12px, 3vw, 18px); isolation: isolate; overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.12); transition: box-shadow 200ms ease, transform 200ms ease;
        }
        .cs-detailed-card:hover { box-shadow: 0 10px 28px rgba(0,0,0,0.28); transform: translateY(-2px); }
        
        @media (max-width: 640px) {
          .cs-detailed-card {
            min-width: 280px;
            flex-shrink: 0;
            scroll-snap-align: start;
            scroll-snap-stop: always;
          }
        }

        .cs-card-border {
          position: absolute; inset: 0; border-radius: clamp(12px, 3vw, 18px); padding: 1px;
          background: linear-gradient(135deg, ${CS.BLUE}, ${CS.PINK}, ${CS.ORANGE});
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; z-index: 0; opacity: .8;
        }
        .cs-card-body {
          position: relative; z-index: 1; border-radius: clamp(11px, 2.5vw, 16px); padding: clamp(12px, 3vw, 18px);
          display: flex; flex-direction: column; align-items: flex-start; text-align: left;
          height: 100%; border: 1px solid rgba(255,255,255,0.14);
          backdrop-filter: blur(10px) saturate(180%);
          background: rgba(20,20,20,.72);
          gap: clamp(6px, 2vw, 8px);
        }
        .light .cs-card-body {
          border-color: rgba(0,0,0,0.12);
          background: rgba(255,255,255,0.9);
        }

        .cs-header-info { 
          display: flex; align-items: center; gap: clamp(10px, 2vw, 16px); 
          margin-bottom: 0;
          flex-shrink: 0;
        }
        .cs-text-wrap { 
          display: flex; flex-direction: column; justify-content: center; 
          flex: 1; min-width: 0;
        }
        .cs-avatar, .cs-initial {
          width: clamp(50px, 12vw, 70px); height: clamp(50px, 12vw, 70px); 
          border-radius: 50%; object-fit: cover;
          border: 3px solid ${CS.PINK}44; display: grid; place-items: center; flex-shrink: 0;
        }
        .cs-initial { font-size: clamp(16px, 4vw, 24px); font-weight: 700; background: linear-gradient(135deg, ${CS.DARK_BLUE}, ${CS.BLUE}); color: ${CS.WHITE}; }

        .cs-name { font-weight: 700; font-size: clamp(14px, 3vw, 19px); letter-spacing: -0.01em; word-break: break-word; }
        .cs-role { font-size: clamp(12px, 2vw, 14px); opacity: 0.8; margin-bottom: 2px; }
        .cs-title { font-size: clamp(11px, 1.5vw, 13px); opacity: 0.7; }

        .cs-value {
          font-style: italic; font-size: clamp(12px, 1.5vw, 14px); line-height: 1.5; opacity: 0.9;
          margin: 0; padding-left: 10px; border-left: 3px solid ${CS.BLUE}55;
          flex-grow: 1;
        }

        .cs-skills {
          font-size: clamp(11px, 1.5vw, 13px); opacity: 0.9; margin-bottom: 0;
          display: flex; flex-wrap: wrap; align-items: center; gap: clamp(4px, 1vw, 6px);
          width: 100%;
        }
        .cs-skills strong { font-weight: 600; margin-right: 4px; }
        .cs-skill-tag {
          background-color: rgba(255,255,255,0.1);
          padding: clamp(3px, 1vw, 4px) clamp(6px, 1.5vw, 8px); 
          border-radius: 6px; font-size: clamp(10px, 1.2vw, 11px);
          border: 1px solid rgba(255,255,255,0.15);
          white-space: nowrap;
        }
        .light .cs-skill-tag {
          background-color: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.1);
        }

        .cs-contribution { 
          font-size: clamp(11px, 1.5vw, 13px); opacity: 0.9; margin-bottom: 0;
          word-break: break-word;
        }
        .cs-contribution strong { font-weight: 600; margin-right: 4px; }

        .cs-link-separator { width: 100%; height: 1px; background: rgba(255,255,255,0.14); margin: clamp(6px, 1.5vw, 8px) 0; }
        .light .cs-link-separator { background: rgba(0,0,0,0.1); }

        /* Social row: left icons + right button */
        .cs-social-row {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          gap: clamp(6px, 1vw, 10px); flex-wrap: wrap;
        }
        .cs-social-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: clamp(32px, 8vw, 36px); height: clamp(32px, 8vw, 36px); 
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: ${CS.WHITE};
          transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
          flex-shrink: 0;
        }
        .cs-social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(58,102,255,0.35);
          background: rgba(255,255,255,0.14);
        }
        .light .cs-social-btn {
          background: rgba(0,0,0,0.05);
          border-color: rgba(0,0,0,0.08);
          color: ${CS.BLACK};
        }
        .light .cs-social-btn:hover {
          box-shadow: 0 6px 16px rgba(58,102,255,0.25);
          background: rgba(0,0,0,0.08);
        }

        .cs-view-profile-btn {
          font-size: clamp(11px, 1.5vw, 13px); 
          text-decoration: none; 
          padding: clamp(8px, 1.5vw, 10px) clamp(14px, 2vw, 18px); 
          border-radius: 999px;
          border: none; color: ${CS.WHITE};
          background: var(--accent-color);
          display: inline-flex; align-items: center; gap: 6px;
          font-weight: 600; transition: transform 160ms ease, box-shadow 160ms ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          white-space: nowrap;
          min-height: clamp(30px, 7vw, 36px);
        }
        .cs-view-profile-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }
        .light .cs-view-profile-btn { color: ${CS.WHITE}; }

        @media (max-width: 640px) {
          .cs-wrap { overflow-x: hidden; }
          .cs-particle { display: none; }
          .cs-section-head { margin-bottom: 1rem; }
        }
      `}</style>
    </div>
  );
}
