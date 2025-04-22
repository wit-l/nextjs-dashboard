import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, method } }) {
      const isLoggedIn = !!auth?.user;
      // console.log(`auth:${JSON.stringify(auth)}, method:${method}`);
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        // When access route '/dashboard'
        if (isLoggedIn) {
          return true; // If logged in, allow access
        }
        // If not logged in, redirect to login page
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Redirect to "/dashboard" if logged in and not on dashboard
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }

      // If not logged in and not on dashboard, allow access
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
