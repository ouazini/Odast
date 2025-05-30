import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongo";
import bcrypt from "bcryptjs";

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        if (!user.approved) throw new Error("User not approved");

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          approved: user.approved,
          fullName: user.fullName,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.approved = token.approved;
      session.user.fullName = token.fullName;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.approved = user.approved;
        token.fullName = user.fullName;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
