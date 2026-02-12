import { Navbar } from "@/components/Navbar";
import { ReactNode } from "react";

export default function authLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
