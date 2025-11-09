import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import DemoOne from "./Background.jsx";
import { ThemeToggle } from "../components/ui/theme-toggle.jsx";
import { Hero } from "../components/ui/hero-1.jsx";

const Home = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <Navbar dark={dark} />

      {/* Theme Toggle Floating Right */}
      <div className="fixed top-8 right-8 z-[80]">
        <ThemeToggle
          isDark={dark}
          onToggle={() => setDark((v) => !v)}
          className="backdrop-blur-xl transition-transform hover:scale-110"
        />
      </div>

      {/* Background Animation */}
      <div className="fixed inset-0 -z-10">
        <DemoOne dark={dark} />
      </div>

      {/* Hero */}
      <Hero dark={dark} />
    </div>
  );
};

export default Home;
