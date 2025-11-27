import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaExternalLinkAlt } from "react-icons/fa";

// --- Blog Data ---
// Link to your articles on platforms like Medium, Dev.to, or a personal blog.
const blogPosts = [
  {
    title: "Understanding React Hooks: A Deep Dive",
    description:
      "A comprehensive guide to understanding the power of React Hooks and how they can simplify your component logic and state management.",
    link: "#", // Replace with your article URL
    date: "October 26, 2023",
  },
  {
    title: "Building a REST API with Node.js and Express",
    description:
      "A step-by-step tutorial on creating a secure and scalable RESTful API from scratch using Node.js, Express, and MongoDB.",
    link: "#", // Replace with your article URL
    date: "September 15, 2023",
  },
  {
    title: "CSS-in-JS: A Modern Approach to Styling",
    description:
      "Exploring the pros and cons of different CSS-in-JS libraries like Styled Components and Emotion, and when to use them in your projects.",
    link: "#", // Replace with your article URL
    date: "August 01, 2023",
  },
];

const Blog = () => {
 return (
    <section id="blog" className="py-5 bg-dark">
      <Container>
        <h2 className="text-center mb-5">
          Latest Posts
        </h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {blogPosts.map((post, i) => (
            <Col key={i}>
              <Card className="h-100 blog-card">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{post.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {post.date}
                  </Card.Subtitle>
                  <Card.Text className="text-secondary">{post.description}</Card.Text>
                  <div className="mt-auto">
                    <Button variant="outline-primary" href={post.link} target="_blank" rel="noreferrer">
                      Read More <FaExternalLinkAlt className="ms-1" />
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
};

export default Blog;