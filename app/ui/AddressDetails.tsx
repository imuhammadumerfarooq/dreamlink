import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { formSchema } from "../lib/Schema";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface addressDetailProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  state: any;
}

const AddressDetails = ({ form, state }: addressDetailProps) => {
  const isAddressVisible = form.watch("isAddressVisible");
  const addressCountry = form.watch("addressCountry");
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
            <div className="space-y-4 w-full">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Street"
                        {...field}
                        aria-describedby="street-error"
                      />
                    </FormControl>
                    <FormMessage
                      id="street-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {state?.errors?.street &&
                        state?.errors?.street.map((error: string) => (
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

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="City"
                        {...field}
                        aria-describedby="city-error"
                      />
                    </FormControl>
                    <FormMessage
                      id="city-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {state?.errors?.city &&
                        state?.errors?.city.map((error: string) => (
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

              <FormField
                control={form.control}
                name="addressCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Country"
                          {...field}
                          aria-describedby="addressCountry-error"
                        />
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

                    <FormMessage />
                  </FormItem>
                )}
              />
              {(addressCountry === "USA" || addressCountry === "CA") && (
                <FormField
                  control={form.control}
                  name="addressState"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="State"
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
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddressDetails;
