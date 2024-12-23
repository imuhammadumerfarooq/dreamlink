import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { countriesData } from "../lib/constants";
import CustomCheckboxField from "./CustomCheckboxField";
import CustomFormField from "./CustomInputField";
import CustomCountryField from "./CustomCountryField";
import { FormDetailProps } from "../lib/definitions";

const CustomerDetails = ({ form, state }: FormDetailProps) => {
  const isCustomerVisible = form.watch("isCustomerVisible");

  return (
    <>
      <div className="flex flex-col items-starts">
        <CustomCheckboxField
          control={form.control}
          name="isCustomerVisible"
          id="customer"
          label="Create a customer"
        />

        {isCustomerVisible && (
          <>
            <div className="h-500px space-y-4 pt-2 w-full motion-preset-slide-down motion-duration-1000">
              <div className="flex w-[375px] gap-8">
                <CustomFormField
                  control={form.control}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  errors={state?.errors}
                  ariaDescribedById="first-error"
                />

                <CustomFormField
                  control={form.control}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  errors={state?.errors}
                  ariaDescribedById="last-error"
                />
              </div>

              <CustomFormField
                control={form.control}
                name="email"
                type="text"
                placeholder="Email"
                errors={state?.errors}
                ariaDescribedById="email-error"
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
                        state.errors.phoneNumber.map((error: string) => (
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

              <CustomCountryField
                control={form.control}
                name="customerCountry"
                ariaDescribedById="customerCountry-error"
                placeholder="Select a country"
                countriesData={countriesData}
                errors={state?.errors}
              />

              <CustomCheckboxField
                control={form.control}
                name="isGuest"
                id="guest"
                label="Guest"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CustomerDetails;
