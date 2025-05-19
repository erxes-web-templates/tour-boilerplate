"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plane, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

export default function InquiryPage() {
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>();
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [tourStartDate, setTourStartDate] = useState<Date | undefined>();
  const [travelClass, setTravelClass] = useState<string | null>(null);
  const [showChildrenDropdown, setShowChildrenDropdown] = useState(false);
  const [alreadyInMongolia, setAlreadyInMongolia] = useState(false);

  const handleContinue = () => {
    // Handle form submission
    alert("Inquiry submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-medium text-black">Inquiry form</h1>
          <p className="text-sm text-gray-500 mt-1">Selected tour: Mongolian Gobi Tour (4 days)</p>
        </div>

        {/* Arrival and Departure */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Plane className="h-5 w-5  mr-2" />
            <h2 className="text-base font-medium">Arrival and departure times in Mongolia</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="arrivalDate" className="text-sm mb-1.5 block">
                Arriving date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-300 text-gray-500 text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    {arrivalDate ? format(arrivalDate, "PPP") : "Enter your date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={arrivalDate} onSelect={setArrivalDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="departureDate" className="text-sm mb-1.5 block">
                Departure date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-300 text-gray-500 text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    {departureDate ? format(departureDate, "PPP") : "Enter your date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="pickup" className="text-sm mb-1.5 block">
              Airport pick-up service
            </Label>
            <Select defaultValue="yes">
              <SelectTrigger className="w-full border-gray-300 text-sm">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="alreadyInMongolia"
              checked={alreadyInMongolia}
              onCheckedChange={(checked: boolean) => setAlreadyInMongolia(checked as boolean)}
            />
            <Label htmlFor="alreadyInMongolia" className="text-sm">
              Already in Mongolia
            </Label>
          </div>
        </div>

        {/* Travel Information */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5  mr-2" />
            <h2 className="text-base font-medium">Travel Information</h2>
          </div>

          <div className="mb-6">
            <Label className="text-sm mb-2 block">Travel class</Label>
            <RadioGroup value={travelClass || ""} onValueChange={setTravelClass} className="space-y-3">
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-3">
                <div className="flex items-center">
                  <RadioGroupItem value="classA" id="classA" className="mr-3" />
                  <Label htmlFor="classA" className="text-sm font-normal">
                    Class A
                  </Label>
                </div>
                <span className="text-sm font-medium ">$500</span>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-3">
                <div className="flex items-center">
                  <RadioGroupItem value="classB" id="classB" className="mr-3" />
                  <Label htmlFor="classB" className="text-sm font-normal">
                    Class B
                  </Label>
                </div>
                <span className="text-sm font-medium ">$1000</span>
              </div>
              <div className="flex items-center justify-between border border-gray-200 rounded-md p-3">
                <div className="flex items-center">
                  <RadioGroupItem value="classC" id="classC" className="mr-3" />
                  <Label htmlFor="classC" className="text-sm font-normal">
                    Class C
                  </Label>
                </div>
                <span className="text-sm font-medium ">$2000</span>
              </div>
            </RadioGroup>
          </div>

          <div className="mb-4">
            <Label htmlFor="tourStartDate" className="text-sm mb-1.5 block">
              Possible date of start the tour
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-300 text-gray-500 text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  {tourStartDate ? format(tourStartDate, "PPP") : "Enter your date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent mode="single" selected={tourStartDate} onSelect={setTourStartDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="travelers" className="text-sm mb-1.5 block">
                How many are traveling?
              </Label>
              <div className="relative">
                <Input id="travelers" placeholder="Enter travelers number" className="border-gray-300 text-sm pl-8" />
                <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="children" className="text-sm mb-1.5 block">
                Travel with children?
              </Label>
              <Select defaultValue="yes">
                <SelectTrigger className="w-full border-gray-300 text-sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-8">
            <Label htmlFor="additionalInfo" className="text-sm mb-1.5 block">
              Have any additional information?
            </Label>
            <Textarea id="additionalInfo" placeholder="Message" className="border-gray-300 resize-none h-24" />
          </div>

          {/* Continue Button */}
          <Button className="w-full font-medium py-3 rounded-md" onClick={handleContinue}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
