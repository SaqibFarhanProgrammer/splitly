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
      async authorize() {
        if (!this.credentials?.email || !this.credentials?.password) {
          throw new Error("Email and password are required");
        }
        try {
          await ConnectDB();
          const user = await User.findOne({ email: this.credentials.email });
          if (
            user &&
            (await bcrypt.compare(this.credentials.password, user.password))
          ) {
            return user;
          }
          return null;
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
};
