import "./globals.css"
import "swiper/css"
import "swiper/css/pagination"
import Page from "@/src/page/ui/Page";
import ReduxProvider from "@/src/logic/store/ReduxProvider";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wals Foundation – Empowering Communities, Transforming Lives",
  description:
    "Wals Foundation is a nonprofit organization dedicated to uplifting underserved communities through education, healthcare, and sustainable development initiatives.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-background max-w-[1440px] mx-auto">
        <ReduxProvider>
          <Page>
            {children}
          </Page>
        </ReduxProvider>
      </body>
    </html>
  )
}