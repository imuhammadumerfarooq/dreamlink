export type State = {
  errors?: {
    secretKey?: string[];
    publicKey?: string[];
    mode?: string[];
    environment?: string[];
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phoneNumber?: string[];
    customerCountry?: string[];
    addressCountry?: string[];
    state?: string[];
    street?: string[];
    city?: string[];
    postalCode?: string[];
  } & Record<string, string[]>;
  message?: string | null;
  url?: string | null;
};

interface FormDetailProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  state: any;
}

interface DynamicURLProps {
  url: string;
}

export type Mode = "payment" | "instrument";

export type FieldType =
  | "AdministrativeArea"
  | "Locality"
  | "PostCode"
  | "StreetAddress";

type RequiredFieldsArray = FieldType[];

interface responseType {
  required: RequiredFieldsArray;
  Locality: { name: string };
  AdministrativeArea: { name: string };
  PostCode: { name: string };
  StreetAddress: { name: string };
}

interface CheckboxFieldProps {
  control: any;
  name: string;
  id: string;
  label: string;
}

interface InputFieldProps {
  control: any;
  name: string;
  type?: "text" | "number";
  placeholder: string;
  ariaDescribedById: string;
  errors?: Record<string, string[]>;
}

interface CountryFieldProps {
  control: any;
  name: string;
  ariaDescribedById: string;
  placeholder: string;
  countriesData: { code: string; name: string }[];
  errors?: Record<string, string[]>;
  onValueChange?: (value: string) => void | Promise<void>;
}

interface RadioFieldProps {
  control: any;
  name: string;
  label: string;
  ariaDescribedById: string;
  options: { id: string; label: string }[];
  errors?: Record<string, string[]>;
  onValueChange?: (value: string) => void | Promise<void>;
}
