import { NextResponse } from "next/server";
import Safepay from "@sfpy/node-core";

export async function POST(request: Request) {
  const { Key } = await request.json();

  const safepay = new Safepay(Key, {
    authType: "secret",
    host: "dev.api.getsafepay.com",
  });

  try {
    console.log("something went wrong");

    const data = await safepay.client.passport.create();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
