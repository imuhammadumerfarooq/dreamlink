import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputFieldProps } from "../lib/definitions";

const CustomInputField: React.FC<InputFieldProps> = ({
  control,
  name,
  type,
  placeholder,
  ariaDescribedById,
  errors = {},
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              value={field.value === undefined ? "" : field.value}
              aria-describedby={ariaDescribedById}
            />
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
        </FormItem>
      )}
    />
  );
};

export default CustomInputField;
