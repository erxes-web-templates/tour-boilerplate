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
import { Calendar, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { gql, useMutation, useQuery } from "@apollo/client";
import type { BookingFormData } from "./BookingForm";
import useCurrentUser from "@/lib/useAuth";
import { toast } from "sonner";
import { CREATE_INVOICE } from "@/graphql/mutations";
import { PAYMENTS } from "@/graphql/queries";
import { SearchableNationalitySelect } from "@/components/common/SearchableNationalitySelect";
import { nationalities } from "@/lib/utils";

// Define the GraphQL mutation
const ADD_ORDER = gql`
  mutation BmOrderAdd($order: BmsOrderInput) {
    bmOrderAdd(order: $order) {
      _id
    }
  }
`;

interface TravelersInfoStepProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  totalPrice: number;
  onBack: () => void;
  onContinue: () => void;
  currentUser: any;
}

export default function TravelersInfoStep({
  formData,
  updateFormData,
  totalPrice,
  onBack,
  onContinue,
  currentUser,
}: TravelersInfoStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState("stripe");

  console.log(currentUser, formData, "cu ti");
  // Use Apollo Client's useMutation hook
  const { data: paymentsData } = useQuery(PAYMENTS, {
    variables: {
      kind: paymentType,
    },
  });

  const stripePayment = paymentsData?.payments[0]?._id;

  const [createInvoice, { loading: invoiceLoading }] = useMutation(
    CREATE_INVOICE,
    {
      onCompleted: (data) => {
        console.log("Invoice created successfully:", data);
        // Move to the next step after successful submission
        toast.success(
          "Invoice created successfully! Your order will be confirmed once payment is completed."
        );
        onContinue();
      },
      onError: (error) => {
        console.error("Error creating invoice:", error);
        toast.error(
          "An error occurred while creating the invoice. Please try again."
        );
        setError(
          "An error occurred while creating the invoice. Please try again."
        );
      },
    }
  );

  const [createOrder, { loading }] = useMutation(ADD_ORDER, {
    onCompleted: (data) => {
      console.log("Order created successfully:", data);
      // Move to the next step after successful submission
      toast.success(
        "Order created successfully! Your order will be confirmed once payment is completed."
      );
      onContinue();
      const orderId = data.bmOrderAdd._id;

      createInvoice({
        variables: {
          amount: totalPrice,
          contentType: "bm:order",
          contentTypeId: orderId,
          customerId: currentUser?.erxesCustomerId, // Using the fixed value provided
          customerType: "customer",
          paymentIds: [stripePayment], // Using the fixed value provided
          currency: "USD",
        },
      });
    },
    onError: (error) => {
      console.error("Error creating order:", error);
      toast.error(
        "An error occurred while creating the order. Please try again."
      );
      setError("An error occurred while creating the order. Please try again.");
    },
  });

  const addTraveler = () => {
    const newTraveler = {
      firstName: "",
      lastName: "",
      birthDate: undefined,
      gender: "male",
      nationality: "",
    };
    updateFormData({
      additionalTravelers: [...formData.additionalTravelers, newTraveler],
    });
  };

  const updateLeadTraveler = (field: string, value: any) => {
    updateFormData({
      leadTraveler: {
        ...formData.leadTraveler,
        [field]: value,
      },
    });
  };

  const updateAdditionalTraveler = (
    index: number,
    field: string,
    value: any
  ) => {
    const updatedTravelers = [...formData.additionalTravelers];
    updatedTravelers[index] = {
      ...updatedTravelers[index],
      [field]: value,
    };
    updateFormData({ additionalTravelers: updatedTravelers });
  };

  const handleSubmit = async () => {
    setError(null);

    try {
      // Format additional travelers for the mutation
      const additionalCustomers =
        formData.additionalTravelers.length > 0
          ? formData.additionalTravelers.map((traveler) => ({
              firstName: traveler.firstName,
              lastName: traveler.lastName,
              birthDate: traveler.birthDate
                ? format(traveler.birthDate, "yyyy-MM-dd")
                : null,
              gender: traveler.gender,
              nationality: traveler.nationality,
            }))
          : null;

      // Prepare the mutation variables
      const orderInput = {
        additionalCustomers,
        amount: totalPrice,
        branchId: null,
        customerId: currentUser?.erxesCustomerId,
        isChild: false,
        note: formData.additionalInfo,
        numberOfPeople: formData.travelers,
        status: "notPaid",
        tourId: formData.selectedDate,
      };

      // Execute the GraphQL mutation using Apollo Client
      await createOrder({
        variables: {
          order: orderInput,
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during submission"
      );
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-xs text-gray-500">Step 02</div>
          <h2 className="text-xl font-medium text-black">Travelers Info</h2>
        </div>
        <div className="text-2xl font-bold text-yellow-500">${totalPrice}</div>
      </div>

      {/* Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-6 flex items-start">
        <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-yellow-700 font-medium text-sm">
            Please note:
          </span>{" "}
          <span className="text-sm text-gray-700">
            Traveler details should match information on passport
          </span>
        </div>
      </div>

      {/* Error message if submission fails */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Lead Traveler */}
      <div className="mb-6">
        <h3 className="text-base font-medium mb-1">Lead Traveler</h3>
        <p className="text-xs text-gray-500 mb-4">
          This traveler will serve as the contact person for the booking.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="firstName" className="text-sm mb-1.5 block">
              First Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              placeholder="Enter your first name"
              className="border-gray-200 text-sm"
              value={formData.leadTraveler.firstName}
              onChange={(e) => updateLeadTraveler("firstName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm mb-1.5 block">
              Last Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              className="border-gray-200 text-sm"
              value={formData.leadTraveler.lastName}
              onChange={(e) => updateLeadTraveler("lastName", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="email" className="text-sm mb-1.5 block">
              Email<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-gray-200 text-sm"
              value={formData.leadTraveler.email}
              onChange={(e) => updateLeadTraveler("email", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-sm mb-1.5 block">
              Phone Number<span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              className="border-gray-200 text-sm"
              value={formData.leadTraveler.phone}
              onChange={(e) => updateLeadTraveler("phone", e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="birthDate" className="text-sm mb-1.5 block">
            Date of Birth<span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal border-gray-200 text-gray-500 text-sm"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {formData.leadTraveler.birthDate
                  ? format(formData.leadTraveler.birthDate, "PPP")
                  : "Enter your birth date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={formData.leadTraveler.birthDate}
                onSelect={(date) => updateLeadTraveler("birthDate", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="mb-4">
          <Label className="text-sm mb-1.5 block">
            Gender<span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            value={formData.leadTraveler.gender}
            onValueChange={(value) => updateLeadTraveler("gender", value)}
            className="flex gap-4 mt-1"
          >
            <div className="flex items-center">
              <RadioGroupItem value="male" id="male" className="mr-2" />
              <Label htmlFor="male" className="text-sm font-normal">
                Male
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="female" id="female" className="mr-2" />
              <Label htmlFor="female" className="text-sm font-normal">
                Female
              </Label>
            </div>
          </RadioGroup>
        </div>

        <SearchableNationalitySelect
          nationalities={nationalities}
          value={formData.leadTraveler.nationality}
          onValueChange={(value) => updateLeadTraveler("nationality", value)}
          required={true}
        />
      </div>

      {/* Additional Travelers */}
      {formData.additionalTravelers.map((traveler, index) => (
        <div key={index} className="mb-6 border-t border-gray-200 pt-4">
          <h3 className="text-base font-medium mb-4">Traveler {index + 1}</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label
                htmlFor={`firstName${index}`}
                className="text-sm mb-1.5 block"
              >
                First Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id={`firstName${index}`}
                placeholder="Enter first name"
                className="border-gray-200 text-sm"
                value={traveler.firstName}
                onChange={(e) =>
                  updateAdditionalTraveler(index, "firstName", e.target.value)
                }
              />
            </div>
            <div>
              <Label
                htmlFor={`lastName${index}`}
                className="text-sm mb-1.5 block"
              >
                Last Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id={`lastName${index}`}
                placeholder="Enter last name"
                className="border-gray-200 text-sm"
                value={traveler.lastName}
                onChange={(e) =>
                  updateAdditionalTraveler(index, "lastName", e.target.value)
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <Label
              htmlFor={`birthDate${index}`}
              className="text-sm mb-1.5 block"
            >
              Date of Birth<span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-gray-200 text-gray-500 text-sm"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {traveler.birthDate
                    ? format(traveler.birthDate, "PPP")
                    : "Enter birth date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={traveler.birthDate}
                  onSelect={(date) =>
                    updateAdditionalTraveler(index, "birthDate", date)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="mb-4">
            <Label className="text-sm mb-1.5 block">
              Gender<span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={traveler.gender}
              onValueChange={(value) =>
                updateAdditionalTraveler(index, "gender", value)
              }
              className="flex gap-4 mt-1"
            >
              <div className="flex items-center">
                <RadioGroupItem
                  value="male"
                  id={`male${index}`}
                  className="mr-2"
                />
                <Label htmlFor={`male${index}`} className="text-sm font-normal">
                  Male
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem
                  value="female"
                  id={`female${index}`}
                  className="mr-2"
                />
                <Label
                  htmlFor={`female${index}`}
                  className="text-sm font-normal"
                >
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>

          <SearchableNationalitySelect
            nationalities={nationalities}
            value={traveler.nationality}
            onValueChange={(value) =>
              updateAdditionalTraveler(index, "nationality", value)
            }
            required={true}
          />
        </div>
      ))}

      {/* Add Traveler Button */}
      <Button
        variant="outline"
        className="w-full mb-8 border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black"
        onClick={addTraveler}
      >
        + Add Traveler Info (Optional)
      </Button>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black"
          onClick={onBack}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
