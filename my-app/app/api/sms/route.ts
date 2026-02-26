import { NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: Request) {
  try {
    const { phone, message } = await req.json();

    if (!phone || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: phone,
    });

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: process.env.COMPANY_PHONE_NUMBER!,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "SMS failed" },
      { status: 500 }
    );
  }
}