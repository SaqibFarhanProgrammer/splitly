import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function AuthToken() {
  const cookiesStore = cookies();
  const token = await cookieStore<CookieListItem>.get("token")?.value
  console.log(token);
  
}
