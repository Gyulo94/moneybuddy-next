import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image: string;
      isEmailVerified: boolean;
      verifyToken: string;
    };

    serverTokens: {
      access_token: string;
      refresh_token: string;
      expiresIn: number;
    };
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image: string;
      isEmailVerified: boolean;
      verifyToken: string;
    };

    serverTokens: {
      access_token: string;
      refresh_token: string;
      expiresIn: number;
    };
  }
}
