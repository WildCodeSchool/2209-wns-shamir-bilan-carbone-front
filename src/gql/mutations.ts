import { gql } from "@apollo/client";

export const GET_TOKEN = gql`
  mutation GetToken($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;
