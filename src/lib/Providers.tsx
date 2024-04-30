"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session as NextAuthSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import StyledComponentsRegistry from "./AntdRegistry";
import BrowserActivityProvider from "./BrowserActivityProvider";

const queryClient = new QueryClient()

const Providers = ({ children, session }: { children: ReactNode; session: NextAuthSession }) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <BrowserActivityProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </BrowserActivityProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
