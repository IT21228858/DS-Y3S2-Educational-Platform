import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Card,
} from "react-bootstrap";
import { useCourseData } from "../../hooks/useCourseData";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar";

const CourseList = () => {
  const { data: courses } = useCourseData("Approved");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses?.data?.courses.filter((course) =>
    course?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Navbar />
      <Container>
        <h1 className="mt-4 mb-4">Courses</h1>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search by course name"
            aria-label="Search by course name"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <Row className="mb-4">
          {filteredCourses &&
            filteredCourses.map((course) => (
              <Col key={course?._id} xs={12} md={6} lg={4} className="mb-4">
                <Link
                  to={`/course/${course?._id}`}
                  className="text-decoration-none text-dark"
                >
                  <Card>
                    <Card.Img
                      variant="top"
                      src={course?.image}
                      alt={course?.title}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <Card.Body>
                      <Card.Title>{course?.title}</Card.Title>
                      {/* show only 1st 100 characters of description */}
                      <Card.Text>
                        {course?.description?.slice(0, 150)}...
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted">
                          {course?.instructor?.name}
                        </div>
                        <div className="fw-bold fs-5">Rs.{course?.price}</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default CourseList;
