import "./globals.css"
import "swiper/css"
import "swiper/css/pagination"
import Page from "@/app/page/Page";
import ReduxProvider from "@/logic/store/ReduxProvider";
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
            <body>
                <ReduxProvider>
                    <Page children={children} />
                </ReduxProvider>
            </body>
        </html>
    )
}