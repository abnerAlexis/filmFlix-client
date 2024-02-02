import React, { useState } from "react";
import {
  Form,
  Button,
  CardGroup,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, onUserUpdate, onDeregister }) => {
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.Email);
  const [newBirthday, setNewBirthday] = useState(user.Birthday);
  const URL = "https://film-flix-3b34b5f2dccd.herokuapp.com";

  const formatDateStringToApiFormat = (originalDateString) => {
    const originalDate = new Date(originalDateString);
    const formattedDateString = originalDate.toISOString().split('T')[0];
    return formattedDateString;
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL + `/${user.Username}`);
      const userData = await response.json();

      const updatedUser = {
        Username: newUsername,
        Email: newEmail,
        Birthday: formatDateStringToApiFormat(newBirthday),
      };

      if (newPassword) {
        updatedUser.Password = newPassword;
      }

      const updateResponse = await fetch(
        URL + `users/${userData.newUsername}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (updateResponse.ok) {
        onUserUpdate(updatedUser);
      } else {
        console.error("Update failed:", updateResponse.statusText);
      }
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Title>Profile View</Card.Title>
                <Form onSubmit={handleUserUpdate}>
                  <Form.Group controlId="profileUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      minLength={3}
                      required
                    />
                  </Form.Group>
                  {/* Rendering the newPassword field (OpenAI) */}
                  {user.Password && (
                    <Form.Group controlId="profilePassword">
                      <Form.Label>New Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Form.Group>
                  )}
                  <Form.Group controlId="profileEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="profileBirthday">
                    <Form.Label>Birthdate: </Form.Label>
                    <Form.Control
                      type="date"
                      value={newBirthday}
                      onChange={(e) => setNewBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleUserUpdate}
                  >
                    Update
                  </Button>
                  <Link to="/profile/favorites">
                    <Button variant="primary">Your Favorite Movies</Button>
                  </Link>
                </Form>
                <Button variant="danger" onClick={ onDeregister }>
                  Delete Account
                </Button>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
