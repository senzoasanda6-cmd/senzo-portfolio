import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="back-to-top">
      {isVisible && (
        <Button onClick={scrollToTop} className="back-to-top-btn">
          <FaArrowUp />
        </Button>
      )}
    </div>
  );
};

export default BackToTopButton;