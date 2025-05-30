import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";

export async function GET() {
  try {
    const db = await connectToDB();
    const users = await db
      .collection("users")
      .find({ reviewed: false })
      .toArray();

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
