// TeamReveal.jsx - Enhanced Detailed Cards with new fields

import React, { useMemo } from "react";

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

/* ========= Data Definition (All Members - NEW FIELDS ADDED) ========= */
const BASE_MEMBERS = [
  {
    name: "Lovish Jaiswal",
    title: "Frontend Developer | React, GSAP",
    role: "Core Technical", // Mapped from DECLARED 'label'
    avatarUrl: "/src/utils/MemberImages/Lovish.png",
    bio: "Specializing in high-performance UIs and animated web experiences, focusing on GSAP and Framer Motion integration for smooth page transitions.",
    value: "Crafts immersive and interactive web experiences.", // NEW
    skills: "React · GSAP · Next.js · UI/UX", // NEW
    contribution:
      "Developed the core animation engine for our main marketing site.", // NEW
    github: "https://github.com/lovishjaiswal",
    linkedin: "https://linkedin.com/in/lovishjaiswal",
  },
  {
    name: "Nidhi Singh",
    title: "Social Media Designer | Figma, After Effects",
    role: "Core Design", // Mapped from DECLARED 'label'
    avatarUrl: "/src/utils/MemberImages/Nidhi.png",
    bio: "Designs all visual content for social platforms, ensuring brand consistency and engagement across digital channels.",
    value:
      "Transforms ideas into captivating visual narratives for social media.", // NEW
    skills: "Figma · After Effects · Photoshop · Brand Identity", // NEW
    contribution:
      "Led the visual rebranding efforts for our social media channels.", // NEW
    portfolio: "https://portfolio.com/nidhisingh",
  },
  {
    name: "Anurag",
    title: "App Developer | React Native, Firebase",
    role: "Core Technical", // Mapped from DECLARED 'label'
    avatarUrl: "/src/utils/MemberImages/Anurag.png",
    bio: "Core contributor to cross-platform mobile application development, focusing on scalable backend integrations.",
    value: "Builds high-performance mobile apps with clean architecture.", // NEW - Example provided
    skills: "Flutter · Firebase · React Native · UI/UX", // NEW - Example provided
    contribution: "Developed drone-control mobile app.", // NEW - Example provided
    github: "https://github.com/anurag",
  },
  {
    name: "Sanya Sahu",
    title: "Frontend Developer | Next.js, TypeScript",
    role: "Core Technical",
    avatarUrl: "/src/utils/MemberImages/Sanya.png",
    bio: "Key developer for the main Codeshack website, driving architecture and accessibility standards.",
    value:
      "Ensures robust and scalable frontend solutions for web applications.",
    skills: "Next.js · TypeScript · React · Accessibility",
    contribution: "Architected the new Codeshack website's responsive design.",
    linkedin: "https://linkedin.com/in/sanyasahu",
  },
  {
    name: "Varsha K N",
    title: "Team Manager | Project Planning, Scrum",
    role: "Core Technical", // Mapped from DECLARED 'label'
    avatarUrl: "/src/utils/MemberImages/Varsha.png",
    bio: "Oversies team collaboration and ensures project milestones are met on time and within scope.",
    value:
      "Drives projects from conception to completion with effective leadership.",
    skills:
      "Project Management · Scrum · Agile Methodologies · Team Leadership",
    contribution: "Successfully managed the rollout of our flagship product.",
  },
  {
    name: "Ankur Pathak",
    title: "Senior Manager | Strategy & Operations",
    role: "Core Manager", // Mapped from DECLARED 'label'
    avatarUrl: "/src/utils/MemberImages/Ankur.png",
    bio: "Leads organizational strategy, resource allocation, and team mentorship programs.",
    value: "Shapes strategic direction and optimizes operational workflows.",
    skills:
      "Strategic Planning · Operations Management · Mentorship · Business Development",
    contribution:
      "Developed a new employee onboarding program that reduced ramp-up time by 30%.",
  },
  {
    name: "Suparn",
    title: "Senior Manager | Quality Assurance & Review",
    role: "Core Manager", // Mapped from DECLARED 'label'
    avatarUrl: "/src/utils/MemberImages/Suparn.png",
    bio: "Dedicated to maintaining high standards across all technical and creative outputs.",
    value:
      "Ensures the highest quality and consistency across all project deliverables.",
    skills:
      "Quality Assurance · Code Review · Process Improvement · Risk Management",
    contribution:
      "Implemented a new QA pipeline reducing critical bugs by 50%.",
  },
  {
    name: "Bharat G P",
    title: "Senior Developer | DevOps, Cloud Architecture",
    role: "Lead Technical",
    avatarUrl: "/src/utils/MemberImages/Bharat.png",
    bio: "Specialist in setting up continuous integration/deployment pipelines and cloud infrastructure management.",
    value:
      "Architects robust cloud infrastructure and streamlines development cycles.",
    skills: "DevOps · AWS · Azure · CI/CD · Cloud Security",
    contribution:
      "Migrated our entire backend to a serverless architecture, reducing costs by 40%.",
    github: "https://github.com/bharatgp",
  },
  {
    name: "Raghavendra Hande",
    title: "Senior App Developer | Flutter, Native APIs",
    role: "Lead Technical",
    avatarUrl: "/src/utils/MemberImages/Raghavendra.png",
    bio: "Focuses on complex mobile feature implementation and performance tuning for native applications.",
    value:
      "Delivers high-performance mobile applications with seamless user experiences.",
    skills:
      "Flutter · Native APIs · Performance Optimization · Cross-Platform Development",
    contribution:
      "Optimized app startup time by 60% through native module integration.",
    github: "https://github.com/raghavendrahande",
  },
  {
    name: "Mohammed Sufyan B",
    title: "Social Media Manager | Analytics & Content Strategy",
    role: "Lead Socials",
    avatarUrl: "/src/utils/MemberImages/Sufyan.png",
    bio: "Drives community engagement and content outreach across all social media platforms.",
    value:
      "Amplifies brand presence and engagement through data-driven social media strategies.",
    skills:
      "Content Strategy · Social Media Marketing · Analytics · Community Management",
    contribution: "Grew our social media following by 150% in six months.",
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

/* ========= Utilities & Data Processing (unchanged) ========= */
const normalize = (s = "") => s.trim().toLowerCase();
const buildLookup = (arr) => {
  const map = new Map();
  arr.forEach((m) => map.set(normalize(m.name), m));
  return map;
};
const AVATAR_LOOKUP = buildLookup(BASE_MEMBERS);

const SECTIONS = [
  { key: "Managers", title: "Managers", accent: CS.ORANGE, icon: "👤" },
  { key: "Technical", title: "Technical Squad", accent: CS.BLUE, icon: "💻" },
  { key: "Design", title: "Design & Creative", accent: CS.PINK, icon: "🎨" },
  {
    key: "Media + Social",
    title: "Media & Social",
    accent: CS.LIGHT_PINK,
    icon: "📢",
  },
];

function InitialAvatar({ name }) {
  const initials = useMemo(() => {
    const parts = name.split(/\s+/).filter(Boolean);
    return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
  }, [name]);
  return <div className="cs-initial">{initials}</div>;
}

/* ========= Detailed Member Card (UPDATED) ========= */
function DetailedCard({ item }) {
  // Destructure new fields: role, value, skills, contribution
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
    portfolio,
  } = item;

  // Fallback for missing fields
  const displayRole = role || "Team Member";
  const displayValue =
    value ||
    `A dedicated member of our team, contributing to various projects.`;
  const displaySkills = skills || "No specific skills listed.";
  const displayContribution = contribution || "Contributed to team projects.";

  return (
    <div className="cs-detailed-card">
      <div className="cs-card-border" />
      <div className="cs-card-body">
        {/* 1. Header Info: Avatar + Name/Title */}
        <div className="cs-header-info">
          <div className="cs-avatar-wrap">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="cs-avatar"
                loading="lazy"
              />
            ) : (
              <InitialAvatar name={name} />
            )}
          </div>
          <div className="cs-text-wrap">
            <div className="cs-name">{name}</div>
            <div className="cs-role">{displayRole}</div>{" "}
            {/* New: Display Role */}
            <div className="cs-title">{title}</div>
          </div>
        </div>
        {/* 2. Value/Motto */}
        <p className="cs-value">"{displayValue}"</p> {/* New: Display Value */}
        {/* 3. Skills */}
        <div className="cs-skills">
          <strong>Skills:</strong>{" "}
          {displaySkills.split(" · ").map((skill, index) => (
            <span key={index} className="cs-skill-tag">
              {skill}
            </span>
          ))}
        </div>{" "}
        {/* New: Display Skills with tags */}
        {/* 4. Contribution */}
        <div className="cs-contribution">
          <strong>Contribution:</strong> {displayContribution}
        </div>{" "}
        {/* New: Display Contribution */}
        {/* 5. View Profile Button - Always shown for consistency */}
        <div className="cs-link-separator" />
        <div className="cs-social-links">
          {/* The "View Profile" button can link to a specific member's detail page, 
                        or a modal/pop-up, or even just the first available social link.
                        For now, it will simply link to the first available social link, 
                        or a dummy link if none are available.
                    */}
          <a
            href={linkedin || github || portfolio || "#"}
            target="_blank"
            rel="noreferrer"
            className="cs-view-profile-btn"
            style={{ "--accent-color": CS.BLUE }} // Example accent for the button
          >
            View Profile →
          </a>

          {/* Optional: Add individual social links if needed, but "View Profile" simplifies */}
          {/* {portfolio && (<a href={portfolio} ...>Portfolio</a>)} */}
          {/* {linkedin && (<a href={linkedin} ...>LinkedIn</a>)} */}
          {/* {github && (<a href={github} ...>GitHub</a>)} */}
        </div>
      </div>
    </div>
  );
}

/* ========= Main component (Vertical Scroll) ========= */
export default function TeamReveal({ dark = true }) {
  // Merge DECLARED with BASE_MEMBERS to enrich avatars and details
  const grouped = useMemo(() => {
    const bySection = new Map(SECTIONS.map((s) => [s.key, []]));
    DECLARED.forEach((d) => {
      const base = AVATAR_LOOKUP.get(normalize(d.name));

      const fuzzy =
        AVATAR_LOOKUP.get(normalize(d.name.replace(/\s+K\s*N/i, " K N"))) ||
        AVATAR_LOOKUP.get(
          normalize(d.name.replace(/bharath/i, "Bharat G P"))
        ) ||
        AVATAR_LOOKUP.get(
          normalize(d.name.replace(/raghv?e?ndra/i, "Raghavendra Hande"))
        ) ||
        null;

      const useBase = base || fuzzy;

      const enriched = {
        name: d.name.replace(/\b\w/g, (c) => c.toUpperCase()),
        label: d.label, // This is the 'Core Manager' or 'Lead Technical'
        avatarUrl: useBase?.avatarUrl || null,
        title: useBase?.title || d.label,
        bio: useBase?.bio || null,
        value: useBase?.value || null, // NEW
        skills: useBase?.skills || null, // NEW
        contribution: useBase?.contribution || null, // NEW
        portfolio: useBase?.portfolio || null,
        linkedin: useBase?.linkedin || null,
        github: useBase?.github || null,
        group: d.group,
      };
      if (bySection.has(d.group)) bySection.get(d.group).push(enriched);
    });

    const labelRank = (s) => (/Lead/i.test(s) ? 0 : /Core/i.test(s) ? 1 : 2);
    SECTIONS.forEach((s) => {
      const arr = bySection.get(s.key);
      arr.sort((a, b) => {
        const lr = labelRank(a.label) - labelRank(b.label);
        if (lr !== 0) return lr;
        return a.name.localeCompare(b.name);
      });
    });

    return bySection;
  }, []);

  return (
    <div className={`cs-wrap ${dark ? "dark" : "light"}`}>
      <div className="cs-bg" aria-hidden />

      <header className="cs-header">
        <h1 className="cs-page-title">Meet the Full Team</h1>
        <p className="cs-page-sub">
          Scroll down to explore our specialized squads: **Managers, Technical,
          Design, and Media + Social**.
        </p>
      </header>

      {/* Content Wrapper for Centering */}
      <div className="cs-content-wrap">
        {/* Sections */}
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

              {/* Grid of Detailed Profile Cards */}
              <div className="cs-grid">
                {items.map((m, i) => (
                  // Pass the 'label' from DECLARED as 'role' if base member has no role
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

      {/* Local styles - VERTICAL SCROLL LAYOUT (Centered and Enhanced Cards) */}
      <style>{`
                :root {
                    --cs-black: ${CS.BLACK};
                    --cs-white: ${CS.WHITE};
                    --cs-pink: ${CS.PINK};
                    --cs-blue: ${CS.BLUE};
                    --cs-orange: ${CS.ORANGE};
                    --cs-dblue: ${CS.DARK_BLUE};
                    --cs-lpink: ${CS.LIGHT_PINK};
                    --card-bg-light: rgba(255, 255, 255, 0.9);
                    --card-bg-dark: rgba(25, 25, 25, 0.7); 
                    --card-text-opacity: 0.9;
                    --content-max-width: 1400px;
                }
                .cs-wrap {
                    position: relative;
                    min-height: 100vh;
                    padding-bottom: 8rem;
                    overflow: clip;
                }
                .cs-wrap.light { 
                    color: var(--cs-black); 
                    --card-border-color: rgba(0,0,0,0.1);
                    --separator-color: rgba(0,0,0,0.1);
                }
                .cs-wrap.dark  { 
                    color: var(--cs-white); 
                    --card-border-color: rgba(255,255,255,0.15);
                    --separator-color: rgba(255,255,255,0.1);
                }

                /* Background styles omitted for brevity */
                .cs-bg {
                    position: fixed; inset: 0; z-index: -1;
                    background:
                        radial-gradient(1200px 600px at 10% 0%, ${CS.BLUE}1a, transparent 60%),
                        radial-gradient(1200px 600px at 90% 20%, ${CS.PINK}19, transparent 60%),
                        radial-gradient(1200px 600px at 50% 100%, ${CS.ORANGE}14, transparent 60%);
                    box-shadow: inset 0 0 0 200vmax rgba(0,0,0, var(--cs-tint));
                }
                .cs-wrap.dark { --cs-tint: 0.35; background-color: var(--cs-black); }
                .cs-wrap.light{ --cs-tint: 0.02; background-color: var(--cs-white); }

                /* HEADER CENTERING */
                .cs-header { 
                    padding: 6rem 6vw 2rem; 
                    max-width: var(--content-max-width);
                    margin: 0 auto; /* CENTERED */
                }
                .cs-page-title { margin: 0; font-weight: 700; letter-spacing: -0.02em; font-size: clamp(28px, 5vw, 48px); }
                .cs-page-sub { margin: 0.6rem 0 0; opacity: 0.8; max-width: 900px; font-size: clamp(14px, 2vw, 18px); }
                
                /* CONTENT WRAPPER CENTERING */
                .cs-content-wrap {
                    max-width: var(--content-max-width);
                    margin: 0 auto; /* CENTERED */
                    padding: 0 6vw; /* Horizontal padding for mobile safety */
                }
                
                .cs-section { 
                    padding: 0 0 4rem 0; /* Adjusted padding since 6vw is now on wrapper */
                }
                .cs-section-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.2rem; }
                .cs-section-title { margin: 0; font-size: clamp(22px, 3.2vw, 32px); font-weight: 700; letter-spacing: -0.01em; }
                .cs-section-accent { height: 6px; width: 64px; border-radius: 999px; opacity: 0.5; }

                /* Responsive grid for Cards */
                .cs-grid {
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
                    gap: 24px;
                    display: grid;
                }

                /* DETAILED CARD STYLES - MODERNIZED AND ENHANCED */
                .cs-detailed-card {
                    position: relative; border-radius: 18px; isolation: isolate; overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: box-shadow 200ms ease;
                }
                .cs-detailed-card:hover { box-shadow: 0 8px 25px rgba(0,0,0,0.25); }
                
                .cs-card-border {
                    position: absolute; inset: 0; border-radius: 18px; padding: 1px;
                    background: linear-gradient(135deg, ${CS.BLUE}, ${CS.PINK}, ${CS.ORANGE});
                    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor; mask-composite: exclude; z-index: 0; opacity: 0.8;
                }
                .cs-card-body {
                    position: relative; z-index: 1; border-radius: 16px; padding: 20px;
                    display: flex; flex-direction: column; align-items: flex-start; text-align: left;
                    height: 100%; border: 1px solid var(--card-border-color);
                    backdrop-filter: blur(10px) saturate(180%); transition: background-color 200ms ease;
                }
                .cs-wrap.light .cs-card-body { background: var(--card-bg-light); }
                .cs-wrap.dark .cs-card-body { background: var(--card-bg-dark); }

                /* Header Info (Avatar + Name/Title) */
                .cs-header-info { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
                .cs-text-wrap { display: flex; flex-direction: column; justify-content: center; }
                .cs-avatar, .cs-initial { width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 3px solid ${CS.PINK}44; display: grid; place-items: center; }
                .cs-initial { font-size: 24px; font-weight: 700; background: linear-gradient(135deg, ${CS.DARK_BLUE}, ${CS.BLUE}); color: ${CS.WHITE}; }
                
                .cs-name { font-weight: 700; font-size: 19px; letter-spacing: -0.01em; }
                .cs-role { font-size: 14px; opacity: 0.8; margin-bottom: 2px; } /* NEW ROLE STYLE */
                .cs-title { font-size: 13px; opacity: 0.6; } /* Adjusted opacity for secondary title */
                
                /* Value/Motto */
                .cs-value {
                    font-style: italic; font-size: 14px; line-height: 1.5; opacity: 0.9;
                    margin: 0 0 16px 0; padding-left: 10px; border-left: 3px solid ${CS.BLUE}55;
                    flex-grow: 1; /* Allows it to take up available space */
                }

                /* Skills */
                .cs-skills {
                    font-size: 13px; opacity: var(--card-text-opacity); margin-bottom: 10px;
                    display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
                }
                .cs-skills strong { font-weight: 600; margin-right: 4px; }
                .cs-skill-tag {
                    background-color: rgba(255,255,255,0.1); /* Light background for tags */
                    padding: 4px 8px; border-radius: 6px; font-size: 11px;
                    border: 1px solid rgba(255,255,255,0.15);
                    white-space: nowrap; /* Prevent tags from breaking */
                }
                .cs-wrap.light .cs-skill-tag { background-color: rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.1); }


                /* Contribution */
                .cs-contribution {
                    font-size: 13px; opacity: var(--card-text-opacity); margin-bottom: 16px;
                }
                .cs-contribution strong { font-weight: 600; margin-right: 4px; }

                /* Separator before links */
                .cs-link-separator { width: 100%; height: 1px; background: var(--separator-color); margin: 8px 0; }

                /* View Profile Button */
                .cs-view-profile-btn {
                    font-size: 13px; text-decoration: none; padding: 10px 18px; border-radius: 999px;
                    border: none; color: var(--cs-white);
                    background: var(--accent-color); /* Use accent color for button */
                    display: inline-flex; align-items: center; gap: 8px;
                    font-weight: 600; transition: transform 200ms ease, box-shadow 200ms ease;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                }
                .cs-view-profile-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(0,0,0,0.3);
                }
                .cs-view-profile-btn:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }

                @media (max-width: 768px) {
                    .cs-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
                    .cs-header { text-align: center; } /* Center text on mobile too */
                    .cs-page-sub { margin-left: auto; margin-right: auto; }
                }
                @media (max-width: 480px) {
                    .cs-grid { grid-template-columns: 1fr; gap: 12px; }
                    .cs-value { padding-left: 8px; }
                }
            `}</style>
    </div>
  );
}
