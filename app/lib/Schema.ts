import { z } from "zod";

const KeysSchema = z.object({
  secretKey: z
    .string({ required_error: "Secret Key is required." })
    .min(64, { message: "Secret Key should be at least 64 characters." }),
  publicKey: z
    .string({ required_error: "Public Key is required." })
    .min(40, { message: "Public Key should be at least 40 characters." }),
  environment: z.enum(["development", "sandbox", "production"], {
    invalid_type_error: "Please select a host.",
  }),
});

const userSchema = z
  .object({
    isCustomerVisible: z.boolean().default(false),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    customerCountry: z.string(),
    customerState: z.string().optional(),
    isGuest: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.isCustomerVisible && !data.firstName) {
      ctx.addIssue({
        path: ["firstName"],
        message: "First name is required when the customer is visible.",
        code: z.ZodIssueCode.custom,
      });
    }
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
      if (data.customerCountry === "USA" || data.customerCountry === "CA") {
        return !!data.customerState;
      }
      return true;
    },
    {
      message: "Select a state.",
      path: ["state"],
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
    street: z.string(),
    city: z.string(),
    addressCountry: z.string(),
    addressState: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isAddressVisible === true) {
        return !!data.street;
      }
      return true;
    },
    {
      message: "Street address.",
      path: ["street"],
    }
  )
  .refine(
    (data) => {
      if (data.isAddressVisible === true) {
        return !!data.city;
      }
      return true;
    },
    {
      message: "Select a city.",
      path: ["city"],
    }
  )
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
  )
  .refine(
    (data) => {
      if (data.addressCountry === "USA" || data.addressCountry === "CA") {
        return !!data.addressState;
      }
      return true;
    },
    {
      message: "Select a state.",
      path: ["state"],
    }
  );

export const formSchema = z.intersection(
  KeysSchema,
  z.intersection(userSchema, addressSchema)
);
