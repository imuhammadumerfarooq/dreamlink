export default async function fetchCountry({ country }: { country: string }) {
  try {
    const response = await fetch(
      `https://dev.api.getsafepay.com/user/meta/v2/country?cc=${country}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Response Error: Failed to fetch country data.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return {
      message: "API Error: Failed to fetch country data.",
    };
  }
}
