import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RadioFieldProps } from "../lib/definitions";

const CustomRadioField: React.FC<RadioFieldProps> = ({
  control,
  name,
  label,
  ariaDescribedById,
  options,
  errors = {},
  onValueChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    options[0]?.id || ""
  );
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    if (selectedValue === "instrument") {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  }, [selectedValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <Label className="mb-2 block text-sm font-medium">{label}</Label>
          <FormControl>
            <RadioGroup
              {...field}
              onValueChange={(value) => {
                setSelectedValue(value);
                field.onChange(value);
                if (onValueChange) onValueChange(value);
              }}
              value={selectedValue}
              className="flex items-center gap-4 rounded-md border border-gray-200 bg-white px-[14px] py-2"
            >
              {options.map((option) => {
                const isSelected = field.value === option.id;
                return (
                  <FormItem
                    key={option.id}
                    className="flex items-center justify-center space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem
                        value={option.id}
                        id={option.id}
                        className="peer h-4 w-4 cursor-pointer"
                        aria-describedby={ariaDescribedById}
                      />
                    </FormControl>
                    <Label
                      htmlFor={option.id}
                      className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                        isSelected
                          ? "bg-[#193A8C] text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {option.label}
                    </Label>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage
            id={ariaDescribedById}
            aria-live="polite"
            aria-atomic="true"
          >
            {errors[name]?.map((error: string) => (
              <Label className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </Label>
            ))}
          </FormMessage>
          {/* Show message for specific mode */}
          {showMessage && selectedValue === "instrument" && (
            <p className="mt-2 text-sm text-red-500">
              Instrument mode needs customer details.
            </p>
          )}
        </FormItem>
      )}
    />
  );
};

export default CustomRadioField;
