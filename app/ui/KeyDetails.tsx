"use client";

import { useState } from "react";
import { z } from "zod";
import { formSchema } from "../lib/Schema";
import { UseFormReturn } from "react-hook-form";
import { environments, paymentModes } from "../lib/constants";
import CustomFormField from "./CustomInputField";
import CustomRadioField from "./CustomRadioField";

interface KeyDetailProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  state: any;
}

const KeyDetails = ({ form, state }: KeyDetailProps) => {
  const [selectedMode, setSelectedMode] = useState("");

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
        onValueChange={(value) => setSelectedMode(value)}
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
