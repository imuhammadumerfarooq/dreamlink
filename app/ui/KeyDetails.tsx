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

interface KeyDetailProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  state: any;
}

const KeyDetails = ({ form, state }: KeyDetailProps) => {
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

      <div className="">
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Environment
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="development"
                  name="environment"
                  type="radio"
                  value="development"
                  className="peer h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600"
                  aria-describedby="environment-error"
                />
                <label
                  htmlFor="development"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 peer-checked:bg-[#193A8C] peer-checked:text-white"
                >
                  development
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="sandbox"
                  name="environment"
                  type="radio"
                  value="sandbox"
                  className="peer h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600"
                  aria-describedby="environment-error"
                />
                <label
                  htmlFor="sandbox"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 peer-checked:bg-[#193A8C] peer-checked:text-white"
                >
                  sandbox
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="production"
                  name="environment"
                  type="radio"
                  value="production"
                  className="peer h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600"
                  aria-describedby="environment-error"
                />
                <label
                  htmlFor="production"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 peer-checked:bg-[#193A8C] peer-checked:text-white"
                >
                  production
                </label>
              </div>
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
