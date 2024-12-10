"use server";

import { State } from "../definitions";
import { formSchema } from "../Schema";
import { Host } from "../../lib/constants";
import { createTBT } from "./tbtActions";
import { createTracker } from "./trackerActions";
import { createCustomerToken } from "./customerActions";
import { createAddressToken } from "./addressActions";

export async function createURL(
  prevState: State | undefined,
  formData: FormData
) {
  console.log();
  let tbt: string = "";
  let tracker: string = "";
  let env: string = "";
  let embedded: string = "/embedded?";
  let customer: string = "";
  let address: string = "";

  const validatedFields = formSchema.safeParse({
    secretKey: formData.get("secretKey"),
    publicKey: formData.get("publicKey"),
    mode: formData.get("mode"),
    amount: parseFloat(formData.get("amount") as string) || undefined,
    environment: formData.get("environment"),
    firstName: formData.get("firstName") ?? "",
    lastName: formData.get("lastName") ?? "",
    email: formData.get("email") ?? "",
    phoneNumber: formData.get("phoneNumber") ?? "",
    customerCountry: formData.get("customerCountry") ?? "",
    isGuest: formData.get("isGuest") === "on",
    addressCountry: formData.get("addressCountry") ?? "",
    state: formData.get("state") ?? "",
    city: formData.get("city") ?? "",
    street: formData.get("street") ?? "",
    postalCode: formData.get("postalCode") ?? "",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create checkout.",
    };
  }

  const {
    secretKey,
    publicKey,
    mode,
    amount,
    environment,
    firstName,
    lastName,
    email,
    phoneNumber,
    customerCountry,
    isGuest,
    addressCountry,
    state,
    city,
    street,
    postalCode,
  } = validatedFields.data;

  console.log(validatedFields);

  try {
    const TBT = await createTBT({
      secretKey: secretKey,
      host: Host[environment],
    });

    tbt = TBT ? `&tbt=${TBT}` : "";
    env = Host[environment] ? `environment=${environment}` : "";

    const Tracker = await createTracker({
      publicKey: publicKey,
      mode: mode,
      payment: amount,
      host: Host[environment],
    });

    tracker = `&tracker=${Tracker}`;

    if (firstName || lastName || email || phoneNumber || customerCountry) {
      const customerToken = await createCustomerToken({
        secretKey: secretKey,
        host: Host[environment],
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        country: customerCountry,
        isGuest: isGuest ?? false,
      });

      customer = customerToken ? `&user_id=${customerToken}` : "";
    }

    if (addressCountry) {
      const addressToken = await createAddressToken({
        secretKey: secretKey,
        host: Host[environment],
        country: addressCountry,
        state: state,
        city: city,
        street: street,
        postalCode: postalCode,
      });
      address = addressToken ? `&address=${addressToken}` : "";
    }

    const url = `${Host[environment]}${embedded}${env}${tbt}${tracker}${customer}${address}`;

    console.log({ url });
  } catch (error) {
    return {
      message: "API Error: Failed to fetch form data.",
    };
  }
}
