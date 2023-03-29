import { gql } from "@apollo/client";

export const GET_TOKEN = gql`
  mutation GetToken($password: String!, $email: String!) {
    getToken(password: $password, email: $email)
  }
`;

export const REGISTER_USER = gql`
  mutation CreateUser($data: RegisterInput!) {
    createUser(data: $data) {
      email
      firstName
      lastName
    }
  }
`;
