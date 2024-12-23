"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { formSchema } from "../lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState, useEffect, useState } from "react";
import { createURL } from "../lib/actions/formActions";
import { State } from "../lib/definitions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import KeyDetails from "./KeyDetails";
import CustomerDetails from "./CustomerDetails";
import AddressDetails from "./AddressDetails";
import DynamicURL from "./DynamicURL";
import { useToast } from "@/hooks/use-toast";

export default function DreamLink() {
  const initialState: State = { message: null, errors: {}, url: "" };
  const [state, formAction, isPending] = useActionState(
    createURL,
    initialState
  );

  const { toast } = useToast();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secretKey: "",
      publicKey: "",
      mode: "payment",
      environment: "development",
      isCustomerVisible: false,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      customerCountry: "",
      isGuest: false,
      isAddressVisible: false,
      addressCountry: "",
      state: "",
      city: "",
      street: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (state?.message) {
      toast({
        description: state.message,
        variant:
          state.errors?.length || state.message.includes("Failed")
            ? "destructive"
            : "success",
        duration: 3000,
      });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [state?.message, state.errors, toast]);

  useEffect(() => {
    setMessage(null);
  }, []);

  return (
    <>
      <Form {...form}>
        <Card>
          <CardHeader>
            <CardTitle>
              <Image
                className="dark:invert"
                src="/assets/logo.svg"
                alt="safepay-logo"
                width={100}
                height={20}
                priority
                style={{ width: "auto", height: "auto" }}
              />
            </CardTitle>
            <CardDescription>
              Create a safepay dream link by adding the credentials.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={formAction} className="space-y-4">
              <KeyDetails form={form} state={state} />

              <CustomerDetails form={form} state={state} />

              <AddressDetails form={form} state={state} />

              <Button variant="submit" disabled={isPending} type="submit">
                {isPending ? (
                  <Loader2 className="flex justify-center mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </CardContent>

          {state.url && !Object.keys(state.errors || {}).length && (
            <CardFooter className="flex items-center justify-center">
              <DynamicURL url={state.url} />
            </CardFooter>
          )}
        </Card>
      </Form>
    </>
  );
}
