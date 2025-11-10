import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const BLACK = "#000000";
const WHITE = "#FFFFFF";

const Navbar = ({ dark }) => {
  const barRef = useRef(null);
  const menuRef = useRef(null);

  const BASE_WIDTH = 250; // 👈 Your default collapsed width
  const FULL_WIDTH = 900; // 👈 Fully expanded width
  const MENU_OPEN_WIDTH = 600; // 👈 Width for menu reveal

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    const menu = menuRef.current;
    if (!bar || !menu) return;

    const about = document.getElementById("about-section");
    if (!about) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = about.offsetTop - 150;

      // ✅ scroll progress: 0 = top, 1 = reached about section
      const progress = Math.min(1, scrollY / maxScroll);

      // ✅ Hover → hard override (max)
      const target = hovering ? 1 : progress;

      // ✅ Smooth width
      gsap.to(bar, {
        width: BASE_WIDTH + (FULL_WIDTH - BASE_WIDTH) * target,
        duration: 0.25,
        ease: "power2.out",
      });

      // ✅ Smooth menu expansion
      gsap.to(menu, {
        width: MENU_OPEN_WIDTH * target,
        opacity: target,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hovering]);

  const bg = dark ? "rgba(255,255,255,0.06)" : BLACK;
  const text = WHITE;
  const border = dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.20)";

  const items = ["HOME", "ABOUT", "CLUBS", "PROJECTS", "EVENTS", "CONTACT"];

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <div
          ref={barRef}
          className="flex items-center border shadow-xl rounded-full px-12 py-4 transition-all"
          style={{
            background: bg,
            borderColor: border,
            width: BASE_WIDTH,
            backdropFilter: "blur(12px)",
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* LOGO */}
          <div
            style={{ color: text }}
            className="font-semibold text-lg whitespace-nowrap"
          >
            {"<CODESHACK />"}
          </div>

          <div className="flex-grow" />

          {/* MENU */}
          <ul
            ref={menuRef}
            className="flex gap-10 text-sm items-center overflow-hidden"
            style={{
              color: text,
              width: 0,
              opacity: 0,
            }}
          >
            {items.map((item) => (
              <li
                key={item}
                className="cursor-pointer whitespace-nowrap hover:text-[#FF4FA3]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
