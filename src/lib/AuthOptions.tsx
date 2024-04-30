import { UserRole } from "@/constants/Enums";
import { login_credential } from "@/constants/credentialId";
import { envConfig } from "@/helpers/config/envConfig";
import { jwtHelpers } from "@/helpers/jwthelpers/jwthelpers";
import { CallbacksOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers/index";

const providers: Provider[] = [
  CredentialsProvider({
    id: login_credential,
    name: "Credentials",
    type: "credentials",
    credentials: {},
    authorize: async (credentials: any) => {
      try {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("please enter email or password");
        }

        // make a fake authentication for two role manager and user and generate jwt token
        // in real world you should use a real authentication service
        const loginWithCredential = async  ({ email, password }: any) => {
          if (email === "manager@email.com" && password === "manager") {
            const accessToken = await jwtHelpers.createToken(
              {
                userId: "1",
                username: "manager",
                email: "manager@email.com",
                role: UserRole.manager,
              },
              envConfig.jwt.secret,
              envConfig.jwt.expiresIn
            )
            return {
              data: {
                accessToken
              },
            };
          } else if (email === "user@email.com" && password === "user") {
            const accessToken = await jwtHelpers.createToken(
              {
                userId: "2",
                username: "user",
                email: "user@email.com",
                role: UserRole.user,
              },
              envConfig.jwt.secret,
              envConfig.jwt.expiresIn
            )
            return {
              data: {
                accessToken
              },
            };
          }else{
            throw new Error("Something went wrong");
          }
        }
        // fake auth end

        const { data } = await loginWithCredential({ email, password });

        const verifiedToken: any = jwtHelpers.verifyToken(data?.accessToken as string, envConfig.jwt.secret);
        // If no error and we have user data, return it
        if (data?.accessToken && verifiedToken) {
          return {
            id: verifiedToken?.userId,
            accessToken: data?.accessToken,
            user: {
              userId: verifiedToken?.userId,
              username: verifiedToken?.username,
              email: verifiedToken?.email,
              role: verifiedToken?.role,
            },
          };
        }

        throw new Error("Something went wrong");
      } catch (error: any) {
        throw new Error(error?.message || "Something went wrong");
      }
    },
  }),
];

const callbacks: Partial<CallbacksOptions> = {
  jwt: async ({ token, user }: any) => {
    if (user) {
      token.user = user?.user;
      token.accessToken = user?.accessToken;
    }
    return Promise.resolve(token);
  },
  redirect: async ({ url }) => {
    let baseUrl = envConfig.siteUrl;
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`;
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url;
    return baseUrl;
  },
  session: async ({ session, token }: any) => {
    // Here we pass accessToken to the client to be used in authentication according to the API
    session.accessToken = token?.accessToken;
    session.user = token?.user;
    session.error = token?.error;

    return Promise.resolve(session);
  },
};

export const auth_options: NextAuthOptions = {
  providers,
  callbacks,
  pages: { signIn: "/login", signOut: "*", error: "/" },
  secret: envConfig.jwt.secret,
  jwt: { maxAge:  60 * 60 * 24 * 1 }, //default
};
