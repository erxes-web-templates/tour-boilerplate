import { gql } from "@apollo/client";

export const INVOICE_SUBSCRIPTION = gql`
  subscription invoiceUpdated($invoiceId: String!) {
    invoiceUpdated(_id: $invoiceId)
  }
`;

export const TRANSACTION_SUBSCRIPTION = gql`
  subscription transactionUpdated($invoiceId: String!) {
    transactionUpdated(invoiceId: $invoiceId)
  }
`;
