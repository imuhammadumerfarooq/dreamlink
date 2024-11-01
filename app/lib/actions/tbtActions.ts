import Safepay from "@sfpy/node-core";

export async function createTBT({
  secretKey,
  host,
}: {
  secretKey: string;
  host: string;
}) {
  const safepay = new Safepay(secretKey, {
    authType: "secret",
    host: host,
  });

  try {
    const { data } = await safepay.client.passport.create();

    return data;
  } catch (error) {
    return {
      message: "API Error: Failed to fetch tbt data.",
    };
  }
}
