import { useNavigate } from "react-router-dom";
import { Container, Typography, CircularProgress } from "@mui/material";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../gql/mutations";

import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function Register() {
  const navigate = useNavigate();
  const [signUp, { loading, error }] = useMutation(REGISTER_USER, {
    // onCompleted: () => {
    //   navigate("/auth/login");
    // },
    onCompleted: (data) => {
      if (data.createUser) {
        navigate("/");
      }
    },
  });
  if (loading) return <CircularProgress />;
  if (error) {
    return <Typography>Error !</Typography>;
  }

  const handleSignUp = (
    // email: string,
    // password: string,
    // firstName: string,
    // lastName: string
    formData: any
  ) => {
    // signUp({ variables: { email, password, firstName, lastName } });
    signUp({ variables: { data: formData } });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" style={{ paddingTop: "50px" }}>
        Création de compte
      </Typography>
      <RegisterForm handleSignUp={handleSignUp} />
    </Container>
  );
}
