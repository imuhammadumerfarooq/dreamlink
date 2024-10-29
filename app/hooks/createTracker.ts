import Safepay from "@sfpy/node-core";

export async function createTracker({
  publicKey,
  host,
}: {
  publicKey: string;
  host: string;
}) {
  const safepay = new Safepay("", {
    authType: "jwt",
    host: host,
  });

  try {
    const data = await safepay.payments.session.setup({
      merchant_api_key: publicKey,
      intent: "CYBERSOURCE",
      mode: "payment",
      currency: "PKR",
      amount: 1000,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}
