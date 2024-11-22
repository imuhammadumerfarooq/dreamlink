export type customerProps = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  country: string;
  isGuest: boolean;
};

export type safepayUrlProps = {
  tbt: string;
  tracker: string;
  env: string;
};

// export type State = {
//   errors?: {
//     secretKey?: string[];
//     publicKey?: string[];
//     environment?: string[];
//     country?: string[];
//     firstName?: string[];
//     lastName?: string[];
//     email?: string[];
//     phoneNumber?: string[];
//     isGuest?: boolean;
//     street?: string[];
//     city?: string[];
//   };
//   message?: string | null;
// };
