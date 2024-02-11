import { createUser, findUserById } from "../../_dal/userDal";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export interface userDetails {
  name: string;
  email: string;
  userId: string;
  image: string;
  accessToken: string;
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          scope:
            "read:user user:email repo repo:status public_repo read:org repo_deployment admin:repo_hook read:discussion",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const userData = {
        name: user.name as string,
        email: user.email as string,
        userId: user.id as string,
        image: user.image as string,
        accessToken: account?.access_token,
      };

      //This will replace the userInfo if already exists.
      await createUser(userData);

      return true;
    },
  },
});

export { handler as GET, handler as POST };
