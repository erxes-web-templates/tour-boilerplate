import { gql } from "@apollo/client";

export const FORM_SUBMISSION = gql`
  mutation WidgetsSaveLead($formId: String!, $browserInfo: JSON!, $submissions: [FieldValueInput]) {
    widgetsSaveLead(formId: $formId, browserInfo: $browserInfo, submissions: $submissions) {
      status
    }
  }
`;
