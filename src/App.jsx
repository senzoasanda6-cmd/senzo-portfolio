import React, {
  Suspense,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Spinner } from "react-bootstrap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Navbar = React.lazy(() => import("./components/Navbar"));
const Hero = React.lazy(() => import("./components/Hero"));
const About = React.lazy(() => import("./components/About"));
const Projects = React.lazy(() => import("./components/Projects"));
const Blog = React.lazy(() => import("./components/Blog"));
const Contact = React.lazy(() => import("./components/Contact"));
const Footer = React.lazy(() => import("./components/Footer"));
const BackToTopButton = React.lazy(() =>
  import("./components/BackToTopButton")
);
const CustomCursor = React.lazy(() => import("./components/CustomCursor"));
const ScrollProgress = React.lazy(() => import("./components/ScrollProgress"));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef();
  const sectionRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(true);

  // Add to refs array
  const addToRefs = useCallback((el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  }, []);

  useEffect(() => {
    // Initial loading timeout
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);

    // Store the current refs in a variable for cleanup
    const currentSectionRefs = [...sectionRefs.current];
    const cleanupHandlers = [];

    // Initialize animations after components are mounted
    const ctx = gsap.context(() => {
      const setupAnimations = () => {
        // Enhanced fade in with blur for sections
        currentSectionRefs.forEach((section, index) => {
          const sectionId = section.getAttribute("id");
          if (sectionId !== "home") {
            gsap.from(section, {
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true,
              },
              y: 50,
              opacity: 0,
              filter: "blur(10px)",
              duration: 1,
              ease: "power3.out",
              delay: index * 0.15,
            });
          }
        });

        // Enhanced parallax effect for hero section
        const heroSection = document.querySelector("#home");
        if (heroSection) {
          // Staggered text reveal
          const heroElements = [
            heroSection.querySelector("h1"),
            heroSection.querySelector("p"),
            ...heroSection.querySelectorAll(".btn"),
          ].filter((el) => el);

          heroElements.forEach((el, i) => {
            gsap.from(el, {
              y: 80,
              opacity: 0,
              duration: 1.2,
              delay: 0.3 + i * 0.2,
              ease: "back.out(1.7)",
              stagger: 0.2,
            });
          });

          // Subtle floating animation for hero
          const floatingElement = heroSection.querySelector(".hero-floating");
          if (floatingElement) {
            gsap.to(floatingElement, {
              y: -20,
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        }

        // Interactive card hover animations
        currentSectionRefs.forEach((section) => {
          const cards = section.querySelectorAll(
            ".project-card, .blog-card, .skill-card"
          );
          cards.forEach((card) => {
            // Scale effect
            const handleMouseEnter = () => {
              gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
                y: -5,
              });
            };

            const handleMouseLeave = () => {
              gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                y: 0,
              });
            };

            card.addEventListener("mouseenter", handleMouseEnter);
            card.addEventListener("mouseleave", handleMouseLeave);

            // Store handlers for cleanup
            cleanupHandlers.push({
              element: card,
              enterHandler: handleMouseEnter,
              leaveHandler: handleMouseLeave,
            });

            // Glow effect on hover
            const glow = card.querySelector(".card-glow");
            if (glow) {
              const handleGlowEnter = () => {
                gsap.to(glow, {
                  opacity: 0.6,
                  duration: 0.3,
                });
              };

              const handleGlowLeave = () => {
                gsap.to(glow, {
                  opacity: 0,
                  duration: 0.3,
                });
              };

              card.addEventListener("mouseenter", handleGlowEnter);
              card.addEventListener("mouseleave", handleGlowLeave);

              cleanupHandlers.push({
                element: card,
                enterHandler: handleGlowEnter,
                leaveHandler: handleGlowLeave,
              });
            }
          });
        });

        // Subtle background elements animation
        const bgElements = document.querySelectorAll(".bg-particle");
        bgElements.forEach((el, i) => {
          gsap.to(el, {
            x: gsap.utils.random(-50, 50),
            y: gsap.utils.random(-30, 30),
            rotation: gsap.utils.random(-10, 10),
            duration: gsap.utils.random(15, 25),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5,
          });
        });

        // Text reveal with gradient
        const gradientTexts = document.querySelectorAll(".gradient-text");
        gradientTexts.forEach((text) => {
          gsap.from(text, {
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
            },
            backgroundPosition: "200% center",
            duration: 1.5,
            ease: "power2.inOut",
          });
        });
      };

      // Use requestAnimationFrame for smoother animations
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        setupAnimations();
      });

      // Debounced scroll trigger refresh
      let timeout;
      const debouncedRefresh = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => ScrollTrigger.refresh(), 150);
      };

      window.addEventListener("resize", debouncedRefresh);

      return () => {
        window.removeEventListener("resize", debouncedRefresh);
        clearTimeout(timeout);
      };
    }, mainRef);

    return () => {
      // Cleanup event listeners using the stored references
      cleanupHandlers.forEach((handler) => {
        if (handler.element && handler.enterHandler && handler.leaveHandler) {
          handler.element.removeEventListener(
            "mouseenter",
            handler.enterHandler
          );
          handler.element.removeEventListener(
            "mouseleave",
            handler.leaveHandler
          );
        }
      });

      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
  // Page transition effect
  useEffect(() => {
    if (!isLoading) {
      const transitionElement = document.querySelector(".page-transition");
      if (transitionElement) {
        gsap.to(transitionElement, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            transitionElement.style.display = "none";
          },
        });
      }
    }
  }, [isLoading]);

  return (
    <div
      ref={mainRef}
      className="d-flex flex-column"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d0d0d",
        color: "#ffffff",
        position: "relative",
        overflowX: "hidden",
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(29, 0, 77, 0.3) 0%, transparent 20%),
          radial-gradient(circle at 90% 80%, rgba(0, 77, 64, 0.2) 0%, transparent 20%),
          linear-gradient(to bottom, #0d0d0d, #0a0a0a)
        `,
        isolation: "isolate",
      }}
    >
      {/* Page Transition Overlay */}
      {isLoading && (
        <div
          className="page-transition"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#0d0d0d",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "3px solid transparent",
              borderTop: "3px solid #00ffff",
              borderRight: "3px solid #00ffff",
              animation: "spin 1s linear infinite",
              marginBottom: "20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                border: "2px solid transparent",
                borderBottom: "2px solid #00ffaa",
                borderLeft: "2px solid #00ffaa",
                animation: "spinReverse 0.8s linear infinite",
              }}
            />
          </div>
          <p
            style={{
              background: "linear-gradient(90deg, #00ffff, #00ffaa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Loading Portfolio...
          </p>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes spinReverse {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(-360deg); }
              }
            `}
          </style>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <Suspense fallback={null}>
        <ScrollProgress />
      </Suspense>

      {/* Custom Cursor */}
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>

      {/* Background Particles */}
      <div className="bg-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bg-particle"
            style={{
              position: "absolute",
              width: gsap.utils.random(2, 6),
              height: gsap.utils.random(2, 6),
              backgroundColor: gsap.utils.random([
                "rgba(0, 255, 255, 0.3)",
                "rgba(0, 255, 170, 0.3)",
                "rgba(100, 100, 255, 0.3)",
              ]),
              borderRadius: "50%",
              top: `${gsap.utils.random(10, 90)}%`,
              left: `${gsap.utils.random(5, 95)}%`,
              zIndex: 0,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      <Suspense
        fallback={
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              minHeight: "100vh",
              background: "linear-gradient(45deg, #0d0d0d, #1a1a2e)",
            }}
          >
            <div className="text-center">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <p
                className="mt-3"
                style={{
                  background: "linear-gradient(90deg, #00ffff, #00ffaa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Loading amazing content...
              </p>
            </div>
          </div>
        }
      >
        <Navbar />

        {/* Main content area with padding for navbar */}
        <main
          style={{
            flex: "1 0 auto",
            width: "100%",
            paddingTop: "80px", // Space for fixed navbar
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              minHeight: "calc(100vh - 80px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div ref={addToRefs} id="home" className="hero-section">
              <Hero />
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2 }}>
            <div ref={addToRefs} id="about" className="reveal-blur">
              <About />
            </div>
            <div ref={addToRefs} id="projects" className="reveal-blur">
              <Projects />
            </div>
            <div ref={addToRefs} id="blog" className="reveal-blur">
              <Blog />
            </div>
            <div ref={addToRefs} id="contact" className="reveal-blur">
              <Contact />
            </div>
          </div>
        </main>

        <BackToTopButton />
        <Footer
          style={{
            position: "relative",
            zIndex: 3,
            backgroundColor: "#0d0d0d",
            color: "#ffffff",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        />
      </Suspense>

      {/* Additional styles */}
      <style>
        {`
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: #0d0d0d;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #00ffff, #00ffaa);
            border-radius: 5px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #00ffaa, #00ffff);
          }
          
          /* Gradient text class */
          .gradient-text {
            background: linear-gradient(90deg, #00ffff, #00ffaa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: gradientShift 3s ease-in-out infinite;
          }
          
          @keyframes gradientShift {
            0%, 100% { background-position: 0% center; }
            50% { background-position: 100% center; }
          }
          
          /* Floating animation */
          .hero-floating {
            animation: floating 6s ease-in-out infinite;
          }
          
          @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          /* Card glow effect */
          .card-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
            opacity: 0;
            pointer-events: none;
            border-radius: inherit;
            z-index: -1;
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .bg-particle {
              display: none;
            }
            
            .cursor-dot,
            .cursor-ring {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}
