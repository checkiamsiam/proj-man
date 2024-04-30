interface EnvConfig {
  siteUrl: string;
  backendUrl ?: string;
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export const envConfig: EnvConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
  siteUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000",
};
