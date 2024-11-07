"use server";

import { formSchema } from "../Schema";
import { Host } from "../../constants/page";
import { createTracker } from "./trackerActions";
import { createTBT } from "./tbtActions";
import { createCustomerToken } from "./customerActions";

export async function createURL(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    secretKey: formData.get("secretKey"),
    publicKey: formData.get("publicKey"),
    environment: formData.get("environment"),
    firstName: formData.get("firstName") ?? "",
    lastName: formData.get("lastName") ?? "",
    email: formData.get("email") ?? "",
    phoneNumber: formData.get("phoneNumber") ?? "",
    country: formData.get("country") ?? "",
    isGuest: formData.get("isGuest") === "on",
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
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    isGuest,
  } = validatedFields.data;

  try {
    const tbt = await createTBT({
      secretKey: secretKey,
      host: Host[environment],
    });

    const tracker = await createTracker({
      publicKey: publicKey,
      host: Host[environment],
    });

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
      console.log({ customerToken });
    }

    const url = `${Host[environment]}/embedded?environment=${environment}&tbt=${tbt}&tracker=${tracker}`;

    return url;
  } catch (error) {
    return {
      message: "API Error: Failed to fetch form data.",
    };
  }
}
