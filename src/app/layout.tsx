import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/Profile.Context";
import { getUser } from "@/lib/getUser";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  console.log(user);

  return (
    <html lang="en">
      <body className="antialiased bg-black" cz-shortcut-listen="true">
        <AuthProvider user={user}>
          <ProfileProvider>{children}</ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
