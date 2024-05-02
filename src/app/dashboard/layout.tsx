import DashboardLayout from "@/components/layouts/Dashboard";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ProzMan | Dashboard",
  description: "A project management app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
