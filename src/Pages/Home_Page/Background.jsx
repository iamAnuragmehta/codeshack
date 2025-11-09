import { BouncingBalls } from "../components/ui/bouncing-ball";

function Background({ dark }) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <BouncingBalls
        numBalls={220}
        backgroundColor={dark ? "#0d0d0d" : "#ffffff"}
        interactive={true}
        colors={
          dark
            ? [
                "#FF4FA3", // pink
                "#F2A6FF", // light pink
                "#3A66FF", // blue
                "#1A2B8F", // dark blue
                "#F7931A", // orange
              ]
            : [
                "#FF007F", // boosted pink (neon magenta)
                "#7F00FF", // neon purple
                "#0047FF", // hyper-saturated blue
                "#1A2B8F", // deep dark blue for contrast
                "#FF6A00", // boosted orange
                "#FF1493", // deep pink (hot pink)
                "#00A2FF", // neon sky blue
              ]
        }
      />
    </div>
  );
}

export default Background;
