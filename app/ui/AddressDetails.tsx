"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { formSchema } from "../lib/Schema";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { countriesData } from "../lib/constants";
import fetchCountry from "../api/CountryRoute";

interface addressDetailProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  state: any;
}

type FieldType =
  | "AdministrativeArea"
  | "Locality"
  | "PostCode"
  | "StreetAddress";

type RequiredFieldsArray = FieldType[];

interface responseType {
  required: RequiredFieldsArray;
  Locality: { name: string };
  AdministrativeArea: { name: string };
  PostCode: { name: string };
  StreetAddress: { name: string };
}

const AddressDetails = ({ form, state }: addressDetailProps) => {
  const isAddressVisible = form.watch("isAddressVisible");

  const [response, setResponse] = useState<responseType | undefined>(undefined);

  useEffect(() => {
    // console.log(response, "response");
  }, [response]);

  return (
    <>
      <div className="flex flex-col items-starts">
        <FormField
          control={form.control}
          name="isAddressVisible"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    name="isAddressVisible"
                    id="address"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                    }}
                  />
                  <label
                    htmlFor="Address"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-2"
                  >
                    Create an address
                  </label>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        {isAddressVisible && (
          <>
            <div className="space-y-4 w-full motion-preset-slide-down motion-duration-2000">
              <FormField
                control={form.control}
                name="addressCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={async (value) => {
                          field.onChange(value);
                          console.log(value);
                          let { data: fields } = await fetchCountry({
                            country: value,
                          });
                          setResponse(fields);
                        }}
                        {...field}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select a country"
                            aria-describedby="addressCountry-error"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {countriesData.map((country) => (
                            <SelectItem
                              key={country.code}
                              value={country.code.toString()}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage
                      id="addressCountry-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {state?.errors?.addressCountry &&
                        state?.errors?.addressCountry.map((error: string) => (
                          <Label
                            className="mt-2 text-sm text-red-500"
                            key={error}
                          >
                            {error}
                          </Label>
                        ))}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {response?.required.map((fieldType, index) => (
                <div
                  key={index}
                  className=" space-y-4 w-full motion-preset-slide-down motion-duration-2000"
                >
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={response[fieldType].name}
                            {...field}
                            aria-describedby="addressState-error"
                          />
                        </FormControl>
                        <FormMessage
                          id="addressState-error"
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          {state?.errors?.addressState &&
                            state?.errors?.addressState.map((error: string) => (
                              <Label
                                className="mt-2 text-sm text-red-500"
                                key={error}
                              >
                                {error}
                              </Label>
                            ))}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddressDetails;
