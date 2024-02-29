import React, { useEffect, useState } from "react";
import "./profile-view.scss";
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
import {
  updateUser,
  deleteAccount,
  formatDateStringToApiFormat,
} from "../../commons/utils";

export const ProfileView = ({ user, token, onUserUpdate, onDeleteAccount }) => {
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.Email);
  const [newBirthday, setNewBirthday] = useState(user.Birthday);
  const [refreshPage, setRefreshPage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: formatDateStringToApiFormat(newBirthday),
    };
    user.Username = newUser.Username
    user.Password = newUser.Password
    user.Email = newUser.Email
    user.Birthday = newUser.Birthday
    await updateUser(user.Username, newUser, token);
    onUserUpdate(user);
    setRefreshPage(!refreshPage)
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await deleteAccount(user.Username, token);
    onDeleteAccount();
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }} className="profile-view-container">
      <div className="text-muted">
        <h5 style={{ color: "whitesmoke" }}>{user.Username}</h5>
        <h6 style={{ color: "whitesmoke" }}>{user.Email}</h6>
      </div>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Profile View</Card.Title>
                {/* <Form onSubmit={onUserUpdate}> */}
                <Form>
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
                    className="profile-btns"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                  <Link to="/profile/favorites">
                    <Button variant="primary" className="profile-btns">Your Favorite Movies</Button>
                  </Link>
                  <Button variant="danger" className="profile-btns" onClick={handleDelete}>
                    Delete Account
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
