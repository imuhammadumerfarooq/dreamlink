import Safepay from "@sfpy/node-core";

export async function createAddressToken({
  secretKey,
  host,
  street,
  city,
  country,
}: {
  secretKey: string;
  host: string;
  street?: string;
  city?: string;
  country?: string;
}) {
  const safepay = new Safepay(secretKey, {
    authType: "secret",
    host: host,
  });

  try {
    const { data } = await safepay.customers.addresses.create({
      street1: street,
      city: city,
      country: country,
    });

    return data.token;
  } catch (error) {
    return {
      message: "API Error: Failed to fetch address data.",
    };
  }
}
