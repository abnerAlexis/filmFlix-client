import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchBar } from "./search-bar";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {

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
          <SearchBar
            onSearch={onSearch}

          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
