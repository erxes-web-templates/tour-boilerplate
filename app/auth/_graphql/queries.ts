import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query ClientPortalCurrentUser {
    clientPortalCurrentUser {
      _id
      clientPortalId
      firstName
      fullName
      lastName
      username
      avatar
      erxesCustomerId
      email
      phone
    }
  }
`;
