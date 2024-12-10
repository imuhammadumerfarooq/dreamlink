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
  };
  message?: string | null;
};

type AddressData = {
  administrativeArea: Field;
  locality: Name;
  streetAddress: Name;
  postCode: Name;
  required: string[];
};

type Field = {
  name: string;
  options?: Option[];
};

type Option = {
  id: string;
  name: string;
};

type Name = {
  name: string;
};
