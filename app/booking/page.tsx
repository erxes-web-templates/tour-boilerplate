"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, ChevronDown, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import Link from "next/link";

export default function TourBookingPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [travelers, setTravelers] = useState<number>(1);
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [gender, setGender] = useState("male");
  const [additionalTravelers, setAdditionalTravelers] = useState<number[]>([]);
  const [paymentType, setPaymentType] = useState("prepay");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const pricePerPerson = 450;
  const totalPrice = travelers * pricePerPerson;

  const tourDates = [
    { id: "jan11", date: "Wednesday, 11th January", days: "04 days tour" },
    { id: "jan12", date: "Wednesday, 12th January", days: "04 days tour" },
    { id: "jan24", date: "Wednesday, 24th January", days: "04 days tour" },
  ];

  const nationalities = [
    "Afghan",
    "Albanian",
    "Algerian",
    "American",
    "Andorran",
    "Angolan",
    "Antiguan",
    "Argentine",
    "Armenian",
    "Australian",
    "Austrian",
    "Azerbaijani",
    "Bahamian",
    "Bahraini",
    "Bangladeshi",
    "Barbadian",
    "Belarusian",
    "Belgian",
    "Belizean",
    "Beninese",
    "Bhutanese",
    "Bolivian",
    "Bosnian",
    "Botswanan",
    "Brazilian",
    "British",
    "Bruneian",
    "Bulgarian",
    "Burkinabe",
    "Burmese",
    "Burundian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Cape Verdean",
    "Central African",
    "Chadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Comoran",
    "Congolese",
    "Costa Rican",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Djiboutian",
    "Dominican",
    "Dutch",
    "East Timorese",
    "Ecuadorean",
    "Egyptian",
    "Emirian",
    "Equatorial Guinean",
    "Eritrean",
    "Estonian",
    "Ethiopian",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Gabonese",
    "Gambian",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Grenadian",
    "Guatemalan",
    "Guinean",
    "Guyanese",
    "Haitian",
    "Honduran",
    "Hungarian",
    "Icelandic",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakhstani",
    "Kenyan",
    "Kiribati",
    "North Korean",
    "South Korean",
    "Kuwaiti",
    "Kyrgyz",
    "Laotian",
    "Latvian",
    "Lebanese",
    "Liberian",
    "Libyan",
    "Liechtensteiner",
    "Lithuanian",
    "Luxembourgish",
    "Macedonian",
    "Malagasy",
    "Malawian",
    "Malaysian",
    "Maldivian",
    "Malian",
    "Maltese",
    "Marshallese",
    "Mauritanian",
    "Mauritian",
    "Mexican",
    "Micronesian",
    "Moldovan",
    "Monacan",
    "Mongolian",
    "Moroccan",
    "Mozambican",
    "Namibian",
    "Nauruan",
    "Nepalese",
    "New Zealand",
    "Nicaraguan",
    "Nigerian",
    "Nigerien",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palauan",
    "Panamanian",
    "Papua New Guinean",
    "Paraguayan",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saint Lucian",
    "Salvadoran",
    "Samoan",
    "San Marinese",
    "Sao Tomean",
    "Saudi",
    "Senegalese",
    "Serbian",
    "Seychellois",
    "Sierra Leonean",
    "Singaporean",
    "Slovakian",
    "Slovenian",
    "Solomon Islander",
    "Somali",
    "South African",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Surinamese",
    "Swazi",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tajik",
    "Tanzanian",
    "Thai",
    "Togolese",
    "Tongan",
    "Trinidadian",
    "Tunisian",
    "Turkish",
    "Turkmen",
    "Tuvaluan",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbekistani",
    "Vanuatuan",
    "Venezuelan",
    "Vietnamese",
    "Yemeni",
    "Zambian",
    "Zimbabwean",
  ];

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const addTraveler = () => {
    setAdditionalTravelers([...additionalTravelers, additionalTravelers.length + 1]);
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
          <p className="text-sm text-gray-500 mt-1">Thank you for choosing us! and for your support of responsible tourism.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-7 h-7 rounded-full ${
                currentStep === 1 ? " text-black" : " text-black"
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
                currentStep === 2 ? " text-black" : currentStep > 2 ? " text-black" : "bg-gray-200 text-gray-500"
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
                currentStep === 3 ? " text-black" : "bg-gray-200 text-gray-500"
              } flex items-center justify-center text-xs font-medium`}
            >
              3
            </div>
            <span className={`ml-2 text-sm ${currentStep === 3 ? "font-medium text-black" : "text-gray-500"}`}>Payments</span>
          </div>
        </div>

        {currentStep === 1 && (
          /* Step 01 - General Info */
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-xs text-gray-500">Step 01</div>
                <h2 className="text-xl font-medium text-black">General Info</h2>
              </div>
              <div className="text-2xl font-bold ">${totalPrice}</div>
            </div>

            {/* Tour Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm">Choose your tour</h3>
                <span className=" text-sm">${pricePerPerson} per person</span>
              </div>

              <RadioGroup value={selectedDate || ""} onValueChange={setSelectedDate} className="space-y-3">
                {tourDates.map((tour) => (
                  <div key={tour.id} className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                    <div className="flex items-center">
                      <RadioGroupItem value={tour.id} id={tour.id} className="mr-3" />
                      <Label htmlFor={tour.id} className="text-sm font-normal">
                        {tour.date}
                      </Label>
                    </div>
                    <span className="text-xs text-gray-500">{tour.days}</span>
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
                    {travelers} {travelers === 1 ? "traveler" : "travelers"}
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
                          setTravelers(num);
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
              <Textarea placeholder="Message" className="border-gray-200 resize-none h-24" />
            </div>

            {/* Continue Button */}
            <Button className="w-full font-medium py-3 rounded-md" onClick={handleContinue}>
              Continue (Total: ${totalPrice})
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          /* Step 02 - Travelers Info */
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-xs text-gray-500">Step 02</div>
                <h2 className="text-xl font-medium text-black">Travelers Info</h2>
              </div>
              <div className="text-2xl font-bold ">${totalPrice}</div>
            </div>

            {/* Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-6 flex items-start">
              <Info className="h-5 w-5  mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-yellow-700 font-medium text-sm">Please note:</span>{" "}
                <span className="text-sm text-gray-700">Traveler details should match information on passport</span>
              </div>
            </div>

            {/* Lead Traveler */}
            <div className="mb-6">
              <h3 className="text-base font-medium mb-1">Lead Traveler</h3>
              <p className="text-xs text-gray-500 mb-4">This traveler will serve as the contact person for the booking.</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm mb-1.5 block">
                    First Name<span className="text-red-500">*</span>
                  </Label>
                  <Input id="firstName" placeholder="Enter your first name" className="border-gray-200 text-sm" />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm mb-1.5 block">
                    Last Name<span className="text-red-500">*</span>
                  </Label>
                  <Input id="lastName" placeholder="Enter your last name" className="border-gray-200 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="email" className="text-sm mb-1.5 block">
                    Email<span className="text-red-500">*</span>
                  </Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="border-gray-200 text-sm" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm mb-1.5 block">
                    Phone Number<span className="text-red-500">*</span>
                  </Label>
                  <Input id="phone" placeholder="Enter your phone number" className="border-gray-200 text-sm" />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="birthDate" className="text-sm mb-1.5 block">
                  Date of Birth<span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-200 text-gray-500 text-sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      {birthDate ? format(birthDate, "PPP") : "Enter your birth date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={birthDate} onSelect={setBirthDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="mb-4">
                <Label className="text-sm mb-1.5 block">
                  Gender<span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4 mt-1">
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

              <div className="mb-4">
                <Label htmlFor="nationality" className="text-sm mb-1.5 block">
                  Nationality<span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="w-full border-gray-200 text-sm">
                    <SelectValue placeholder="Select your nationality" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {nationalities.map((nationality) => (
                      <SelectItem key={nationality} value={nationality.toLowerCase()}>
                        {nationality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Travelers */}
            {additionalTravelers.map((travelerIndex) => (
              <div key={travelerIndex} className="mb-6 border-t border-gray-200 pt-4">
                <h3 className="text-base font-medium mb-4">Traveler {travelerIndex + 1}</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`firstName${travelerIndex}`} className="text-sm mb-1.5 block">
                      First Name<span className="text-red-500">*</span>
                    </Label>
                    <Input id={`firstName${travelerIndex}`} placeholder="Enter first name" className="border-gray-200 text-sm" />
                  </div>
                  <div>
                    <Label htmlFor={`lastName${travelerIndex}`} className="text-sm mb-1.5 block">
                      Last Name<span className="text-red-500">*</span>
                    </Label>
                    <Input id={`lastName${travelerIndex}`} placeholder="Enter last name" className="border-gray-200 text-sm" />
                  </div>
                </div>

                <div className="mb-4">
                  <Label htmlFor={`birthDate${travelerIndex}`} className="text-sm mb-1.5 block">
                    Date of Birth<span className="text-red-500">*</span>
                  </Label>
                  <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-200 text-gray-500 text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Enter birth date
                  </Button>
                </div>

                <div className="mb-4">
                  <Label className="text-sm mb-1.5 block">
                    Gender<span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup defaultValue="male" className="flex gap-4 mt-1">
                    <div className="flex items-center">
                      <RadioGroupItem value="male" id={`male${travelerIndex}`} className="mr-2" />
                      <Label htmlFor={`male${travelerIndex}`} className="text-sm font-normal">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="female" id={`female${travelerIndex}`} className="mr-2" />
                      <Label htmlFor={`female${travelerIndex}`} className="text-sm font-normal">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="mb-4">
                  <Label htmlFor={`nationality${travelerIndex}`} className="text-sm mb-1.5 block">
                    Nationality<span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full border-gray-200 text-sm">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {nationalities.map((nationality) => (
                        <SelectItem key={`${nationality}-${travelerIndex}`} value={nationality.toLowerCase()}>
                          {nationality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}

            {/* Add Traveler Button */}
            <Button variant="outline" className="w-full mb-8 border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black" onClick={addTraveler}>
              + Add Traveler Info (Optional)
            </Button>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black" onClick={handleBack}>
                Back
              </Button>
              <Button className=" font-medium" onClick={handleContinue}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          /* Step 03 - Payments */
          <div className="mb-6">
            <div className="mb-6">
              {/* Payment Type Selection */}
              <RadioGroup value={paymentType} onValueChange={setPaymentType} className="flex gap-4 mb-8">
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

              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-xs text-gray-500">Step 03</div>
                  <h2 className="text-xl font-medium text-black">Payments</h2>
                </div>
                <div className="text-2xl font-bold ">${totalPrice}</div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
                    <div className="flex items-center">
                      <RadioGroupItem value="card" id="card" className="mr-3" />
                      <Label htmlFor="card" className="text-sm font-normal">
                        Pay by card
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                        <div className="w-4 h-4  rounded-full opacity-80"></div>
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
                </RadioGroup>
              </div>

              {/* Credit Card Form - Only shown when Pay by card is selected */}
              {paymentMethod === "card" && (
                <div className="mt-4 mb-6 border border-gray-200 rounded-md p-4 bg-gray-50">
                  <h3 className="text-base font-medium mb-4">Card Details</h3>

                  <div className="mb-4">
                    <Label htmlFor="cardNumber" className="text-sm mb-1.5 block">
                      Card Number<span className="text-red-500">*</span>
                    </Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="border-gray-200 text-sm" />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="cardholderName" className="text-sm mb-1.5 block">
                      Cardholder Name<span className="text-red-500">*</span>
                    </Label>
                    <Input id="cardholderName" placeholder="Name as it appears on card" className="border-gray-200 text-sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-sm mb-1.5 block">
                        Expiry Date<span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Select>
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
                        <Select>
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
                      <Input id="cvv" placeholder="123" className="border-gray-200 text-sm" maxLength={4} />
                    </div>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="mb-8">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} className="mt-1" />
                  <Label htmlFor="terms" className="text-xs">
                    {`I accept TourRider's`}
                    <Link href="#" className=" hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className=" hover:underline">
                      Privacy Policy
                    </Link>
                    ; <span className="">Free payment, cancellation and refund conditions.</span>
                  </Label>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-black" onClick={handleBack}>
                  Back
                </Button>
                <Button className="  font-medium" disabled={!termsAccepted} onClick={handleBooking}>
                  Book for {travelers} {travelers === 1 ? "space" : "spaces"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
