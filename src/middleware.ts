import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./constants/Enums";
import { envConfig } from "./helpers/config/envConfig";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session: any = await getToken({ req: request, secret: envConfig.jwt.secret });

 
  const role = session?.user?.role;

  // roles
  const isManager = role === UserRole.manager;
  const isUser = role === UserRole.user;


  const managerAuthRoutes = session && !isManager && pathname.startsWith("/manager-dashboard");
  const userAuthRoutes = session && !isUser && pathname.startsWith("/dashboard");


  if (!session || managerAuthRoutes || userAuthRoutes) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

 
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// all routes except /api, /_next/static, /_next/image, /favicon.ico, /_next/data, /_next/server-side-rendering, /_next/webpack-hmr, /img , /login

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|_next/data|_next/server-side-rendering|_next/webpack-hmr|img|login).*)"],
};
