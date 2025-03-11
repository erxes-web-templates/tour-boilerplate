import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation ClientPortalLogin($login: String!, $password: String!, $clientPortalId: String!) {
    clientPortalLogin(login: $login, password: $password, clientPortalId: $clientPortalId)
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    clientPortalLogout
  }
`;

export const REGISTER_MUTATION = gql`
  mutation ClientPortalRegister(
    $clientPortalId: String
    $phone: String
    $email: String
    $username: String
    $password: String
    $lastName: String
    $firstName: String
    $secondaryPassword: String
  ) {
    clientPortalRegister(
      clientPortalId: $clientPortalId
      phone: $phone
      email: $email
      username: $username
      password: $password
      lastName: $lastName
      firstName: $firstName
      secondaryPassword: $secondaryPassword
    )
  }
`;
