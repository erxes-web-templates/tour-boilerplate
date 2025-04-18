import { gql } from "@apollo/client";

export const FORM_SUBMISSION = gql`
  mutation WidgetsSaveLead($formId: String!, $browserInfo: JSON!, $submissions: [FieldValueInput]) {
    widgetsSaveLead(formId: $formId, browserInfo: $browserInfo, submissions: $submissions) {
      status
    }
  }
`;

export const CREATE_CP_MUTATION = gql`
  mutation ClientPortalConfigUpdate($config: ClientPortalConfigInput!) {
    clientPortalConfigUpdate(config: $config) {
      _id
    }
  }
`;

export const EDIT_CP_MUTATION = gql`
  mutation ClientPortalConfigUpdate($config: ClientPortalConfigInput!) {
    clientPortalConfigUpdate(config: $config) {
      _id
    }
  }
`;

export const UPDATE_PAGE_MUTATION = gql`
  mutation CmsPagesEdit($id: String!, $input: PageInput!) {
    cmsPagesEdit(_id: $id, input: $input) {
      _id
    }
  }
`;

export const CREATE_PAGE_MUTATION = gql`
  mutation CmsPagesAdd($input: PageInput!) {
    cmsPagesAdd(input: $input) {
      _id
    }
  }
`;
