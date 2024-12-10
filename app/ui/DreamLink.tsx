"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { formSchema } from "../lib/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { State } from "../lib/definitions";
import { createURL } from "../lib/actions/formActions";
import KeyDetails from "./KeyDetails";
import CustomerDetails from "./CustomerDetails";
import AddressDetails from "./AddressDetails";

export default function DreamLink() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createURL,
    initialState
  );

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
      street: "",
      city: "",
      postalCode: "",
    },
  });

  return (
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

            <p className="mt-2 text-sm text-red-500">{state?.message}</p>

            <Button variant="submit" disabled={isPending} type="submit">
              {isPending ? (
                <Loader2 className="flex justify-center mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-center">
          {state && (
            <div className="w-full flex justify-between">
              <Link
                href={"/"}
                target="_blank"
                className="w-full flex justify-center items-center"
              >
                Go to link
              </Link>
              <div className=" flex justify-center w-full text-white bg-[#193A8C] rounded-md h-9">
                <Drawer>
                  <DrawerTrigger>Open here</DrawerTrigger>
                  <DrawerContent className="h-[600px] ">
                    <DrawerHeader className="flex flex-col items-center">
                      <DrawerTitle>Checkout</DrawerTitle>
                      <DrawerDescription>Safepay Checkout</DrawerDescription>
                    </DrawerHeader>
                    <iframe
                      src={state.toString()}
                      aria-describedby={undefined}
                      className="h-full"
                    ></iframe>
                    <DrawerFooter>
                      <DrawerClose>
                        <div className="border border-gray-200 hover:bg-gray-100 inline-block px-5 py-1 rounded-md">
                          Close
                        </div>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </Form>
  );
}
