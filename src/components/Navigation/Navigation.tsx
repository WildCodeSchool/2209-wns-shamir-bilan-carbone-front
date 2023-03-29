import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

const Navigation = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  console.log(authToken);

  return (
    <Box>
      <div
        className={
          authToken
            ? "navigation navigation-wide"
            : "navigation navigation-narrow"
        }
      >
        <AppBar
          sx={{
            backgroundColor: "#4caf50",
          }}
        >
          <Toolbar
            sx={{
              width: "50%",
              // backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            {/* <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}> */}
            <Link
              to="/"
              className="link"
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: "10px",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              <div>Just Reduce</div>
            </Link>

            {!authToken && <div>|</div>}

            {authToken && (
              <Link
                to="/profile"
                className="link"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                My profile
              </Link>
            )}

            {authToken ? (
              <div
                className="link"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate(`/loginreal`);
                }}
              >
                logout
              </div>
            ) : (
              <Link
                // to="/Login"
                to="/loginreal"
                className="link"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                login
              </Link>
            )}
            {/* </Box> */}
          </Toolbar>
        </AppBar>
      </div>
    </Box>
  );
};

export default Navigation;
