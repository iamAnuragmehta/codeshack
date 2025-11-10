import Introduction from "./PageComps/Introduction";
import TeamReveal from "./PageComps/TeamReveal";
import TeamShowcaseHorizontal from "./PageComps/TeamShowcaseHorizontal";

export default function Aboutpage({ dark }) {
  return (
    <main
      className="w-full min-h-screen overflow-x-hidden"
      style={{
        background: dark ? "#000000" : "#ffffff",
        color: dark ? "#ffffff" : "#000000",
      }}
    >
      <section id="about-section-start">
        <Introduction dark={dark} />
      </section>

      <section id="profile-section-start">
        <TeamShowcaseHorizontal dark={dark} />
      </section>

      <section id="profile-section-start">
        <TeamReveal dark={dark} />
      </section>
    </main>
  );
}
