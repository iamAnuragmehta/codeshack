import { useState } from "react";

const BLACK = "#000000";
const WHITE = "#FFFFFF";
const PINK = "#FF4FA3";
const LIGHT_PINK = "#F2A6FF";
const BLUE = "#3A66FF";
const DARK_BLUE = "#1A2B8F";
const ORANGE = "#F7931A";

const Navbar = ({ dark }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Navbar background based on theme
  const bg = dark
    ? "rgba(255,255,255,0.06)" // transparent grey in dark mode
    : BLACK; // solid black in light mode

  const text = WHITE;
  const border = dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.20)";

  // ✅ Codeshack menu
  const items = ["HOME", "ABOUT", "CLUBS", "PROJECTS", "EVENTS", "CONTACT"];

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        {/* MAIN BAR */}
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="
            flex items-center
            transition-all duration-300 ease-out
            shadow-xl border rounded-full
            px-12 py-4
          "
          style={{
            background: bg,
            borderColor: border,
            margin: "0 auto",
            width: isOpen ? "900px" : "fit-content",
            maxWidth: "900px",
            backdropFilter: "blur(12px)", // ✅ cleaner transparent effect
          }}
        >
          {/* LOGO */}
          <div
            style={{ color: text }}
            className="font-semibold text-lg tracking-wide whitespace-nowrap"
          >
            {"<CODESHACK />"}
          </div>

          {/* SPACER */}
          <div
            className={`
              transition-all duration-300
              ${isOpen ? "flex-grow" : "w-0"}
            `}
          ></div>

          {/* MENU */}
          <ul
            className={`
              flex gap-10 text-sm items-center
              transition-all duration-300
              ${
                isOpen
                  ? "opacity-100 max-w-[600px]"
                  : "opacity-0 max-w-0 overflow-hidden"
              }
            `}
            style={{ color: text }}
          >
            {items.map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-[#FF4FA3] whitespace-nowrap"
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
