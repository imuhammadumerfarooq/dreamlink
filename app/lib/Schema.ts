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

const userSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    country: z.string().optional(),
    isGuest: z.boolean(),
  })
  .partial();

export const formSchema = KeysSchema.merge(userSchema);
