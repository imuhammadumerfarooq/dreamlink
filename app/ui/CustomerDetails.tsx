import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "../lib/Schema";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface customerDetailProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  state: any;
}

const CustomerDetails = ({ form, state }: customerDetailProps) => {
  const isCustomerVisible = form.watch("isCustomerVisible");
  const customerCountry = form.watch("customerCountry");
  return (
    <>
      <div className="flex flex-col items-starts">
        <FormField
          control={form.control}
          name="isCustomerVisible"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    name="isCustomerVisible"
                    id="customer"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                    }}
                  />
                  <label
                    htmlFor="customer"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-2"
                  >
                    Create a customer
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isCustomerVisible && (
          <>
            <div className="h-500px space-y-4 w-full">
              <div className="flex w-[375px] gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          {...field}
                          aria-describedby="first-error"
                        />
                      </FormControl>
                      <FormMessage
                        id="first-error"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {state?.errors?.firstName &&
                          state?.errors?.firstName.map((error: string) => (
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          {...field}
                          aria-describedby="last-error"
                        />
                      </FormControl>
                      <FormMessage
                        id="last-error"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {state?.errors?.lastName &&
                          state?.errors?.lastName.map((error: string) => (
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

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        aria-describedby="email-error"
                      />
                    </FormControl>
                    <FormMessage
                      id="email-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {state?.errors?.email &&
                        state?.errors?.email.map((error: string) => (
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        {...field}
                        aria-describedby="phone-error"
                      />
                    </FormControl>
                    <FormMessage
                      id="phone-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {state?.errors?.phoneNumber &&
                        state?.errors?.phoneNumber.map((error: string) => (
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
                name="customerCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Country"
                        {...field}
                        aria-describedby="customerCountry-error"
                      />
                    </FormControl>
                    <FormMessage
                      id="customerCountry-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {state?.errors?.customerCountry &&
                        state?.errors?.customerCountry.map((error: string) => (
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

              {(customerCountry === "USA" || customerCountry === "CA") && (
                <FormField
                  control={form.control}
                  name="customerState"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="State"
                          {...field}
                          aria-describedby="customerState-error"
                        />
                      </FormControl>
                      <FormMessage
                        id="customerState-error"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {state?.errors?.customerState &&
                          state?.errors?.customerState.map((error: string) => (
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

              <FormField
                control={form.control}
                name="isGuest"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          name="isGuest"
                          id="guest"
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                          }}
                        />
                        <label
                          htmlFor="guest"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Guest
                        </label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CustomerDetails;
