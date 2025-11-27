import React, { Suspense, useLayoutEffect, useRef } from "react";
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
const BackToTopButton = React.lazy(() => import("./components/BackToTopButton"));

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef();
  const sectionRefs = useRef([]);
  
  // Add to refs array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);

    // Initialize animations after components are mounted
    const ctx = gsap.context(() => {
      // Fade in animation for sections
      sectionRefs.current.forEach((section, index) => {
        const sectionId = section.getAttribute('id');
        if (sectionId !== 'home') { // Skip hero section
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1
          });
        }
      });

      // Parallax effect for hero section
      const heroSection = document.querySelector('#home');
      if (heroSection) {
        gsap.from(heroSection.querySelector('h1'), {
          y: 80,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out"
        });
        
        gsap.from(heroSection.querySelector('p'), {
          y: 40,
          opacity: 0,
          duration: 1,
          delay: 0.6,
          ease: "power3.out"
        });
        
        gsap.from(heroSection.querySelector('.btn'), {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.9,
          stagger: 0.2,
          ease: "power3.out"
        });
      }
    }, mainRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div 
      ref={mainRef}
      className="d-flex flex-column" 
      style={{
        minHeight: '100vh',
        backgroundColor: '#0d0d0d',
        color: '#ffffff',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      <Suspense fallback={
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      }>
        <Navbar />
        
        {/* Main content area with padding for navbar */}
        <main style={{ 
          flex: '1 0 auto',
          width: '100%',
          paddingTop: '80px', // Space for fixed navbar
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ 
            minHeight: 'calc(100vh - 80px)',
            position: 'relative',
            zIndex: 1
          }}>
            <div ref={addToRefs} id="home">
              <Hero />
            </div>
          </div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div ref={addToRefs} id="about">
              <About />
            </div>
            <div ref={addToRefs} id="projects">
              <Projects />
            </div>
            <div ref={addToRefs} id="blog">
              <Blog />
            </div>
            <div ref={addToRefs} id="contact">
              <Contact />
            </div>
          </div>
        </main>
        
        <BackToTopButton />
        <Footer style={{ 
          position: 'relative',
          zIndex: 3,
          backgroundColor: '#0d0d0d',
          color: '#ffffff',
          width: '100%'
        }} />
      </Suspense>
    </div>
  );
}
