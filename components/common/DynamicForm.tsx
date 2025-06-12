/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Define the field interface based on the JSON structure
interface FormField {
  _id: string;
  text: string;
  type: string;
  isRequired: boolean;
  options: string[];
  validation: string | null;
  description: string | null;
}

interface FormData {
  _id: string;
  fields: FormField[];
}

interface DynamicFormProps {
  formData: FormData;
  submitForm: (data: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formData, submitForm }) => {
  const [browserInfo, setBrowserInfo] = useState({});
  const fields = formData.fields;

  // Collect browser information on component mount
  useEffect(() => {
    const collectBrowserInfo = () => {
      return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      };
    };

    setBrowserInfo(collectBrowserInfo());
  }, []);

  // Generate Zod schema dynamically based on the fields
  const generateZodSchema = () => {
    const schemaMap: Record<string, any> = {};

    fields?.forEach((field) => {
      let schema: any = z.string();

      if (field.isRequired) {
        schema = schema.min(1, `${field.text} is required`);
      } else {
        schema = schema.optional();
      }

      // Add specific validations based on field type
      if (field.validation === "email") {
        schema = z.string().email("Invalid email format").min(1, `${field.text} is required`);
      } else if (field.validation === "phone") {
        schema = z.string().min(5, "Invalid phone number").min(1, `${field.text} is required`);
      }

      // For checkboxes, use array schema
      if (field.type === "check") {
        schema = field.isRequired ? z.array(z.string()).min(1, "Please select at least one option") : z.array(z.string()).optional();
      }

      schemaMap[field._id] = schema;
    });

    return z.object(schemaMap);
  };

  const formSchema = generateZodSchema();

  // Initialize form default values
  const getDefaultValues = () => {
    const defaultValues: Record<string, any> = {};

    fields?.forEach((field) => {
      if (field.type === "check") {
        defaultValues[field._id] = [];
      } else {
        defaultValues[field._id] = "";
      }
    });

    return defaultValues;
  };

  // Initialize react-hook-form with shadcn Form
  const form = useForm<Record<string, any>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  // Handle form submission
  const handleFormSubmit = (data: any) => {
    // Format data for the submitForm function
    const formattedData = {
      variables: {
        formId: formData._id,
        browserInfo: browserInfo,
        submissions: formData.fields.map((field: any) => ({
          _id: field._id,
          value: data[field._id],
        })),
      },
    };

    submitForm(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields?.map((field) => {
              const { _id, text, type, isRequired, options, description } = field;

              switch (type) {
                case "input":
                  return (
                    <FormField
                      key={_id}
                      control={form.control}
                      name={_id}
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>
                            {text} {isRequired && <span className="text-red-500">*</span>}
                          </FormLabel>
                          {description && <FormDescription>{description}</FormDescription>}
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );

                case "email":
                  return (
                    <FormField
                      key={_id}
                      control={form.control}
                      name={_id}
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>
                            {text} {isRequired && <span className="text-red-500">*</span>}
                          </FormLabel>
                          {description && <FormDescription>{description}</FormDescription>}
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );

                case "phone":
                  return (
                    <FormField
                      key={_id}
                      control={form.control}
                      name={_id}
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>
                            {text} {isRequired && <span className="text-red-500">*</span>}
                          </FormLabel>
                          {description && <FormDescription>{description}</FormDescription>}
                          <FormControl>
                            {/* @ts-ignore  */}
                            <PhoneInput
                              country={"us"}
                              value={field.value}
                              onChange={field.onChange}
                              containerClass="w-full"
                              inputStyle={{
                                width: "100%",
                                height: "40px",
                                fontSize: "16px",
                                borderRadius: "4px",
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );

                case "textarea":
                  return (
                    <FormField
                      key={_id}
                      control={form.control}
                      name={_id}
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>
                            {text} {isRequired && <span className="text-red-500">*</span>}
                          </FormLabel>
                          {description && <FormDescription>{description}</FormDescription>}
                          <FormControl>
                            <Textarea rows={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );

                case "check":
                  return (
                    <FormField
                      key={_id}
                      control={form.control}
                      name={_id}
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>
                              {text} {isRequired && <span className="text-red-500">*</span>}
                            </FormLabel>
                            {description && <FormDescription>{description}</FormDescription>}
                            <div className="mt-2 space-y-2">
                              {options.map((option, index) => (
                                <FormField
                                  key={index}
                                  control={form.control}
                                  name={_id}
                                  render={({ field }: any) => {
                                    return (
                                      <FormItem key={option} className="flex flex-row items-start space-x-3 space-y-0 mt-1">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(option)}
                                            onCheckedChange={(checked: boolean) => {
                                              const currentValue = field.value || [];
                                              if (checked) {
                                                field.onChange([...currentValue, option]);
                                              } else {
                                                field.onChange(currentValue.filter((value: string) => value !== option));
                                              }
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">{option}</FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  );

                default:
                  return (
                    <div key={_id} className="text-sm text-red-600">
                      Unknown field type: {type}
                    </div>
                  );
              }
            })}

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default DynamicForm;
