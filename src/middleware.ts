import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/shared/lib/auth";

export async function middleware(request: NextRequest) {
  // const session = await auth();
  // const isAuthRoute = request.nextUrl.pathname.startsWith("/dashboard");
  //
  // if (isAuthRoute && !session) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }
  //
  // return NextResponse.next();
}
