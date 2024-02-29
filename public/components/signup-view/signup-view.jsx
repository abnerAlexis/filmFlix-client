import { useState } from "react";
import {
  Form,
  Button,
  CardGroup,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { formatDateStringToApiFormat } from "../../commons/utils";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: formatDateStringToApiFormat(birthday),
    };

    fetch("https://film-flix-3b34b5f2dccd.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup Successful.");
        window.location.reload();
      } else {
        alert("Signup Failed.");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Signup</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="signupUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="JohnDoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      minLength={3}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="signupPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="jonhdoe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="birthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit" style={{ margin: '10px 10px' }}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
