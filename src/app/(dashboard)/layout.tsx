import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div>
    <Navbar/>
    <SidebarProvider>

    {children}
    <Sidebar/>
    </SidebarProvider>
    </div>;
}
