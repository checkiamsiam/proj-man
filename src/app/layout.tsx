import NProgressBar from "@/components/loadings/NProgressBar";
import Providers from "@/lib/Providers";
import type { Metadata } from "next";
import { Session } from "next-auth";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proj Man",
  description: "A project management app",
};

export default function RootLayout({ children, session }: { children: ReactNode; session: Session }) {
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <NProgressBar  height={2} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
