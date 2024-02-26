import { useState } from "react";
import { Navbar, Container, Nav, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      window.location.href = `/searchresults?search=${encodeURIComponent(searchInput.trim())}`;
    }
  }

  return (
    <Navbar sticky="top" bg="dark" expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Film Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          <Form 
            onSubmit={handleSearchSubmit}
            className="d-flex"
          >
            <FormControl 
              type="text"
              placeholder="Search movies by title..."
              className="mr-2"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
