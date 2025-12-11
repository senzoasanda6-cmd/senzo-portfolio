import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const isTouchDeviceRef = useRef(false);

  useEffect(() => {
    // Check if device supports hover (not touch)
    const mediaQuery = window.matchMedia("(hover: none)");
    isTouchDeviceRef.current = mediaQuery.matches;

    if (isTouchDeviceRef.current) return;

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    if (!cursorDot || !cursorRing) return;

    const onMouseMove = (e) => {
      // Animate cursor dot
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "power2.out",
      });

      // Animate cursor ring with slight delay
      gsap.to(cursorRing, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    // Interactive elements hover effect
    const onMouseEnter = (e) => {
      const target = e.target;
      if (
        target.matches("a, button, .interactive, .project-card, .blog-card")
      ) {
        gsap.to(cursorRing, {
          scale: 1.8,
          duration: 0.3,
          borderColor: "#00ffaa",
          backgroundColor: "rgba(0, 255, 170, 0.1)",
        });
        gsap.to(cursorDot, {
          scale: 0.5,
          duration: 0.3,
          backgroundColor: "#00ffaa",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(cursorRing, {
        scale: 1,
        duration: 0.3,
        borderColor: "rgba(0, 255, 255, 0.5)",
        backgroundColor: "transparent",
      });
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        backgroundColor: "#00ffff",
      });
    };

    // Click animation
    const onMouseDown = () => {
      gsap.to(cursorRing, {
        scale: 0.8,
        duration: 0.1,
        borderColor: "#ffffff",
      });
    };

    const onMouseUp = () => {
      gsap.to(cursorRing, {
        scale: 1,
        duration: 0.1,
        borderColor: "rgba(0, 255, 255, 0.5)",
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const interactiveEls = document.querySelectorAll(
      "a, button, .interactive, .project-card, .blog-card"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      el.classList.add("interactive");
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);

      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.classList.remove("interactive");
      });
    };
  }, []);

  // If it's a touch device, don't render the cursor at all
  // Since we're using a ref, we need to render it and let the useEffect handle it
  // Or we could conditionally render based on window.matchMedia directly

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "#00ffff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          border: "2px solid rgba(0, 255, 255, 0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
