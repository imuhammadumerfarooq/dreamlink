"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
import { z } from "zod";
import { formSchema } from "../lib/Schema";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { createURL } from "../lib/actions/formActions";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

const initialState = { message: "" };

export default function LinkGenerator() {
  const [state, formAction, isPending] = useActionState(
    createURL,
    initialState
  );

  const [isVisible, setIsVisible] = useState(false);

  const [isCustomerChecked, setIsCustomerChecked] = useState(false);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secretKey: "",
      publicKey: "",
      environment: "development",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
      isGuest: false,
    },
  });

  const handleCheckboxChange = () => {
    setIsVisible(!isVisible);

    setIsCustomerChecked(!isCustomerChecked);
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>
            <Image
              className="dark:invert"
              src="/assets/logo.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </CardTitle>
          <CardDescription>
            Create a safepay checkout link by adding the credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <FormField
              control={form.control}
              name="secretKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Secret Key" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publicKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Public Key" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

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
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 "
                    />
                    <label
                      htmlFor="development"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
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
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="sandbox"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-[#193A8C] px-3 py-1.5 text-xs font-medium text-white"
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
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="production"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-[#193A8C] px-3 py-1.5 text-xs font-medium text-white"
                    >
                      production
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>

            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customer"
                  defaultChecked={isVisible}
                  onCheckedChange={handleCheckboxChange}
                />
                <label htmlFor="customer" className="text-sm font-medium py-2">
                  Create a new Customer
                </label>
              </div>

              {isVisible && (
                <>
                  <div className="h-500px space-y-4 w-full">
                    <div className="flex w-[375px] gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="First Name" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Last Name" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Phone Number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Country" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isGuest"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                name="isGuest"
                                id="guest"
                                defaultChecked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <label
                                htmlFor="guest"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Guest
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
            </div>

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
          {typeof state === "string" && (
            <div className="w-full flex justify-between">
              <Link
                href={state}
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
