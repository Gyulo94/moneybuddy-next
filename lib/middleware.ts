import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("middleware token", token);

  const { pathname } = req.nextUrl;

  // 접근을 허용할 경로 목록
  const allowedPaths = ["/", "/login", "/register", "/verification"];

  // 경로가 허용된 목록에 포함되어 있는지 확인
  const isAllowedPath = allowedPaths.some((path) => pathname.startsWith(path));

  // 토큰이 없거나 이메일이 확인되지 않은 경우
  if (!token || !token.user.isEmailVerified) {
    if (!isAllowedPath) {
      // 인증되지 않은 사용자는 로그인 페이지로 리디렉션
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 요청을 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
