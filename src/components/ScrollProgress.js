import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgress() {
  const progressRef = useRef();

  useLayoutEffect(() => {
    gsap.to(progressRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        zIndex: 10000,
      }}
    >
      <div
        ref={progressRef}
        style={{
          width: "0%",
          height: "100%",
          background: "linear-gradient(90deg, #00ffff, #00ffaa)",
          boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
        }}
      />
    </div>
  );
}
