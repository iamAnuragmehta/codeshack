import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const BLACK = "#000000";
const WHITE = "#FFFFFF";

const Navbar = ({ dark }) => {
  const barRef = useRef(null);
  const menuRef = useRef(null);
  const lastScrollY = useRef(0);

  const BASE_WIDTH = 250;
  const FULL_WIDTH = 900;
  const MENU_OPEN_WIDTH = 600;

  const [hovering, setHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    const menu = menuRef.current;
    if (!bar || !menu) return;

    const about = document.getElementById("about-section");
    if (!about) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = about.offsetTop - 150;

      // Hide/show navbar based on scroll direction
      if (scrollY > lastScrollY.current && scrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY.current = scrollY;

      // Disable expansion on mobile
      if (isMobile) return;

      const progress = Math.min(1, scrollY / maxScroll);
      const target = hovering ? 1 : progress;

      gsap.to(bar, {
        width: BASE_WIDTH + (FULL_WIDTH - BASE_WIDTH) * target,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(menu, {
        width: MENU_OPEN_WIDTH * target,
        opacity: target,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hovering, isMobile]);

  const handleNavClick = (item) => {
    const sectionId = item.toLowerCase() === "home" ? "hero-section" : `${item.toLowerCase()}-section`;
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const bg = dark ? "rgba(255,255,255,0.06)" : BLACK;
  const text = WHITE;
  const border = dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.20)";

  const items = ["HOME", "ABOUT", "EVENTS", "CONTACT"];

  return (
    <nav 
      className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300"
      style={{
        top: isVisible ? "2rem" : "-100px",
      }}
    >
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
          onMouseEnter={() => !isMobile && setHovering(true)}
          onMouseLeave={() => !isMobile && setHovering(false)}
        >
          {/* LOGO */}
          <div
            style={{ color: text }}
            className="font-semibold text-lg whitespace-nowrap cursor-pointer"
            onClick={() => handleNavClick("HOME")}
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
                className="cursor-pointer whitespace-nowrap hover:text-[#FF4FA3] transition-colors"
                onClick={() => handleNavClick(item)}
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