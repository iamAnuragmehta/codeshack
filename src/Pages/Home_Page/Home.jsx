import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import { Hero } from "../components/ui/hero-1.jsx";
import Aboutpage from "../About_Page/AboutPage.jsx";
import EventsPage from "../Event_Page/EventPage.jsx";
import { ThemeToggle } from "../components/ui/theme-toggle.jsx";
import DemoOne from "./Background.jsx";

const Home = () => {
  const [dark, setDark] = useState(true);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* ✅ Navbar stays globally visible */}
      <Navbar dark={dark} />

      {/* ✅ Theme toggle floating button */}
      <div className="fixed top-8 right-8 z-[80]">
        <ThemeToggle
          isDark={dark}
          onToggle={() => setDark((prev) => !prev)}
          className="backdrop-blur-xl transition-transform hover:scale-110"
        />
      </div>

      {/* ✅ Background animation */}
      <div className="fixed inset-0 -z-10">
        <DemoOne dark={dark} />
      </div>

      {/* ✅ HERO SECTION (scrolls into About) */}
      <section id="hero-section" className="relative z-10">
        <Hero dark={dark} />
      </section>

      {/* ✅ ABOUT PAGE (the section below hero) */}
      <section id="about-section" className="relative z-10">
        <Aboutpage dark={dark} />
      </section>

      {/* ✅ Events Page */}
      <section id="event-section" className="relative z-10">
        <EventsPage dark={dark} />
      </section>
    </div>
  );
};

export default Home;
