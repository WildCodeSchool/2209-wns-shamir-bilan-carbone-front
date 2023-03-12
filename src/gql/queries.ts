import { gql } from "@apollo/client";

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
