import { NextResponse } from "next/server";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY!,
  process.env.MAILJET_SECRET_KEY!
);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Email to Company
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.COMPANY_EMAIL!,
            Name: "Vanexa Contact Form",
          },
          To: [
            {
              Email: process.env.COMPANY_EMAIL!,
              Name: "Company",
            },
          ],
          Subject: `New Contact Message: ${subject || "No Subject"}`,
          TextPart: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
          `,
          HTMLPart: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/> ${message}</p>
          `,
        },
      ],
    });

    // 2️⃣ Confirmation Email to Customer
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.COMPANY_EMAIL!,
            Name: "Vanexa Team",
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: "We received your message!",
          TextPart: `
            Hi ${name},

            Thank you for contacting us.
            Our team will respond shortly.

            - Vanexa Team
          `,
          HTMLPart: `
            <h2>Hi ${name},</h2>
            <p>Thank you for contacting us.</p>
            <p>Our team will respond shortly.</p>
            <br/>
            <p><strong>Vanexa Team</strong></p>
          `,
        },
      ],
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}