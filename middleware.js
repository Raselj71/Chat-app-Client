import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  console.log(request.nextUrl.pathname);

  const loginUserNotAccess =
    request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/signup";

  if (loginUserNotAccess) {
    if (token) {
      return NextResponse.redirect(new URL("/dashbord", request.url));
    } else {
      if (!token) {
        if (
          request.nextUrl.pathname === "/" ||
          request.nextUrl.pathname === "/signup"
        ) {
          return;
        }

        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }
}

export const config = {
  matcher: ["/", "/signup", "/dashbord", "/dashbord/:path*"],
};
