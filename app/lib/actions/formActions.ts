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
  let tbt: string = "";
  let tracker: string = "";
  let env: string = "";
  let embedded: string = "/embedded?";
  let customer: string = "";
  let address: string = "";

  const validatedFields = formSchema.safeParse({
    secretKey: formData.get("secretKey"),
    publicKey: formData.get("publicKey"),
    environment: formData.get("environment"),
    firstName: formData.get("firstName") ?? "",
    lastName: formData.get("lastName") ?? "",
    email: formData.get("email") ?? "",
    phoneNumber: formData.get("phoneNumber") ?? "",
    customerCountry: formData.get("customerCountry") ?? "",
    customerState: formData.get("customerState") ?? "",
    isGuest: formData.get("isGuest") === "on",
    street: formData.get("street") ?? "",
    city: formData.get("city") ?? "",
    addressCountry: formData.get("addressCountry") ?? "",
    addressState: formData.get("addressState") ?? "",
  });
  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create checkout.",
    };
  }

  console.log(validatedFields);

  const {
    secretKey,
    publicKey,
    environment,
    firstName,
    lastName,
    email,
    phoneNumber,
    customerCountry,
    customerState,
    isGuest,
    street,
    city,
    addressCountry,
    addressState,
  } = validatedFields.data;

  try {
    const TBT = await createTBT({
      secretKey: secretKey,
      host: Host[environment],
    });

    tbt = TBT ? `&tbt=${TBT}` : "";
    env = Host[environment] ? `environment=${environment}` : "";

    const Tracker = await createTracker({
      publicKey: publicKey,
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
        state: customerState,
        isGuest: isGuest ?? false,
      });
      customer = customerToken ? `&user_id=${customerToken}` : "";
    }

    if (street || city || addressCountry) {
      const addressToken = await createAddressToken({
        secretKey: secretKey,
        host: Host[environment],
        street: street,
        city: city,
        country: addressCountry,
        state: addressState,
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
