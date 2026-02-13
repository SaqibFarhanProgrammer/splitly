import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectDB } from "./ConnectDB";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        try {
          await ConnectDB();
          const user = await User.findOne({ email: credentials.email });
          if (
            user &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            return {
              id: user._id.toString(),
              email: user.email,
            };
          }
          return null;
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // now TypeScript knows id exists
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret:process.env.NEXTAUTH_SECRET
};
