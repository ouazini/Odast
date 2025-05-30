import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";

// Only generate password now (no username)
const generatePassword = () => Math.random().toString(36).slice(-8);

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
  });
};

export async function POST(req) {
  const { userId, action } = await req.json();
  const db = await connectToDB();

  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(userId) });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (action === "approve") {
    const password = generatePassword();
    const hashed = await bcrypt.hash(password, 10);

    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashed,
          reviewed: true,
          approved: true,
        },
      }
    );

    await sendEmail(
      user.email,
      "Account Approved",
      `You have been approved!\nLogin with your email: ${user.email}\nPassword: ${password}`
    );
  } else {
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          reviewed: true,
          approved: false,
        },
      }
    );

    await sendEmail(
      user.email,
      "Application Rejected",
      "Unfortunately, we can't accept your application at this time."
    );
  }

  return NextResponse.json({ success: true });
}
