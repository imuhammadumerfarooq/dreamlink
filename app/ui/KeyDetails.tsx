import { useEffect, useState } from "react";
import { environments, paymentModes } from "../lib/constants";
import CustomFormField from "./CustomInputField";
import CustomRadioField from "./CustomRadioField";
import { FormDetailProps, Mode } from "../lib/definitions";

const KeyDetails = ({ form, state }: FormDetailProps) => {
  const [selectedMode, setSelectedMode] = useState<Mode>(
    form.getValues("mode") as Mode
  );

  useEffect(() => {
    const subscription = form.watch((value: any) => {
      if (value.mode) {
        setSelectedMode(value.mode);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <>
      <CustomFormField
        control={form.control}
        name="secretKey"
        placeholder="Secret Key"
        errors={state?.errors}
        ariaDescribedById="secret-error"
      />

      <CustomFormField
        control={form.control}
        name="publicKey"
        placeholder="Public Key"
        errors={state?.errors}
        ariaDescribedById="public-error"
      />

      <CustomRadioField
        control={form.control}
        name="environment"
        label="Environment"
        options={environments}
        errors={state?.errors}
        ariaDescribedById="environment-error"
      />

      <CustomRadioField
        control={form.control}
        name="mode"
        label="Payment Mode"
        options={paymentModes}
        errors={state?.errors}
        ariaDescribedById="mode-error"
        onValueChange={(value) => setSelectedMode(value as Mode)}
      />

      {selectedMode === "payment" && (
        <CustomFormField
          control={form.control}
          name="amount"
          type="number"
          placeholder="Amount"
          errors={state?.errors}
          ariaDescribedById="amount-error"
        />
      )}
    </>
  );
};

export default KeyDetails;
