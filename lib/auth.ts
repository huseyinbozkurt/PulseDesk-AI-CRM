import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const googleClientId = process.env.AUTH_GOOGLE_ID?.trim();
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET?.trim();

export const googleAuthConfigured = Boolean(googleClientId && googleClientSecret);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  providers: googleAuthConfigured
    ? [
        GoogleProvider({
          clientId: googleClientId as string,
          clientSecret: googleClientSecret as string
        })
      ]
    : [],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/"
  }
};
