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

export const DELETE_USER = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email)
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation(
    $lastName: String!
    $firstName: String!
    $email: String!
    $updateUserId: Float!
  ) {
    updateUser(
      lastName: $lastName
      firstName: $firstName
      email: $email
      id: $updateUserId
    ) {
      id
      email
      firstName
      lastName
    }
  }
`;

// export const CREATE_CONSUMPTION = gql`
//   mutation CreateConsumption(
//     $userId: Float!
//     $recipeIds: [Int!]!
//     $createdAt: DateTime!
//     $description: String!
//     $empreinte: String!
//   ) {
//     createConsumptionWithRecipeUser(
//       userId: $userId
//       recipeIds: $recipeIds
//       createdAt: $createdAt
//       description: $description
//       empreinte: $empreinte
//     ) {
//       id
//       empreinte
//       description
//       createdAt
//       recipes {
//         name
//         calcul
//       }
//       user {
//         id
//         email
//       }
//     }
//   }
// `;

export const CREATE_CONSUMPTION = gql`
  mutation CreateConsumption(
    $userId: Float!
    $recipeIds: [String!]!
    $createdAt: DateTime!
    $description: String!
    $empreinte: String!
  ) {
    createConsumptionWithRecipeUser(
      userId: $userId
      recipeIds: $recipeIds
      createdAt: $createdAt
      description: $description
      empreinte: $empreinte
    ) {
      id
      empreinte
      description
      createdAt
      recipes {
        name
        calcul
      }
      user {
        email
        id
      }
    }
  }
`;
