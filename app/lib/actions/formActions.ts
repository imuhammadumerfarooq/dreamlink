"use server";

import { formSchema } from "../Schema";
import { Host } from "../../constants/page";
import { createTracker } from "./trackerActions";
import { createTBT } from "./tbtActions";

export async function createURL(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    secretKey: formData.get("secretKey"),
    publicKey: formData.get("publicKey"),
    environment: formData.get("environment"),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { secretKey, publicKey, environment } = validatedFields.data;

  try {
    const tbt = await createTBT({
      secretKey: secretKey,
      host: Host[environment],
    });

    const tracker = await createTracker({
      publicKey: publicKey,
      host: Host[environment],
    });

    const url = `${Host[environment]}/embedded?environment=${environment}&tbt=${tbt}&tracker=${tracker}`;

    return url;
  } catch (error) {
    return {
      message: "API Error: Failed to fetch form data.",
    };
  }
}
