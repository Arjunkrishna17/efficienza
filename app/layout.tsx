import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

import AuthProvider from "./auth/provider";
import Header from "./components/Common/Header";
import { Suspense } from "react";
import Loading from "./loading";
import { Providers } from "./providers";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Efficienza",
  description:
    "Efficienza is software development analysis software for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          poppins.className +
          " flex flex-col w-full h-screen bg-gradient-to-r from-gray-100 to-gray-200"
        }
      >
        <Header />

        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
