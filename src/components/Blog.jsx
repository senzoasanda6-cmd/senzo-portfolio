import React from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { FaReact, FaNodeJs, FaDocker, FaDatabase } from "react-icons/fa";
import { FaL, FaLaravel } from "react-icons/fa6";
import {

  SiMongodb,
  SiDotnet,
} from "react-icons/si";
import { MdOutlineFeedback } from "react-icons/md"
const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95, icon: <FaReact />, color: "#61DAFB" },

      { name: "Next.js", level: 85, icon: null, color: "#000000" },
      { name: "Vue.js", level: 70, icon: null, color: "#4FC08D" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 92, icon: <FaNodeJs />, color: "#68A063" },
      { name: "Laravel", level: 85, icon: <FaLaravel />, color: "#3776AB" },
      { name: "C#", level: 80, icon: <SiDotnet />, color: "#E535AB" },
      // { name: "REST APIs", level: 95, icon: null, color: "#FF6B6B" },
      {
        name: "ASP (Healthcare Survey)",
        level: 88,
        icon: <MdOutlineFeedback />,
        color: "#61DBFB",
      },
    ],
  },
  {
    category: "DevOps & Cloud",
    skills: [
      // { name: "AWS", level: 85, icon: <FaAws />, color: "#FF9900" },
      { name: "Docker", level: 80, icon: <FaDocker />, color: "#2496ED" },
      // {
      //   name: "Kubernetes",
      //   level: 70,
      //   icon: <SiKubernetes />,
      //   color: "#326CE5",
      // },
      // { name: "CI/CD", level: 90, icon: null, color: "#00D8FF" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "SQL", level: 88, icon: <SiMongodb />, color: "#47A248" },
      // {
      //   name: "PostgreSQL",
      //   level: 85,
      //   icon: <SiPostgresql />,
      //   color: "#336791",
      // },
      // { name: "Redis", level: 75, icon: null, color: "#DC382D" },
      { name: "MySQL", level: 80, icon: <FaDatabase />, color: "#4479A1" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-5 bg-dark">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold gradient-text mb-3">
            Technical Expertise
          </h2>
          <p className="text-muted lead">
            Technologies I work with and my proficiency levels
          </p>
        </div>

        <Row className="g-4">
          {skillsData.map((category, catIndex) => (
            <Col md={6} lg={3} key={catIndex}>
              <div
                className="skill-category-card p-4 h-100 rounded"
                style={{
                  background:
                    "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <h4 className="h5 mb-4" style={{ color: "#00ccff" }}>
                  {category.category}
                </h4>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center gap-2">
                        {skill.icon && (
                          <span style={{ color: skill.color }}>
                            {skill.icon}
                          </span>
                        )}
                        <span className="text-light">{skill.name}</span>
                      </div>
                      <span className="text-muted">{skill.level}%</span>
                    </div>
                    <ProgressBar
                      now={skill.level}
                      style={{ height: "8px" }}
                      className="rounded-pill"
                      variant="custom"
                    />
                  </div>
                ))}
              </div>
            </Col>
          ))}
        </Row>

        {/* Tech Stack Visual */}
        <div className="mt-5 pt-5 border-top border-secondary">
          <h4 className="text-center mb-4">My Tech Stack</h4>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {skillsData
              .flatMap((cat) => cat.skills)
              .map((skill, index) => (
                <div key={index} className="tech-icon text-center">
                  <div
                    className="icon-wrapper mb-2 p-3 rounded-circle"
                    style={{
                      background: `${skill.color}20`,
                      border: `2px solid ${skill.color}40`,
                      width: "80px",
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                    }}
                  >
                    {skill.icon || skill.name.charAt(0)}
                  </div>
                  <small className="text-muted">{skill.name}</small>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Skills;
