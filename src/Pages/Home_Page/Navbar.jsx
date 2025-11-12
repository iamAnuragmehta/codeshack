import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const BLACK = "#000000";
const WHITE = "#FFFFFF";

const Navbar = ({ dark }) => {
  const barRef = useRef(null);
  const menuRef = useRef(null);
  const navRef = useRef(null);

  const BASE_WIDTH = 250;
  const FULL_WIDTH = 900;
  const MENU_OPEN_WIDTH = 600;

  const [hovering, setHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const bar = barRef.current;
    const menu = menuRef.current;
    const nav = navRef.current;
    if (!bar || !menu || !nav) return;

    const isHome =
      typeof window !== "undefined" && window.location.pathname === "/";

    const about = document.getElementById("about-section");

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // ✅ Desktop-only expansion logic
      if (window.innerWidth >= 768 && about) {
        const maxScroll = about.offsetTop - 150;
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
      } else {
        // ✅ Mobile: keep navbar compact
        gsap.to(bar, {
          width: BASE_WIDTH,
          duration: 0.25,
          ease: "power2.out",
        });

        gsap.to(menu, {
          width: 0,
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });
      }

      // ✅ Mobile-only hide-on-scroll (homepage)
      if (isHome && window.innerWidth < 768) {
        const threshold = 80;
        if (scrollY > lastScrollYRef.current && scrollY > threshold) {
          setIsVisible(false); // scrolling down
        } else {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      lastScrollYRef.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      // If resized to desktop, ensure navbar visible and responsive again
      if (window.innerWidth >= 768) setIsVisible(true);
    };
    window.addEventListener("resize", handleResize);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [hovering]);

  // ✅ Animate show/hide on mobile scroll
  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: isVisible ? 0 : -120,
      opacity: isVisible ? 1 : 0,
      duration: 0.28,
      ease: "power2.out",
      pointerEvents: isVisible ? "auto" : "none",
    });
  }, [isVisible]);

  const bg = dark ? "rgba(255,255,255,0.06)" : BLACK;
  const text = WHITE;
  const border = dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.20)";

  const items = ["HOME", "ABOUT", "EVENTS", "CONTACT"];

  return (
    <nav
      ref={navRef}
      className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none"
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
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
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