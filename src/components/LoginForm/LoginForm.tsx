import { useState, useContext } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [state, setState] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { value } = e.target;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(state.email, state.password);
  };

  return (
    <Box
      component="form"
      sx={{
        // backgroundColor: 'white',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: 400,
      }}
    >
      <TextField
        required
        id="outlined-required"
        label="Email"
        // placeholder="pierre.durand@gmail.com"
        InputLabelProps={{
          shrink: true,
        }}
        name="email"
        onChange={(e) => handleChange(e)}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Mot de passe"
        type="password"
        autoComplete="current-password"
        InputLabelProps={{
          shrink: true,
        }}
        name="password"
        onChange={(e) => handleChange(e)}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#4caf50",
          "&:hover": {
            backgroundColor: "#388e3c",
          },
          "&:active": {
            backgroundColor: "#1b5e20",
          },
        }}
        onClick={(e) => handleSubmit(e)}
      >
        Connexion
      </Button>
      <Typography>Pas encore enregistré?</Typography>
      <Link to="/register">Créer un compte</Link>
    </Box>
  );
}
