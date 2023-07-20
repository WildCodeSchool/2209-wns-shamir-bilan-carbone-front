import { gql } from "@apollo/client";

export const GETALL_ALIMENTS = gql`
  query GetAllAliments {
    getAllAliments {
      id
      idAgr
      subgroup
      name
      empreinte
    }
  }
`;

export const AGRIBALYSE_QUERY = gql`
  query AgribalyseQuery {
    results {
      _i
      name
      subgroup
      empreinte
    }
  }
`;

export const GETALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      firstName
      lastName
    }
  }
`;

export const GETALL_RECIPES = gql`
  query GetAllRecipes {
    getAllRecipes {
      id
      name
      description
      calcul
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query ExampleQuery($email: String!) {
    findUserByEmail(email: $email) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const GETALL_CONS = gql`
  query GetConsByUser($userId: Float!) {
    getConsByUser(userId: $userId) {
      id
      empreinte
      description
      createdAt
      recipes {
        name
        calcul
      }
      user {
        id
        email
      }
    }
  }
`;
