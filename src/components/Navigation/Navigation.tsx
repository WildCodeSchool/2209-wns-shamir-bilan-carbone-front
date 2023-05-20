import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "../../gql/queries";
import { UPDATE_USER } from "../../gql/mutations";
import EditUser from "../User/EditUser";
import jwtDecode from "jwt-decode";
import IUser from "../../interfaces/IUser";

interface NavigationProps {
  userInfo?: IUser;
  firstNamePayload?: string;
  lastNamePayload?: string;
  handleUpdateUser?: (
    id: number,
    firstName: string,
    lastName: string
  ) => Promise<void>;
}

const Navigation = ({ firstNamePayload, lastNamePayload }: NavigationProps) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  let isAdmin = false;
  let userFirstName = "";
  let userEmail = "";

  if (authToken) {
    const tokenPayload: any = jwtDecode(authToken);
    if (tokenPayload) {
      userFirstName = tokenPayload.firstName.charAt(0).toUpperCase();
      userEmail = tokenPayload.email;
    }
    if (tokenPayload && tokenPayload.role === "ADMIN") {
      isAdmin = true;
    }
  }

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_BY_EMAIL, { variables: { email: userEmail } });

  console.log("userData", userData);

  const [updateUser] = useMutation(UPDATE_USER);
  const handleUpdateUser = async (
    firstName: string,
    lastName: string,
    email: string,
    updateUserId: number
    // password: string
  ) => {
    try {
      const response = await updateUser({
        variables: {
          // id: userData.findUserByEmail.id,
          firstName: firstName,
          lastName: lastName,
          email: userData.findUserByEmail.email,
          updateUserId: Number(userData.findUserByEmail.id),
          // password: password,
        },
      });
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  if (userLoading) return <p>Loading...</p>;
  // if (userError) return <p>Error...</p>;

  console.log(authToken);
  console.log(userEmail);
  return (
    <Navbar collapseOnSelect expand="lg" id={"navigationBar"} className={""}>
      <Container className={"navbar-bg nav-container"}>
        <Link className="navbar-brand" to="/">
          <Navbar.Brand>Just Reduce</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isAdmin && (
              <Link className="nav-link" to="/admin">
                <Nav>Admin</Nav>
              </Link>
            )}
          </Nav>

          <Nav>
            {authToken && (
              <NavDropdown title="Mon compte" id="collasible-nav-dropdown">
                <Nav.Link as={Link} to="/profile">
                  Récapitulatif
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  <EditUser
                    firstNamePayload={userData.findUserByEmail.firstName}
                    lastNamePayload={userData.findUserByEmail.lastName}
                    handleUpdateUser={handleUpdateUser}
                    userInfo={userData.findUserByEmail}
                  />
                </Nav.Link>
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

            {authToken && (
              // <Link className="nav-link" to="/loginreal">
              <Nav>
                <div className="avatar">{userFirstName}</div>
              </Nav>
              // </Link>
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
