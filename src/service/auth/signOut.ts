import { accessToken_key } from "@/constants/localstorageKeys";
import { removeFromCookie } from "@/utils/browserStorage/cookiestorage";
import { signOut } from "next-auth/react";

const gaSignOut = async (): Promise<void> => {
  await signOut({ redirect: false });
  removeFromCookie(accessToken_key);
};

export { gaSignOut as signOut };
