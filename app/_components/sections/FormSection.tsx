import { GET_FORM_DETAIL } from "../../../graphql/queries";
import { Section } from "../../../types/sections";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import DynamicForm from "../../../components/common/DynamicForm";
import { FORM_SUBMISSION } from "../../../graphql/mutations";

const FormSection = ({ section }: { section: Section }) => {
  const { data } = useQuery(GET_FORM_DETAIL, {
    variables: {
      id: section.contentTypeId,
    },
  });

  console.log(data, "data");
  // const formData = data?.formDetail || {};
  const [submitForm] = useMutation(FORM_SUBMISSION, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  const formData = {
    _id: "9Ky945RMSDGhZ2vPP",
    fields: [
      {
        _id: "9Ky945RMSDGhZ2vPP",
        isRequired: true,
        text: "Name",
        options: [],
        type: "input",
        validation: null,
        description: null,
      },
      {
        _id: "XyKhD3ZL9FtcFyrzs",
        isRequired: true,
        text: "Phone",
        options: [],
        type: "phone",
        validation: "phone",
        description: null,
      },
      {
        _id: "kNX8DzkXeSPh5XxDz",
        isRequired: true,
        text: "Email",
        options: [],
        type: "email",
        validation: "email",
        description: null,
      },
      {
        _id: "wT7Ybiki8Tnfn3TZv",
        isRequired: true,
        text: "Organization name",
        options: [],
        type: "input",
        validation: null,
        description: null,
      },
      {
        _id: "c2LbxD5PRvjCMkJxJ",
        isRequired: true,
        text: "Professional service type",
        options: ["Premium Support", "Custom Onboarding", "Dedicated Implementation Services", "Migration Services"],
        type: "check",
        validation: null,
        description: "",
      },
      {
        _id: "LGYgbRDJ4L4SNNw7x",
        isRequired: true,
        text: "Message",
        options: [],
        type: "textarea",
        validation: null,
        description: null,
      },
    ],
  };

  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{section.content}</h2>
        <div className=" max-w-[600px] mx-auto">
          <DynamicForm formData={formData} submitForm={submitForm} />
        </div>
      </div>
    </section>
  );
};

export default FormSection;
