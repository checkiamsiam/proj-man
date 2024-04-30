import { auth_options } from "@/lib/AuthOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(auth_options);

export { handler as GET, handler as POST };
