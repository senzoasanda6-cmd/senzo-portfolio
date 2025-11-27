import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const CustomNavbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar background change
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Handle active link highlighting
      const sections = ["home", "about", "projects", "blog", "contact"];
      let currentSection = "home";

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          // Use a 150px offset to trigger the active state a bit sooner
          if (window.scrollY >= sectionTop - 150) {
            currentSection = sectionId;
          }
        }
      });

      // Update state only if the active link has changed
      if (currentSection !== activeLink) {
        setActiveLink(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeLink]); // Rerun effect if activeLink changes

  return (
    <Navbar
      expand="lg"
      variant="dark"
      fixed="top"
      style={{
        backgroundColor: isScrolled ? 'rgba(13, 13, 13, 0.95)' : 'transparent',
        transition: 'background-color 0.3s ease-in-out',
        width: '100%',
        zIndex: 1030,
        padding: '1rem 0'
      }}
    >
      <Container>
        <Navbar.Brand href="#home" className="navbar-logo">
          Senzo.D
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className={activeLink === "home" ? "active" : ""}>
              Home
            </Nav.Link>
            <Nav.Link href="#about" className={activeLink === "about" ? "active" : ""}>
              About
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className={activeLink === "projects" ? "active" : ""}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              href="#blog"
              className={activeLink === "blog" ? "active" : ""}
            >
              Blog
            </Nav.Link>
            <Nav.Link
              href="#contact"
              className={activeLink === "contact" ? "active" : ""}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;