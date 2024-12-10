import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { formSchema } from "../lib/Schema";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { environments, paymentModes } from "../lib/constants";

interface KeyDetailProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  state: any;
}

const KeyDetails = ({ form, state }: KeyDetailProps) => {
  const mode = form.watch("mode");
  return (
    <>
      <FormField
        control={form.control}
        name="secretKey"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Secret Key"
                {...field}
                aria-describedby="secret-error"
              />
            </FormControl>
            <FormMessage
              id="secret-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state?.errors?.secretKey &&
                state?.errors?.secretKey.map((error: string) => (
                  <Label className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </Label>
                ))}
            </FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="publicKey"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Public Key"
                {...field}
                aria-describedby="public-error"
              />
            </FormControl>
            <FormMessage
              id="public-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state?.errors?.publicKey &&
                state?.errors?.publicKey.map((error: string) => (
                  <Label className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </Label>
                ))}
            </FormMessage>
          </FormItem>
        )}
      />

      <div>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Payment Mode
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              {paymentModes.map((mode) => (
                <div className="flex items-center" key={mode.id}>
                  <input
                    id={mode.id}
                    name="mode"
                    type="radio"
                    value={mode.id}
                    className="peer h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600"
                    aria-describedby="mode-error"
                  />
                  <label
                    htmlFor={mode.id}
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 peer-checked:bg-[#193A8C] peer-checked:text-white"
                  >
                    {mode.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>
        <div id="mode-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.mode &&
            state?.errors.mode.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {mode === "payment" && (
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Amount"
                  {...field}
                  value={field.value === undefined ? "" : field.value}
                  aria-describedby="payment-error"
                />
              </FormControl>
              <FormMessage
                id="payment-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state?.errors?.payment &&
                  state?.errors?.payment.map((error: string) => (
                    <Label className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </Label>
                  ))}
              </FormMessage>
            </FormItem>
          )}
        />
      )}

      <div>
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Environment
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              {environments.map((env) => (
                <div className="flex items-center" key={env.id}>
                  <input
                    id={env.id}
                    name="environment"
                    type="radio"
                    value={env.id}
                    className="peer h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600"
                    aria-describedby="environment-error"
                  />
                  <label
                    htmlFor={env.id}
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 peer-checked:bg-[#193A8C] peer-checked:text-white"
                  >
                    {env.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>
        <div id="environment-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.environment &&
            state?.errors.environment.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
    </>
  );
};

export default KeyDetails;
