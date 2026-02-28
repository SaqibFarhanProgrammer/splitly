import { TopNavbar } from "@/components/dashboard/Dashboard_Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { ReactNode } from "react";

//a
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#08080B]">
      <TopNavbar />
      <SidebarProvider>
        {children}
        <Sidebar />
      </SidebarProvider>
    </div>
  );
}
