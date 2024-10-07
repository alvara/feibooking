import NextAuth from 'next-auth';
import { siteURL } from 'src/data/siteURL';
import CredentialsProvider from 'next-auth/providers/credentials';

// Add this type declaration
declare module 'next-auth' {
  interface User {
    accessToken?: string;
  }
}

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    error: siteURL.login.main,
  },
  providers: [
    CredentialsProvider({
      id: 'payload-credentials',
      name: 'Payload Credentials',
      type: 'credentials',
      credentials: {
        username: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize() {
        //
        // credentials
        //
        try {
          // const res = await swaggerClient.account.accountLoginCreate({
          //   requestBody: {
          //     email: credentials?.username ?? '',
          //     password: credentials?.password ?? '',
          //   },
          // });
          const res = {
            user: {
              pk: 1,
              email: 'test@example.com',
            },
            access: 'test-access-token',
          };

          return {
            id: res.user.pk.toString(),
            email: res.user.email,
            accessToken: res.access,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Add the accessToken to the JWT token so its available in the session callback
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
        };
      }

      return token;
    },

    // Add accessToken (from the JWT callback earlier) to the user object for client access
    async session({
      session,
      // token
    }) {
      if (!session.user) return session;

      // session.user.accessToken = token.accessToken;
      return session;
    },
  },
});
