import { intersection, z } from "zod";

const KeysSchema = z
  .object({
    secretKey: z
      .string({ required_error: "Secret Key is required." })
      .min(64, { message: "Secret Key should be at least 64 characters." }),
    publicKey: z
      .string({ required_error: "Public Key is required." })
      .min(40, { message: "Public Key should be at least 40 characters." }),
    mode: z.enum(["payment", "instrument"], {
      invalid_type_error: "Please select payment mode.",
    }),
    amount: z
      .number()
      .positive({ message: "Please enter an amount greater than 0." })
      .optional(),
    environment: z.enum(["development", "sandbox", "production"], {
      invalid_type_error: "Please select a host.",
    }),
  })
  .refine(
    (data) => data.mode !== "payment" || (data.amount && data.amount > 0),
    {
      message: "Please enter an amount greater than 0.",
      path: ["amount"],
    }
  );

const customerSchema = z
  .object({
    isCustomerVisible: z.boolean().default(false),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    customerCountry: z.string().optional(),
    isGuest: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.isCustomerVisible) {
      if (!data.firstName || data.firstName.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "First name is required.",
          path: ["firstName"],
        });
      } else if (data.firstName.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "First Name should be at least 3 characters.",
          path: ["firstName"],
        });
      }

      if (!data.lastName || data.lastName.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Last name is required.",
          path: ["lastName"],
        });
      } else if (data.lastName.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Last Name should be at least 3 characters.",
          path: ["lastName"],
        });
      }

      if (!data.email || data.email.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required.",
          path: ["email"],
        });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email format.",
          path: ["email"],
        });
      }

      if (!data.phoneNumber || data.phoneNumber.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number is required.",
          path: ["phoneNumber"],
        });
      } else if (!/^\+?[0-9\s-]*$/.test(data.phoneNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number format.",
          path: ["phoneNumber"],
        });
      }

      if (!data.customerCountry || data.customerCountry.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Customer country is required.",
          path: ["customerCountry"],
        });
      }
    }
  });

const addressSchema = z
  .object({
    isAddressVisible: z.boolean().default(false),
    addressCountry: z.string(),
    state: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    postalCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isAddressVisible) {
      if (!data.addressCountry || data.addressCountry.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Customer country is required.",
          path: ["addressCountry"],
        });
      }
    }
  })
  .superRefine((data, ctx) => {
    if (data.isAddressVisible === true) {
      if (!data.addressCountry || data.addressCountry.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "country is required.",
          path: ["addressCountry"],
        });
      }

      if (!data.city || data.city.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City is required.",
          path: ["city"],
        });
      }

      if (!data.state || data.state.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "State is required.",
          path: ["state"],
        });
      }

      if (!data.street || data.street.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Street is required.",
          path: ["street"],
        });
      }

      if (!data.postalCode || data.postalCode.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Postal Code is required.",
          path: ["postalCode"],
        });
      }
    }
  });

export const formSchema = z
  .intersection(KeysSchema, intersection(customerSchema, addressSchema))
  .refine(
    (data) => {
      if (data.mode === "instrument") {
        return (
          !!data.firstName &&
          !!data.lastName &&
          !!data.email &&
          !!data.phoneNumber &&
          !!data.customerCountry
        );
      }
      return true;
    },
    {
      message: "Customer details are required when mode is 'instrument'.",
    }
  );
