import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { formSchema } from "../lib/Schema";
import { Label } from "@/components/ui/label";
import { countriesData } from "../lib/constants";
import fetchCountry from "../api/CountryRoute";
import CustomCheckboxField from "./CustomCheckboxField";
import CustomCountryField from "./CustomCountryField";
import { FieldType, FormDetailProps, responseType } from "../lib/definitions";
import { Loader2 } from "lucide-react";

const AddressDetails = ({ form, state }: FormDetailProps) => {
  const isAddressVisible = form.watch("isAddressVisible");

  const [response, setResponse] = useState<responseType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [response]);

  return (
    <>
      <div className="flex flex-col items-starts">
        <CustomCheckboxField
          control={form.control}
          name="isAddressVisible"
          id="address"
          label="Create an address"
        />

        {isAddressVisible && (
          <>
            <div className="space-y-4 pt-2 w-full motion-preset-slide-down motion-duration-1000">
              <CustomCountryField
                control={form.control}
                name="addressCountry"
                ariaDescribedById="addressCountry-error"
                placeholder="Select a country"
                countriesData={countriesData}
                errors={state?.errors}
                onValueChange={async (value) => {
                  setIsLoading(true);
                  try {
                    const { data: fields } = await fetchCountry({
                      country: value,
                    });
                    setResponse(fields);
                  } catch (error) {
                    console.error("Error fetching country details:", error);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              />

              {isLoading && (
                <div className="flex justify-center items-center mt-4">
                  <Loader2 className="animate-spin text-[#193A8C]" />
                </div>
              )}

              {!isLoading &&
                response?.required.map((fieldType, index) => {
                  const fieldNameMap: Record<
                    FieldType,
                    keyof z.infer<typeof formSchema>
                  > = {
                    AdministrativeArea: "state",
                    Locality: "city",
                    StreetAddress: "street",
                    PostCode: "postalCode",
                  };

                  const fieldName = fieldNameMap[fieldType];

                  return (
                    <div
                      key={index}
                      className=" space-y-4 w-full motion-preset-slide-down motion-duration-500"
                    >
                      <FormField
                        control={form.control}
                        name={fieldName}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder={response[fieldType].name}
                                {...field}
                                value={
                                  typeof field.value === "string"
                                    ? field.value
                                    : ""
                                }
                                aria-describedby={`${fieldName}-error`}
                              />
                            </FormControl>
                            <FormMessage
                              id={`${fieldName}-error`}
                              aria-live="polite"
                              aria-atomic="true"
                            >
                              {state?.errors?.[fieldName] &&
                                state?.errors?.[fieldName].map(
                                  (error: string) => (
                                    <Label
                                      className="mt-2 text-sm text-red-500"
                                      key={error}
                                    >
                                      {error}
                                    </Label>
                                  )
                                )}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddressDetails;
