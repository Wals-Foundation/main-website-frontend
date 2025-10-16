import "./globals.css"
import "swiper/css"
import "swiper/css/pagination"
import Page from "@/src/page/ui/Page";
import ReduxProvider from "@/src/logic/store/ReduxProvider";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turn your care for others into lasting change",
  description:
    "We built a platform that combines your contribution with others to fund community projects that create lasting access to education, healthcare, and economic opportunity. Every contribution is tracked in real-time, so you see where your money goes.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dark-theme="dark">
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