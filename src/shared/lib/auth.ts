import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { getSession, useSession } from "next-auth/react"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "read:user user:email repo admin:repo_hook workflow",
        },
      },
    }),
  ],
})

export { getSession, useSession }