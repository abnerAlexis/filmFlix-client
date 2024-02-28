import { Navbar, Container, Nav} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../search-bar/search-bar";

export const NavigationBar = ({ user, onLoggedOut,onSearch }) => {

  const location = useLocation();
  const handleRefresh = () => {
    window.location.href = "/";
  };

  return (
    <Navbar sticky="top" bg="dark" expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand onClick={handleRefresh}>
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
                <Nav.Link onClick={handleRefresh}>Home</Nav.Link> 
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>   
          {
            location.pathname === "/" && 
            <SearchBar
            onSearch={onSearch}
            />
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
