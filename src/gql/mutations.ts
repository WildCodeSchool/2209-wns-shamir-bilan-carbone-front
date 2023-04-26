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

export const CREATE_RECIPE = gql`
  mutation Mutation(
    $agribalyseIds: [Int!]!
    $empreinte: String!
    $description: String!
    $name: String!
  ) {
    createRecipe(
      agribalyseIds: $agribalyseIds
      empreinte: $empreinte
      description: $description
      name: $name
    ) {
      id
      name
      description
      calcul
      agribalyses {
        id
        idAgr
        subgroup
        name
        empreinte
      }
    }
  }
`;
