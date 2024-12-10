import Safepay from "@sfpy/node-core";

export async function createAddressToken({
  secretKey,
  host,
  country,
  state,
  city,
  street,
  postalCode,
}: {
  secretKey: string;
  host: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  postalCode?: string;
}) {
  const safepay = new Safepay(secretKey, {
    authType: "secret",
    host: host,
  });

  try {
    const { data } = await safepay.customers.addresses.create({
      country: country,
      state: state,
      city: city,
      street1: street,
      postal_code: postalCode,
    });

    return data.token;
  } catch (error) {
    return {
      message: "API Error: Failed to fetch address data.",
    };
  }
}
