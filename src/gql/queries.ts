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
  query getAllUsers {
    getAllUsers {
      id
      email
      role
      firstName
      lastName
    }
  }
`;
