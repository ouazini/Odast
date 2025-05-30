"use client";

import React from "react";
import "@/styles/globals.css";
import useLenis from "@/hooks/Lenis";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children, session }) {
  useLenis();

  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
