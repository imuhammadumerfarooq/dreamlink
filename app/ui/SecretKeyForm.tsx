"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button"; // Adjust import path as necessary
import { Input } from "@/components/ui/input"; // Adjust import path as necessary
import { useActionState } from "react"; // Import useActionState
import { submitSecretKeyAction } from "../lib/actions"; // Adjust import path as necessary

// Define the Zod schema for validation
const schema = z.object({
  secretKey: z.string().min(1, { message: "Secret key is required" }),
});

export function SecretKeyForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      secretKey: "",
    },
  });

  const [state, submit] = useActionState(submitSecretKeyAction, {
    success: false,
    message: "",
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    const formData = new FormData();
    formData.append("secretKey", data.secretKey);

    // Dispatching the action correctly within the form submission context
    submit(formData);
  };

  return (
    <form
      //   onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
      action={submit}
    >
      <div>
        <label htmlFor="secretKey">Secret Key</label>
        <Input
          id="secretKey"
          placeholder="Enter your secret key"
          {...form.register("secretKey")}
        />
      </div>
      <Button type="submit">Submit</Button>
      {state.message && <p>{state.message}</p>} {/* Display success message */}
    </form>
  );
}
