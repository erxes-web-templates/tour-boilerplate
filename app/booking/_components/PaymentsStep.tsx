"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import type { BookingFormData } from "./BookingForm";
import { useSearchParams } from "next/navigation";

interface PaymentsStepProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  totalPrice: number;
  onBack: () => void;
  onSubmit: () => void;
}

export default function PaymentsStep({
  formData,
  updateFormData,
  totalPrice,
  onBack,
  onSubmit,
}: PaymentsStepProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const params = useSearchParams();
  const invoiceId = params.get("invoiceId");

  const invoiceUrl = `${process.env.ERXES_URL}/pl:payment/invoice/${invoiceId}`;
  const updateCardDetails = (field: string, value: string) => {
    updateFormData({
      cardDetails: {
        ...(formData.cardDetails || {
          cardNumber: "",
          cardholderName: "",
          expiryMonth: "",
          expiryYear: "",
          cvv: "",
        }),
        [field]: value,
      },
    });
  };

  return (
    <div className="mb-6">
      <div className="mb-6">
        {/* Payment Type Selection */}
        <RadioGroup
          value={formData.paymentType}
          onValueChange={(value) => updateFormData({ paymentType: value })}
          className="flex gap-4 mb-8"
        >
          <div className="flex items-center">
            <RadioGroupItem value="prepay" id="prepay" className="mr-2" />
            <Label htmlFor="prepay" className="text-sm font-medium uppercase">
              Prepay
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="fullpay" id="fullpay" className="mr-2" />
            <Label htmlFor="fullpay" className="text-sm font-medium uppercase">
              Fullpay
            </Label>
          </div>
        </RadioGroup>
        {/* 
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xs text-gray-500">Step 03</div>
            <h2 className="text-xl font-medium text-black">Payments</h2>
          </div>
          <div className="text-2xl font-bold text-yellow-500">
            ${totalPrice}
          </div>
        </div> */}

        {/* Payment Methods */}
        <div className="mb-8">
          {invoiceId ? (
            <iframe
              src={invoiceUrl}
              className="min-h-[500px] w-full border border-gray-200 rounded-md"
            ></iframe>
          ) : (
            <div className="text-sm text-gray-500 mb-4">
              <p> Something went wrong, please try again later.</p>
            </div>
          )}
          {/* <RadioGroup value={formData.paymentMethod} onValueChange={(value) => updateFormData({ paymentMethod: value })} className="space-y-4">
            <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
              <div className="flex items-center">
                <RadioGroupItem value="card" id="card" className="mr-3" />
                <Label htmlFor="card" className="text-sm font-normal">
                  Pay by card
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80"></div>
                </div>
                <div className="w-8 h-5 bg-blue-900 rounded flex items-center justify-center">
                  <div className="text-white text-[8px] font-bold">VISA</div>
                </div>
                <div className="w-10 h-5 bg-blue-500 rounded flex items-center justify-center">
                  <div className="text-white text-[6px] font-bold">AMERICAN EXPRESS</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
              <div className="flex items-center">
                <RadioGroupItem value="golomt" id="golomt" className="mr-3" />
                <Label htmlFor="golomt" className="text-sm font-normal">
                  Pay with Golomt
                </Label>
              </div>
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                <div className="text-white text-[8px] font-bold">G</div>
              </div>
            </div>
          </RadioGroup> */}
        </div>

        {/* Credit Card Form - Only shown when Pay by card is selected */}
        {/* {formData.paymentMethod === "card" && (
          <div className="mt-4 mb-6 border border-gray-200 rounded-md p-4 bg-gray-50">
            <h3 className="text-base font-medium mb-4">Card Details</h3>

            <div className="mb-4">
              <Label htmlFor="cardNumber" className="text-sm mb-1.5 block">
                Card Number<span className="text-red-500">*</span>
              </Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="border-gray-200 text-sm"
                value={formData.cardDetails?.cardNumber || ""}
                onChange={(e) => updateCardDetails("cardNumber", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="cardholderName" className="text-sm mb-1.5 block">
                Cardholder Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="cardholderName"
                placeholder="Name as it appears on card"
                className="border-gray-200 text-sm"
                value={formData.cardDetails?.cardholderName || ""}
                onChange={(e) => updateCardDetails("cardholderName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-sm mb-1.5 block">
                  Expiry Date<span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={formData.cardDetails?.expiryMonth || ""} onValueChange={(value) => updateCardDetails("expiryMonth", value)}>
                    <SelectTrigger className="border-gray-200 text-sm">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = i + 1;
                        return (
                          <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                            {month.toString().padStart(2, "0")}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <Select value={formData.cardDetails?.expiryYear || ""} onValueChange={(value) => updateCardDetails("expiryYear", value)}>
                    <SelectTrigger className="border-gray-200 text-sm">
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <SelectItem key={year} value={year.toString().slice(-2)}>
                            {year.toString().slice(-2)}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="cvv" className="text-sm mb-1.5 block">
                  CVV<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  className="border-gray-200 text-sm"
                  maxLength={4}
                  value={formData.cardDetails?.cvv || ""}
                  onChange={(e) => updateCardDetails("cvv", e.target.value)}
                />
              </div>
            </div>
          </div>
        )} */}

        {/* Terms and Conditions */}

        {/* Navigation Buttons */}
        {/* <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black"
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
            disabled={!termsAccepted}
            onClick={onSubmit}
          >
            Book for {formData.travelers}{" "}
            {formData.travelers === 1 ? "space" : "spaces"}
          </Button>
        </div> */}
      </div>
    </div>
  );
}
