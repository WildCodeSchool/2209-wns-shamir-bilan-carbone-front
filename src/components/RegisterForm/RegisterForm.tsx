import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

type HandleSignUp = (
  //   email: string,
  //   password: string,
  //   firstName: string,
  //   lastName: string
  formData: FormData
) => void;

interface IRegisterFormProps {
  handleSignUp: HandleSignUp;
}

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function RegisterForm({ handleSignUp }: IRegisterFormProps) {
  const [state, setState] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
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
    // handleSignUp(state.email, state.password, state.firstName, state.lastName);
    handleSignUp(state);
  };

  return (
    <Box
      component="form"
      sx={{
        // backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: 400,
      }}
    >
      <TextField
        required
        id="outlined-required-1"
        label="Prenom"
        InputLabelProps={{
          shrink: true,
        }}
        name="firstName"
        onChange={handleChange}
      />
      <TextField
        required
        id="outlined-required-2"
        label="Email"
        // placeholder="pierre.durand@gmail.com"
        InputLabelProps={{
          shrink: true,
        }}
        name="email"
        onChange={handleChange}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Mot de passe"
        type="password"
        // autoComplete="current-password"
        InputLabelProps={{
          shrink: true,
        }}
        name="password"
        onChange={handleChange}
      />
      <TextField
        id="outlined-number"
        label="Nom"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        name="lastName"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        onClick={(e) => handleSubmit(e)}
        sx={{
          // backgroundColor: "#4caf50",
          backgroundColor: "#9AE19D",
          color: "#073b3a",
          "&:hover": {
            backgroundColor: "#388e3c",
            color: "white",
          },
          "&:active": {
            backgroundColor: "#1b5e20",
            color: "white",
          },
        }}
      >
        Valider
      </Button>
    </Box>
  );
}
