import { UserRole } from "@/constants/Enums";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user?: {
      userId: string;
      username: string;
      email: string;
      role: UserRole;
    };
  }
}
ts;
