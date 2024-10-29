import { z } from "zod";

export const formSchema = z.object({
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
