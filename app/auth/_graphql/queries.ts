import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      _id
      username
      email
      details {
        firstName
        lastName
        avatar
      }
    }
  }
`;
