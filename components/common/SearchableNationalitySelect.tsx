"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface SearchableNationalitySelectProps {
  nationalities: string[];
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
}

export function SearchableNationalitySelect({
  nationalities,
  value,
  onValueChange,
  required = false,
}: SearchableNationalitySelectProps) {
  const [open, setOpen] = React.useState(false);

  // Find the display value (capitalized)
  const displayValue = React.useMemo(() => {
    if (!value) return "";
    const match = nationalities.find(
      (nationality) => nationality.toLowerCase() === value.toLowerCase()
    );
    return match || "";
  }, [value, nationalities]);

  return (
    <div className="mb-4">
      <Label htmlFor="nationality" className="text-sm mb-1.5 block">
        Nationality{required && <span className="text-red-500">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-gray-200 text-sm font-normal"
          >
            {displayValue || "Select your nationality"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search nationality..." className="h-9" />
            <CommandList>
              <CommandEmpty>No nationality found.</CommandEmpty>
              <CommandGroup className="max-h-[200px] overflow-auto">
                {nationalities.map((nationality) => (
                  <CommandItem
                    key={nationality}
                    value={nationality}
                    onSelect={() => {
                      onValueChange(nationality.toLowerCase());
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === nationality.toLowerCase()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {nationality}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
