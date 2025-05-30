import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { fullName, email, password, university, profession, message } =
      await request.json();

    if (
      !fullName ||
      !email ||
      !password ||
      !university ||
      !profession ||
      !message
    ) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const db = await connectToDB();

    const existingUser = await db
      .collection("users")
      .findOne({ email: email.toLowerCase().trim() });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      fullName,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      university,
      profession,
      message,
      reviewed: false, // admin hasn't seen it yet
      approved: null, // will become true or false later
      generatedUsername: null, // generated if approved
      generatedPassword: null, // temp password to send via email if approved
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);

    return NextResponse.json({
      message: "Your data is being reviewed. Check your mail within 24h.",
    });
  } catch (error) {
    console.error("Signup API error:", error);
    console.log("Received data:", {
      fullName,
      email,
      password,
      university,
      profession,
      message,
    });

    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
