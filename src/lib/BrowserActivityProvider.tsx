"use client";
import { accessToken_key } from "@/constants/localstorageKeys";
import { removeFromCookie, setToCookie } from "@/utils/browserStorage/cookiestorage";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

const BrowserActivityProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      setToCookie(accessToken_key, session?.accessToken);
    } else {
      removeFromCookie(accessToken_key);
    }
  }, [session?.accessToken, status]);

  return <>{children}</>;
};

export default BrowserActivityProvider;
