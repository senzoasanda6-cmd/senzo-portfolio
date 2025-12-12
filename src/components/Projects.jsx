import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projectData from "../data/projects.json"; // ✅ Import JSON file

export default function Projects() {
 return (
    <section id="projects" className="py-5 bg-dark text-light">
      <Container>
        <h2 className="text-center mb-5 fw-bold display-4">
          My Projects
        </h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {projectData.map((project, i) => (
            <Col key={i}>
              <Card className="h-100 project-card shadow-lg" style={{
                background: 'var(--background-light)',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <Card.Img variant="top" src={project.image} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold" style={{ color: 'var(--text-primary)' }}>{project.title}</Card.Title>
                  <Card.Text className="text-secondary">
                    {project.description}
                  </Card.Text>
                  <div className="mt-auto">
                    <div className="mb-3">
                      {project.technologies.map((tech, index) => (
                        <Badge 
                      pill 
                      as="span" 
                      key={index} 
                      className="me-1 mb-1"
                      style={{
                        backgroundColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                        fontWeight: 'normal',
                        fontSize: '0.8rem',
                        padding: '0.4em 0.8em'
                      }}
                    >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="primary"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="me-2"
                    >
                      <FaExternalLinkAlt className="me-1" /> Live Demo
                    </Button>
                    <Button
                      variant="outline-light"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub className="me-1" /> Source
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
