import { connectToDB } from "@/lib/mongo";

export async function GET() {
  try {
    const db = await connectToDB();
    const collections = await db.listCollections().toArray();
    return Response.json({ collections });
  } catch (err) {
    console.error("DB Test Error:", err);
    return Response.json({ error: "Failed to connect to DB" }, { status: 500 });
  }
}
