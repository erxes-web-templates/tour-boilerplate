import { gql } from "@apollo/client";

export const FORM_SUBMISSION = gql`
  mutation WidgetsSaveLead(
    $formId: String!
    $browserInfo: JSON!
    $submissions: [FieldValueInput]
  ) {
    widgetsSaveLead(
      formId: $formId
      browserInfo: $browserInfo
      submissions: $submissions
    ) {
      status
    }
  }
`;

export const ADD_ORDER = gql`
  mutation BmOrderAdd($order: BmsOrderInput) {
    bmOrderAdd(order: $order) {
      _id
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation BmOrderEdit($id: String!, $order: BmsOrderInput) {
    bmOrderEdit(_id: $id, order: $order) {
      _id
    }
  }
`;

export const CREATE_INVOICE = gql`
  mutation InvoiceCreate(
    $amount: Float!
    $contentType: String
    $contentTypeId: String
    $customerId: String
    $customerType: String
    $paymentIds: [String]
    $currency: String
  ) {
    invoiceCreate(
      amount: $amount
      contentType: $contentType
      contentTypeId: $contentTypeId
      customerId: $customerId
      customerType: $customerType
      paymentIds: $paymentIds
      currency: $currency
    ) {
      _id
      redirectUri
    }
  }
`;
