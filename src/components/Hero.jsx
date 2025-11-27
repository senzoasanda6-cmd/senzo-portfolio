import React, { useEffect, useMemo, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import gsap from "gsap";

const Hero = () => {
  const [init, setInit] = useState(false);
  const heroContentRef = useRef(null);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    // Only run the animation if init is true and the ref is attached
    if (init && heroContentRef.current) {
      const tl = gsap.timeline();
      tl.from(heroContentRef.current.children, {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.3,
        ease: "power3.out",
        delay: 0.5, // Delay to allow particles to load
      });
    }
  }, [init]); // Add 'init' as a dependency

  const particlesLoaded = (container) => {
    console.log("Particles container loaded", container);
  };

  const particleOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#0d0d0d", // Matches your body background
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#61dafb", // Matches your accent color
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.2,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <section
        id="home"
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: 'calc(100vh - 80px)',
          width: '100%',
          position: 'relative',
          backgroundColor: '#0d0d0d',
          padding: '2rem 0',
          overflow: 'hidden'
        }}
      >
        {/* Particles Background */}
        {init && (
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={particleOptions}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
            }}
          />
        )}

        {/* Hero Content */}
        <div
          ref={heroContentRef}
          className="container text-center"
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          <h1 className="display-3 fw-bold mb-4" style={{ color: '#ffffff' }}>
            Hi, I'm Senzo Dubazana
          </h1>
          <p className="lead mb-5" style={{ color: '#a0a0a0' }}>
            I'm a Full Stack Developer passionate about creating amazing web applications.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a
              href="#about"
              className="btn btn-primary btn-lg px-4 py-2 rounded-pill"
              style={{
                backgroundColor: '#61dafb',
                border: 'none',
                color: '#0d0d0d',
                fontWeight: '600',
                minWidth: '150px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Learn More
            </a>
            <a
              href="#contact"
              className="btn btn-outline-light btn-lg px-4 py-2 rounded-pill"
              style={{
                borderColor: '#61dafb',
                color: '#61dafb',
                backgroundColor: 'transparent',
                minWidth: '150px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(97, 218, 251, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    );
  }

  return <></>;
};

export default Hero;