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
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { secretKey, publicKey, environment } = validatedFields.data;

  const firstName = formData.get("firstName") as string | null;
  const lastName = formData.get("lastName") as string | null;
  const email = formData.get("email") as string | null;
  const phoneNumber = formData.get("phoneNumber") as string | null;
  const country = formData.get("country") as string | null;
  const isGuest = formData.get("isGuest") === "on";

  try {
    const tbt = await createTBT({
      secretKey: secretKey,
      host: Host[environment],
    });

    const tracker = await createTracker({
      publicKey: publicKey,
      host: Host[environment],
    });

    if (isGuest === true) {
      const customerToken = await createCustomerToken({
        secretKey: secretKey,
        host: Host[environment],
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phoneNumber: phoneNumber || "",
        country: country || "",
        isGuest: isGuest,
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
