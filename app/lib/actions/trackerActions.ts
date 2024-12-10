import Safepay from "@sfpy/node-core";

export async function createTracker({
  publicKey,
  mode,
  payment,
  host,
}: {
  publicKey: string;
  mode: string;
  payment?: number;
  host: string;
}) {
  const safepay = new Safepay("", {
    authType: "jwt",
    host: host,
  });

  try {
    const { data } = await safepay.payments.session.setup({
      merchant_api_key: publicKey,
      intent: "CYBERSOURCE",
      mode: mode,
      currency: "PKR",
      amount: payment,
    });

    return data.tracker.token;
  } catch (error) {
    return {
      message: "API Error: Failed to fetch tracker data.",
    };
  }
}
