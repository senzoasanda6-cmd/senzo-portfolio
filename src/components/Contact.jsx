import React, { useState } from "react";
import emailjs from "emailjs-com";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  Spinner,
  Alert,
} from "react-bootstrap";


const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    // --- Replace with your EmailJS details ---
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.send(serviceID, templateID, formData, publicKey).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setStatus("success");
        setFormData({ from_name: "", from_email: "", message: "" }); // Clear form
      },
      (err) => {
        console.error("FAILED...", err);
        setStatus("error");
        setError("Failed to send message. Please try again later.");
      }
    );
  };

  return (
    <section id="contact" className="py-5 bg-dark text-light" style={{
      minHeight: '100vh',
      display: 'block',
      position: 'relative',
      zIndex: 1,
      padding: '4rem 0'
    }}>
      <Container>
        <h2 className="text-center mb-5 fw-bold display-4">Get In Touch</h2>
        <p className="text-center text-muted mb-5">
          Have a question or want to work together? Leave your details and I'll
          get back to you as soon as possible.
        </p>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            {status === "success" && (
              <Alert variant="success">
                Your message has been sent successfully!
              </Alert>
            )}
            {status === "error" && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName" style={{ color: '#ffffff' }}>
                <FloatingLabel label="Name" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail" style={{ color: '#ffffff' }}>
                <FloatingLabel label="Email address" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMessage" style={{ color: '#ffffff' }}>
                <FloatingLabel label="Message">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave your message here"
                    style={{ height: "150px" }}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>
              </Form.Group>

              <Col md={6} className="contact-info" style={{
                padding: '2rem',
                backgroundColor: 'rgba(26, 26, 26, 0.5)',
                borderRadius: '10px',
                border: '1px solid var(--border-color)'
              }}>
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    backgroundColor: '#61dafb',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    borderRadius: '30px',
                    marginTop: '1rem',
                    boxShadow: '0 4px 15px rgba(97, 218, 251, 0.3)'
                  }}
                  className="mt-4"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span className="ms-2">Sending...</span>
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;