import Safepay from "@sfpy/node-core";

export async function createCustomerToken({
  secretKey,
  host,
  firstName,
  lastName,
  email,
  phoneNumber,
  country,
  isGuest,
}: {
  secretKey: string;
  host: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  isGuest: boolean;
}) {
  const safepay = new Safepay(secretKey, {
    authType: "secret",
    host: host,
  });

  try {
    const { data } = await safepay.customers.object.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      country: country,
      is_guest: true,
    });

    return data.token;
  } catch (error) {
    return {
      message: "API Error: Failed to fetch tbt data.",
    };
  }
}
