import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  return new Response(JSON.stringify({ session }), {
    headers: { "Content-Type": "application/json" },
  });
}
