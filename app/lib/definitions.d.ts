export type State = {
  errors?: {
    secretKey?: string[];
    publicKey?: string[];
    environment?: string[];
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phoneNumber?: string[];
    customerCountry?: string[];
    customerState?: string[];
    street?: string[];
    city?: string[];
    addressCountry?: string[];
    addressState?: string[];
  };
  message?: string | null;
};
