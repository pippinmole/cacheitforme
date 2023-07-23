import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID  as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  callbacks: {
    async jwt({ user, token }) {
      // console.log("JWT: User: " + JSON.stringify(user));
      // console.log("JWT: User ID: " + user?.id);

      return token;
    },
    async session({ session, token, user }) {
      // console.log("Session: User: " + JSON.stringify(user));
      // console.log("Session: User ID: " + user?.id);

      if(session) {
        // @ts-ignore
        session.user.id = user.id as string;
      }

      return session;
    },
  }
};