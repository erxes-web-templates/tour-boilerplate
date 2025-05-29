"use client";

import { useEffect, useState } from "react";
import GeneralInfoStep from "./GeneralInfoStep";
import TravelersInfoStep from "./TravelersInfoStep";
import PaymentsStep from "./PaymentsStep";
import useCurrentUser from "@/lib/useAuth";

export type TourDate = {
  id: string;
  date: string;
  days: string;
};

export type BookingFormData = {
  selectedDate: string | null;
  travelers: number;
  additionalInfo: string;
  leadTraveler: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: Date | undefined;
    gender: string;
    nationality: string;
  };
  additionalTravelers: Array<{
    firstName: string;
    lastName: string;
    birthDate: Date | undefined;
    gender: string;
    nationality: string;
  }>;
  paymentType: string;
  paymentMethod: string;
  cardDetails?: {
    cardNumber: string;
    cardholderName: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
  };
};

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { currentUser } = useCurrentUser();
  const [formData, setFormData] = useState<BookingFormData>({
    selectedDate: null,
    travelers: 1,
    additionalInfo: "",
    leadTraveler: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      birthDate: undefined,
      gender: "male",
      nationality: "",
    },
    additionalTravelers: [],
    paymentType: "prepay",
    paymentMethod: "card",
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      leadTraveler: {
        ...prevData.leadTraveler,
        firstName: currentUser?.firstName || "",
        lastName: currentUser?.lastName || "",
        email: currentUser?.email || "",
        phone: currentUser?.phone || "",
      },
    }));
  }, [currentUser]);

  console.log("formData", formData, currentUser);

  const tourDates: TourDate[] = [
    { id: "jan11", date: "Wednesday, 11th January", days: "04 days tour" },
    { id: "jan12", date: "Wednesday, 12th January", days: "04 days tour" },
    { id: "jan24", date: "Wednesday, 24th January", days: "04 days tour" },
  ];

  const pricePerPerson = 450;
  const totalPrice = formData.travelers * pricePerPerson;

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateFormData = (newData: Partial<BookingFormData>) => {
    setFormData({ ...formData, ...newData });
  };

  const handleBooking = () => {
    // Handle booking submission
    alert("Booking successful! Thank you for choosing Discover Mongolia.");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-xl font-medium text-black">Book My Tour</h1>
          <p className="text-sm text-gray-500 mt-1">Thank you for choosing Discover Mongolia! and for your support of responsible tourism.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-7 h-7 rounded-full ${
                currentStep === 1 ? "bg-yellow-500 text-black" : "bg-yellow-500 text-black"
              } flex items-center justify-center text-xs font-medium`}
            >
              {currentStep > 1 ? "✓" : "1"}
            </div>
            <span className={`ml-2 text-sm ${currentStep === 1 ? "font-medium text-black" : "text-gray-500"}`}>General Info</span>
          </div>
          <div className="h-[1px] bg-gray-300 w-8"></div>
          <div className="flex items-center">
            <div
              className={`w-7 h-7 rounded-full ${
                currentStep === 2 ? "bg-yellow-500 text-black" : currentStep > 2 ? "bg-yellow-500 text-black" : "bg-gray-200 text-gray-500"
              } flex items-center justify-center text-xs font-medium`}
            >
              {currentStep > 2 ? "✓" : "2"}
            </div>
            <span className={`ml-2 text-sm ${currentStep === 2 ? "font-medium text-black" : "text-gray-500"}`}>Travelers Info</span>
          </div>
          <div className="h-[1px] bg-gray-300 w-8"></div>
          <div className="flex items-center">
            <div
              className={`w-7 h-7 rounded-full ${
                currentStep === 3 ? "bg-yellow-500 text-black" : "bg-gray-200 text-gray-500"
              } flex items-center justify-center text-xs font-medium`}
            >
              3
            </div>
            <span className={`ml-2 text-sm ${currentStep === 3 ? "font-medium text-black" : "text-gray-500"}`}>Payments</span>
          </div>
        </div>

        {currentStep === 1 && (
          <GeneralInfoStep
            formData={formData}
            updateFormData={updateFormData}
            tourDates={tourDates}
            pricePerPerson={pricePerPerson}
            totalPrice={totalPrice}
            onContinue={handleContinue}
          />
        )}

        {currentStep === 2 && (
          <TravelersInfoStep
            formData={formData}
            updateFormData={updateFormData}
            totalPrice={totalPrice}
            onBack={handleBack}
            currentUser={currentUser}
            onContinue={handleContinue}
          />
        )}

        {currentStep === 3 && (
          <PaymentsStep formData={formData} updateFormData={updateFormData} totalPrice={totalPrice} onBack={handleBack} onSubmit={handleBooking} />
        )}
      </div>
    </div>
  );
}
