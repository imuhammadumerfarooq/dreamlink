import { z } from "zod";

const KeysSchema = z
  .object({
    secretKey: z
      .string({ required_error: "Secret Key is required." })
      .min(64, { message: "Secret Key should be at least 64 characters." }),
    publicKey: z
      .string({ required_error: "Public Key is required." })
      .min(40, { message: "Public Key should be at least 40 characters." }),
    mode: z.enum(["payment", "instrument"], {
      invalid_type_error: "Please select a mode.",
    }),
    amount: z.number().optional(),
    environment: z.enum(["development", "sandbox", "production"], {
      invalid_type_error: "Please select a host.",
    }),
  })
  .refine(
    (data) => {
      if (data.mode === "payment") {
        return !!data.amount;
      }
      return true;
    },
    {
      message: "Payment is required.",
      path: ["payment"],
    }
  );

const userSchema = z
  .object({
    isCustomerVisible: z.boolean().default(false),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    customerCountry: z.string(),
    isGuest: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isCustomerVisible === true) {
        return data.firstName;
      }
      return true;
    },
    {
      message: "First Name should be at least 3 characters.",
      path: ["firstName"],
    }
  )
  .refine(
    (data) => {
      if (data.isCustomerVisible === true) {
        return data.lastName;
      }
      return true;
    },
    {
      message: "Last Name should be at least 3 characters.",
      path: ["lastName"],
    }
  )
  .refine(
    (data) => {
      if (data.isCustomerVisible === true) {
        return data.email;
      }
      return true;
    },
    { message: "Invalid Email.", path: ["email"] }
  )
  .refine(
    (data) => {
      if (data.isCustomerVisible === true) {
        return data.phoneNumber;
      }
      return true;
    },
    {
      message: "Phone Number contains at least 11 digits.",
      path: ["phoneNumber"],
    }
  )
  .refine(
    (data) => {
      if (data.isCustomerVisible === true) {
        return data.customerCountry;
      }
      return true;
    },
    {
      path: ["customerCountry"],
    }
  )
  .refine(
    (data) => {
      if (data.isCustomerVisible === true) {
        return !!data;
      }
      return true;
    },
    {
      path: ["isGuest"],
    }
  );

const addressSchema = z
  .object({
    isAddressVisible: z.boolean().default(false),
    addressCountry: z.string(),
    state: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    postalCode: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isAddressVisible === true) {
        return !!data.addressCountry;
      }
      return true;
    },
    {
      message: "Select a country.",
      path: ["addressCountry"],
    }
  );

export const formSchema = z.intersection(
  KeysSchema,
  z.intersection(userSchema, addressSchema)
);
