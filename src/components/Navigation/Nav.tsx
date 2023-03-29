import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

const Nav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: "#4caf50",
            // "&:hover": {
            //   backgroundColor: "#388e3c",
            // },
            // "&:active": {
            //   backgroundColor: "#1b5e20",
            // },
          }}
        >
          <Typography variant="h5" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Just Reduce Home
            </Link>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            <Link
              to="/loginreal"
              style={{
                textDecoration: "none",
                color: "white",
                marginRight: "10px",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
            >
              Register
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Nav;
