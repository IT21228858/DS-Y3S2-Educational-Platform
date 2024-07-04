import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useCourseData } from "../../hooks/useCourseData";

const Home = () => {
  const { data: courses } = useCourseData("Approved");

  return (
    <>
      <NavBar />
      <Container className="mt-5">
        <h1>Welcome to Our Educational Platform for Online Learning</h1>
        <Row className="mt-4">
          {courses &&
            courses.data.courses.slice(0, 3).map((course) => (
              <Col key={course._id} xs={12} md={4}>
                <Card className="mb-4">
                  <Card.Img
                    variant="top"
                    src={course.image}
                    alt={course.title}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>
                      {course.description.length > 40
                        ? course.description.slice(0, 40) + "..."
                        : course.description}
                    </Card.Text>
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/course/${course._id}`}
                    >
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
        <div className="text-center">
          <Button
            as={Link}
            to="/courses"
            variant="outline-primary"
            className="mt-4"
          >
            View All Courses
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
