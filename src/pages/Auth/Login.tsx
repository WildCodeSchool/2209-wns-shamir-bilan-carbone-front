import React from "react";
import { Container, Typography } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login() {
  return (
    <Container maxWidth="sm" id={"loginPage"}>
      <Typography variant="h4" component="h1" gutterBottom></Typography>
      <LoginForm />
    </Container>
  );
}
