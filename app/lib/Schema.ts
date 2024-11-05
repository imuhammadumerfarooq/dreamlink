import { z } from "zod";

const KeysSchema = z.object({
  secretKey: z.string().min(64, {
    message: "Secret Key must be a 64 characters.",
  }),
  publicKey: z.string().min(40, {
    message: "Public Key must be a 40 characters.",
  }),
  environment: z.enum(["development", "sandbox", "production"], {
    message: "Please select a host.",
  }),
});

const userSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      message: "Atleat 3 characters.",
    })
    .optional(),
  lastName: z
    .string()
    .min(3, {
      message: "Atleast 3 characters.",
    })
    .optional(),
  email: z
    .string()
    .min(10, {
      message: "Atleast 10 characters.",
    })
    .optional(),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Number should be a 10 characters.",
    })
    .optional(),
  country: z
    .string()
    .min(2, {
      message: "Enter a correct country code.",
    })
    .optional(),
  isGuest: z.boolean().default(false),
});

export const formSchema = KeysSchema.merge(userSchema);
