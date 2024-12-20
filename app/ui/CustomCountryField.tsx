import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryFieldProps } from "../lib/definitions";

const CustomCountryField: React.FC<CountryFieldProps> = ({
  control,
  name,
  ariaDescribedById,
  placeholder,
  countriesData,
  errors = {},
  onValueChange,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                if (onValueChange) onValueChange(value);
              }}
              {...field}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={placeholder}
                  aria-describedby={ariaDescribedById}
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

export default CustomCountryField;
