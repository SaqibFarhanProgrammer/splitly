import { GroupProvider } from "@/context/GroupContext";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/Profile.Context";
import { GetAllGroups } from "@/lib/Getallgroups";
import { getUser } from "@/lib/getUser";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const groups = await GetAllGroups();
  console.log(groups);

  console.log(user);

  return (
    <html lang="en">
      <body className="antialiased bg-black" cz-shortcut-listen="true">
        <AuthProvider user={user}>
          <GroupProvider groups={groups}>
            <ProfileProvider>{children}</ProfileProvider>
          </GroupProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
