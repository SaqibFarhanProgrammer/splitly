import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Sessions {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
