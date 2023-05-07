import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  console.log(authToken);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      id={"navigationBar"}
      className={""}
      // bg="dark"
      // variant="dark"
    >
      <Container className={"navbar-bg nav-container"}>
        <Link className="navbar-brand" to="/">
          <Navbar.Brand>Just Reduce</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {authToken && (
              <Link className="nav-link" to="/admin">
                <Nav>Admin</Nav>
              </Link>
            )}
          </Nav>

          <Nav>
            {authToken && (
              <NavDropdown title="Mon compte" id="collasible-nav-dropdown">
                <Link to="/" className="dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Récapitulatif
                  </NavDropdown.Item>
                </Link>
                <Link to="/" className="dropdown">
                  <NavDropdown.Item href="#action/3.2">
                    Paramètres
                  </NavDropdown.Item>
                </Link>
                {/* <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Supprimer
                </NavDropdown.Item> */}
              </NavDropdown>
            )}

            {authToken ? (
              <Nav.Link
                className="nav-link"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate(`/`);
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Link className="nav-link" to="/loginreal">
                <Nav>Connexion</Nav>
              </Link>
            )}

            {/* {authToken && (
              <Link className="nav-link" to="/admin">
                <Nav>Admin</Nav>
              </Link>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
