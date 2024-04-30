import { AppLayout } from "@/components/layouts/Dashboard";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Proj Man | Dashboard",
  description: "A project management app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
