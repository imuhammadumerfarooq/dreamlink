// "use server";

// import { Host } from "../constants/page";
// import { formSchema } from "./Schema";

// const CreateTBT = formSchema.omit({ publicKey: true });

// export async function createTBT(prevState: any, formData: FormData) {
//   const validatedFields = CreateTBT.safeParse({
//     secretKey: formData.get("secretKey"),
//     environment: formData.get("environment"),
//   });

//   if (!validatedFields.success) {
//     console.log(validatedFields);

//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const { secretKey, environment } = validatedFields.data;

//   try {
//     const response = await fetch("/api/passport", {
//       method: "POSt",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         secretKey: secretKey,
//         environment: Host[`${environment}`],
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const tbt = await response.json();
//     console.log(tbt);

//     return tbt;
//   } catch (error) {
//     return {
//       message: "API Error: Failed to fetch data.",
//     };
//   }
// }

// actions.ts
"use server";

export async function submitSecretKeyAction(
  prevState: any,
  formData: FormData
) {
  const secretKey = formData.get("secretKey");

  try {
    const response = await fetch("/api/passport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secretKey: secretKey,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const tbt = await response.json();
  } catch (error) {
    return {
      message: "API Error: Failed to fetch data.",
    };
  }

  return {
    success: true,
    message: "Secret key submitted successfully!",
  };
}
