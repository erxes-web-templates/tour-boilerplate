"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Plane, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { useMutation, useQuery } from "@apollo/client";
import { INQUIRY_FORM, TOUR_GROUP_DETAIL_QUERY } from "@/graphql/queries";
import DynamicForm from "@/components/common/DynamicForm";
import { FORM_SUBMISSION } from "@/graphql/mutations";
import { useSearchParams } from "next/navigation";

export default function InquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const params = useSearchParams();
  const selectedTourId = params.get("tourId");

  const { data: groupToursData } = useQuery(TOUR_GROUP_DETAIL_QUERY, {
    variables: {
      status: "website",
      groupCode: selectedTourId || "",
    },
  });

  const groupTourItems = groupToursData?.bmToursGroupDetail?.items || [];

  const handleContinue = () => {
    // Handle form submission
    alert("Inquiry submitted successfully!");
  };

  const { data: formData } = useQuery(INQUIRY_FORM, {
    variables: {
      type: "lead",
      searchValue: "inquiry",
    },
  });

  const [submitForm] = useMutation(FORM_SUBMISSION, {
    onCompleted: (data) => {
      console.log(data);
      setSubmitted(true);
    },
  });

  const inquiryForm = formData?.forms[0] || {};

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-medium text-black">Inquiry form</h1>
          <p className="text-sm text-gray-500 mt-1">
            Selected tour: {groupTourItems[0]?.name} (
            {groupTourItems[0]?.duration} days)
          </p>
        </div>

        <DynamicForm
          formData={inquiryForm}
          submitForm={submitForm}
          submitted={submitted}
        />
      </div>
    </div>
  );
}
