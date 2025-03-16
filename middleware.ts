import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "money-buddy.session-token",
  });

  // console.log("middleware token ", token);

  const { pathname } = request.nextUrl;

  // 접근을 허용할 경로 목록
  const publicPaths = ["/login", "/register"];

  // 경로가 허용된 목록에 포함되어 있는지 확인
  const isPublicPath =
    publicPaths.some((path) => pathname.startsWith(path)) || pathname === "/";

  // 토큰이 없는 경우
  if (!token) {
    if (!isPublicPath) {
      // 토큰이 없는 경우 로그인 페이지로 리디렉션
      // console.log("No token found");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // 토큰이 있는 경우 이메일이 확인되지 않은 경우
    if (token.user && token.user.isEmailVerified === false) {
      const notVerifiedPaths = ["/verification"];
      const isNotVerifiedPath = notVerifiedPaths.some(
        (path) => pathname.startsWith(path) || pathname === "/"
      );
      if (!isNotVerifiedPath) {
        // 이메일이 확인되지 않은 경우 인증 페이지로 리디렉션
        // console.log("Email not verified");
        return NextResponse.redirect(new URL("/verification", request.url));
      }
    }
  }

  // 요청을 계속 진행
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
