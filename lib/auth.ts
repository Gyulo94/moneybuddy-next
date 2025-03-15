import { getServerSession, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { SERVER_URL } from "./constants";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(`${SERVER_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        authorization: `Refresh ${token.serverTokens.refresh_token}`,
      },
    });

    console.log("refrershed");

    const response = await res.json();

    return {
      ...token,
      serverTokens: response,
    };
  } catch (error) {
    console.error("Failed to refresh token", error);
    return { ...token, error: "RefreshToken Error" };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        const res = await fetch(`${SERVER_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (res.status === 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      async profile(profile) {
        const user = {
          id: profile.id,
          name: profile.properties.nickname,
          email: profile.kakao_account.email,
          image: profile.properties.profile_image,
        };

        const response = await fetch(`${SERVER_URL}/auth/kakao-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const result = await response.json();
        result.id = user.id;
        return result;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      async profile(profile) {
        const user = {
          id: Number(profile.sub),
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };

        const response = await fetch(`${SERVER_URL}/auth/google-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const result = await response.json();
        result.id = user.id;
        return result;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.serverTokens.expiresIn) return token;
      if (trigger === "update" && session !== null) {
        const { name, image, role, isEmailVerified, verifyToken } = session;
        token.user.name = name;
        token.user.role = role;
        token.user.image = image;
        token.user.isEmailVerified = isEmailVerified;
        token.user.verifyToken = verifyToken;
      }

      return await refreshToken(token);
    },

    async session({ session, token }) {
      session.user = token.user;
      session.serverTokens = token.serverTokens;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: "money-buddy.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
} satisfies NextAuthOptions;

export const auth = () => getServerSession(authOptions);
