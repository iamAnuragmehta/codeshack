import React, { useState, useEffect } from "react";
import "./loadingPage.css";

const NUM_BARS = 20;
const ANIM_STAGGER_MS = 40;
const BAR_ANIM_DURATION_MS = 500;
const SLIDE_UP_ANIM_DURATION_MS = 800;

const PROGRESS_FILL_DURATION = 1200;
const CURTAIN_WIPE_DURATION = NUM_BARS * ANIM_STAGGER_MS + BAR_ANIM_DURATION_MS;

const textToAnimate = "< CODESHACK />";
const characters = textToAnimate.split("");

export default function LoadingPage({ onFinish }) {
  const [bars, setBars] = useState([]);
  const [isHiding, setIsHiding] = useState(false);
  const [totalAnimTime, setTotalAnimTime] = useState(0);
  const [isWipingCurtain, setIsWipingCurtain] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTotalAnimTime(PROGRESS_FILL_DURATION);

    const curtainTimer = setTimeout(
      () => setIsWipingCurtain(true),
      PROGRESS_FILL_DURATION
    );

    const hideTimer = setTimeout(
      () => setIsHiding(true),
      PROGRESS_FILL_DURATION + CURTAIN_WIPE_DURATION
    );

    const unmountTimer = setTimeout(() => {
      setDone(true);
      if (onFinish) onFinish();
    }, PROGRESS_FILL_DURATION + CURTAIN_WIPE_DURATION + SLIDE_UP_ANIM_DURATION_MS);

    return () => {
      clearTimeout(curtainTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, [onFinish]);

  useEffect(() => {
    if (isWipingCurtain) {
      const arr = [];
      for (let i = 0; i < NUM_BARS; i++) {
        arr.push({
          animation: `grow-bar ${BAR_ANIM_DURATION_MS}ms ease-out ${
            i * ANIM_STAGGER_MS
          }ms forwards`,
        });
      }
      setBars(arr);
    }
  }, [isWipingCurtain]);

  const progressStyle = {
    animation: `fill-progress ${totalAnimTime}ms linear forwards`,
  };

  return (
    <div
      className={`
        loading-wrapper
        ${isHiding ? "loading-hide" : ""}
      `}
    >
      {/* --- TEXT --- */}
      <div className="loading-text">
        {characters.map((c, i) => (
          <span key={i}>{c === " " ? "\u00A0" : c}</span>
        ))}
      </div>

      {/* --- CURTAIN --- */}
      <div className="loading-curtain">
        {bars.map((style, i) => (
          <div key={i} className="loading-bar" style={style} />
        ))}
      </div>

      {/* --- PROGRESS --- */}
      <div className="loading-progress">
        <div className="loading-progress-fill" style={progressStyle} />
      </div>
    </div>
  );
}
