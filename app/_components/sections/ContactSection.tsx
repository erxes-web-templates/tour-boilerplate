"use client";

import React, { useState } from "react";
import { Section } from "@/types/section";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, CheckCircle, Youtube, MessageCircle } from "lucide-react";
import DynamicForm from "../../../components/common/DynamicForm";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FORM_DETAIL } from "../../../graphql/queries";
import { FORM_SUBMISSION } from "../../../graphql/mutations";
import cpDetail from "@/data/configs.json";

interface SocialItem {
  name: string;
  url: string | string[];
}

const ContactSection = ({ section }: { section: Section }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { data } = useQuery(GET_FORM_DETAIL, {
    variables: {
      id: section.config.formId,
    },
  });

  const formData = data?.formDetail || {};
  const [submitForm] = useMutation(FORM_SUBMISSION, {
    onCompleted: (data) => {
      console.log(data);
      setFormSubmitted(true);
    },
  });

  const getSocialUrl = (name: string): string | undefined => {
    const socialItems = cpDetail?.additional?.social as SocialItem[] | undefined;
    const item = socialItems?.find((item) => item.name === name);
    return Array.isArray(item?.url) ? item.url[0] : item?.url;
  };

  const socialLinks = [
    { name: "facebook", icon: <Facebook /> },
    { name: "twitter", icon: <Twitter /> },
    { name: "linkedin", icon: <Linkedin /> },
    { name: "youtube", icon: <Youtube /> },
    { name: "instagram", icon: <Instagram /> },
    { name: "whatsapp", icon: <MessageCircle /> },
  ];

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        {/* Contact Information */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">{section.config.title}</h1>
          {section.config.description && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{section.config.description}</p>}
        </div>
        <div>
          <Card>
            <div className="grid md:grid-cols-2 gap-8 pt-6 ">
              <div>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-primary mr-4 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p className="text-muted-foreground">{getSocialUrl("address")}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-primary mr-4 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone Number</h3>
                      <p className="text-muted-foreground">{getSocialUrl("phones")}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-primary mr-4 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email Address</h3>
                      <p className="text-muted-foreground">{getSocialUrl("emails")}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium mb-3">Follow Us on</h3>
                    <div className="flex space-x-4">
                      {socialLinks.map(({ name, icon }) => {
                        const url = getSocialUrl(name);
                        return (
                          url && (
                            <a key={name} href={url} className="text-white hover:text-gray-300 transition-colors duration-200">
                              {icon}
                            </a>
                          )
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </div>
              <div>
                <CardContent>
                  {formSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                    </div>
                  ) : (
                    <DynamicForm formData={formData} submitForm={submitForm} />
                  )}
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
