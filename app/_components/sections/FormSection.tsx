"use client";

import DynamicForm from "@/components/common/DynamicForm";
import { FORM_SUBMISSION } from "@/graphql/mutations";
import { GET_FORM_DETAIL } from "@/graphql/queries";
import { Section } from "@/types/section";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";

const FormSection = ({ section }: { section: Section }) => {
  const { data } = useQuery(GET_FORM_DETAIL, {
    variables: {
      id: section.contentTypeId,
    },
  });

  const formData = data?.formDetail || {};
  const [submitForm] = useMutation(FORM_SUBMISSION, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{section.content}</h2>
        <DynamicForm formData={formData} submitForm={submitForm} />
      </div>
    </section>
  );
};

export default FormSection;
