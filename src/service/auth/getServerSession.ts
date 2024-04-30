import { auth_options } from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";

const getSessionOnServer = async () => {
  try {
    const session = await getServerSession(auth_options);
    return session;
  } catch (error) {
    return null;
  }
};

export { getSessionOnServer as getServerSession };
