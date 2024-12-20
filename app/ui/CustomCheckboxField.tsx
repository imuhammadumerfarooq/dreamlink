import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxFieldProps } from "../lib/definitions";

const CustomCheckboxField: React.FC<CheckboxFieldProps> = ({
  control,
  name,
  id,
  label,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                name={name}
                id={id}
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                }}
              />
              <Label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </Label>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomCheckboxField;
