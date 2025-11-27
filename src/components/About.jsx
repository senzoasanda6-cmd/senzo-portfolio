import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

export default function About() {
  const allSkills = [
    "React.js", "Bootstrap", "GSAP", "Laravel", "Laravel Sanctum", 
    "C#", "ASP.NET", "MySQL", "SQL Server", "Power BI", "Power Apps"
  ]

  return (
    <section id="about" className="py-5 bg-dark text-light">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center mb-4 mb-md-0">
            <Image
              src="/images/profile-picture.jpg"
              roundedCircle
              fluid
              className="profile-pic img-fluid"
              style={{
                maxWidth: '250px',
                height: 'auto',
                border: '3px solid var(--primary-color)'
              }}
              alt="Profile"
            />
          </Col>
          <Col md={8} className="about-content">
            <h2 className="mb-4 fw-bold">About Me</h2>
            <p className="lead" style={{ color: '#a0a0a0' }}>
              I am a passionate and versatile software developer dedicated to building efficient, scalable, and user-centric applications. With a strong foundation in both front-end and back-end development, I enjoy bringing ideas to life through clean and maintainable code.
            </p>
            <p>
              My technical expertise spans across the full stack, from creating dynamic user interfaces to building robust server-side logic and managing databases. I am also experienced in leveraging low-code platforms to deliver powerful business solutions.
            </p>
            <div className="skills-list mt-4">
              <h5 className="mb-3">Skills:</h5>
              <div className="d-flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <span 
                    key={skill} 
                    className="badge"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 'normal',
                      borderRadius: '20px',
                      backgroundColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                      padding: '0.5em 1em'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
