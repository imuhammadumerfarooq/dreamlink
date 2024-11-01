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
