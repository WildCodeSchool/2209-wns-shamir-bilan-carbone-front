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
        id="outlined-number"
        label="Nom"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        name="lastName"
        onChange={handleChange}
      />
      <TextField
        required
        id="outlined-required-2"
        label="Email"
        placeholder="anna.mirren@gmail.com"
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
        autoComplete="current-password"
        InputLabelProps={{
          shrink: true,
        }}
        name="password"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        onClick={(e) => handleSubmit(e)}
        sx={{
          backgroundColor: "#32c481",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#073b3a",
            color: "#ffffff",
          },
          "&:active": {
            backgroundColor: "#073b3a",
            color: "#ffffff",
          },
        }}
      >
        Valider
      </Button>
    </Box>
  );
}
