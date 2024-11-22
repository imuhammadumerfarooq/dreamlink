import { z } from "zod";

const KeysSchema = z.object({
  secretKey: z.string().min(64, {
    message: "Secret Key must be at least 64 characters.",
  }),
  publicKey: z.string().min(40, {
    message: "Public Key must be at least 40 characters.",
  }),
  environment: z.enum(["development", "sandbox", "production"], {
    message: "Please select a host.",
  }),
});

const countrySchema = z.object({
  country: z.string().optional(),
});

const userSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    isGuest: z.boolean(),
  })
  .partial();

const addressSchema = z
  .object({
    street: z.string().optional(),
    city: z.string().optional(),
  })
  .optional();

export const formSchema = z.intersection(
  KeysSchema,
  z.intersection(countrySchema, z.intersection(userSchema, addressSchema))
);
