import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { connectToDB } from "@/utils/ConnectDB";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        connectToDB();
        // Add logic here to look up the user from the credentials supplied
        console.log("credentials", credentials);
        console.log("req", req.body);
        let res = await axios.post("/api/Login", req.body);
        let { UserName, _id, account_type } = res.data.user;
        const user = {
          id: _id,
          name: UserName,
          account_type: account_type,
        };
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/Login",
    signOut: "/Login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return "/Dashboard";
    },
  },
});

export { handler as GET, handler as POST };
