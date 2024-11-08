"use server";

import { formSchema } from "../Schema";
import { Host } from "../../constants/page";
import { createTracker } from "./trackerActions";
import { createTBT } from "./tbtActions";
import { createCustomerToken } from "./customerActions";
import { createAddressToken } from "./addressActions";

export async function createURL(prevState: any, formData: FormData) {
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
    country: formData.get("country") ?? "",
    firstName: formData.get("firstName") ?? "",
    lastName: formData.get("lastName") ?? "",
    email: formData.get("email") ?? "",
    phoneNumber: formData.get("phoneNumber") ?? "",
    isGuest: formData.get("isGuest") === "on",
    street: formData.get("street") ?? "",
    city: formData.get("city") ?? "",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    secretKey,
    publicKey,
    environment,
    country,
    firstName,
    lastName,
    email,
    phoneNumber,
    isGuest,
    street,
    city,
  } = validatedFields.data;

  try {
    const TBT = await createTBT({
      secretKey: secretKey,
      host: Host[environment],
    });

    tbt = TBT ? `&tbt=${TBT}` : "";
    env = Host[environment] ? `environment=${environment}` : "";

    console.log(environment);

    const Tracker = await createTracker({
      publicKey: publicKey,
      host: Host[environment],
    });

    tracker = `&tracker=${Tracker}`;

    if (firstName || lastName || email || phoneNumber || country) {
      const customerToken = await createCustomerToken({
        secretKey: secretKey,
        host: Host[environment],
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        country: country,
        isGuest: isGuest ?? false,
      });
      customer = customerToken ? `&user_id=${customerToken}` : "";
    }

    if (street || city || country) {
      const addressToken = await createAddressToken({
        secretKey: secretKey,
        host: Host[environment],
        street: street,
        city: city,
        country: country,
      });
      address = addressToken ? `&address=${addressToken}` : "";
    }

    const url = `${Host[environment]}${embedded}${env}${tbt}${tracker}${customer}${address}`;

    return url;
  } catch (error) {
    return {
      message: "API Error: Failed to fetch form data.",
    };
  }
}
