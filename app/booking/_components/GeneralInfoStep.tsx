"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { BookingFormData, TourDate } from "./BookingForm";
import { useQuery } from "@apollo/client";
import { TOUR_GROUP_DETAIL_QUERY, TOURS_GROUP_QUERY } from "@/graphql/queries";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
interface GeneralInfoStepProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  tourDates: TourDate[];
  pricePerPerson: number;
  totalPrice: number;
  onContinue: () => void;
}

export default function GeneralInfoStep({
  formData,
  updateFormData,
  tourDates,
  pricePerPerson,
  totalPrice,
  onContinue,
}: GeneralInfoStepProps) {
  const params = useSearchParams();
  const selectedTourId = params.get("tourId");
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const { data: groupToursData } = useQuery(TOUR_GROUP_DETAIL_QUERY, {
    variables: {
      status: "website",
      groupCode: selectedTourId || "",
    },
  });
  const groupTourItems = groupToursData?.bmToursGroupDetail?.items || [];
  console.log("groupTours", groupTourItems);
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-xs text-gray-500">Step 01</div>
          <h2 className="text-xl font-medium text-black">General Info</h2>
        </div>
        <div className="text-2xl font-bold text-yellow-500">
          ${groupTourItems[0]?.cost * formData.travelers}
        </div>
      </div>

      {/* Tour Selection */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm">Choose your tour</h3>
          <span className="text-yellow-500 text-sm">
            ${groupTourItems[0]?.cost} per person
          </span>
        </div>

        <RadioGroup
          value={formData.selectedDate || ""}
          onValueChange={(value) => updateFormData({ selectedDate: value })}
          className="space-y-3"
        >
          {groupTourItems?.map((tour: any) => (
            <div
              key={tour._id}
              className="flex items-center justify-between rounded-md border border-gray-200 p-3"
            >
              <div className="flex items-center">
                <RadioGroupItem
                  value={tour._id}
                  id={tour._id}
                  className="mr-3"
                />
                <Label htmlFor={tour._id} className="text-sm font-normal">
                  {tour.startDate && dayjs(tour.startDate).format("YYYY-MM-DD")}
                  {" - "}
                  {tour.endDate && dayjs(tour.endDate).format("YYYY-MM-DD")} (
                  {tour.name})
                </Label>
              </div>
              <span className="text-xs text-gray-500">
                {tour.duration} days
              </span>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Travelers Count */}
      <div className="mb-6">
        <h3 className="text-sm mb-3">How many are traveling?</h3>
        <div className="relative">
          <button
            className="w-full flex items-center justify-between rounded-md border border-gray-200 p-3 text-left"
            onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}
          >
            <span className="text-sm text-gray-600">
              {formData.travelers}{" "}
              {formData.travelers === 1 ? "traveler" : "travelers"}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {showTravelersDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md z-10 shadow-md">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    updateFormData({ travelers: num });
                    setShowTravelersDropdown(false);
                  }}
                >
                  {num} {num === 1 ? "traveler" : "travelers"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mb-8">
        <h3 className="text-sm mb-3">Have any additional information?</h3>
        <Textarea
          placeholder="Message"
          className="border-gray-200 resize-none h-24"
          value={formData.additionalInfo}
          onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
        />
      </div>

      {/* Continue Button */}
      <Button
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 rounded-md"
        onClick={onContinue}
      >
        Continue (Total: ${groupTourItems[0]?.cost * formData.travelers})
      </Button>
    </div>
  );
}
