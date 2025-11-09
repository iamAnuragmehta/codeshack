import { cn } from "../lib/utils.js";

export function Button({ children, className, dark, asChild, ...props }) {
  // Theme logic same as navbar
  const bg = dark ? "rgba(255,255,255,0.1)" : "#000000";
  const hoverBg = dark ? "rgba(255,255,255,0.2)" : "#222222";
  const text = dark ? "#ffffff" : "#ffffff";
  const border = dark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.15)";

  const Comp = asChild ? "a" : "button";

  return (
    <Comp
      {...props}
      className={cn(
        "px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md border",
        className
      )}
      style={{
        background: bg,
        color: text,
        borderColor: border,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = bg;
      }}
    >
      {children}
    </Comp>
  );
}
