import type { Metadata } from "next"
import "./globals.css"
import "swiper/css"
import "swiper/css/pagination"
import Header from "@components/Header"
import Footer from "@components/Footer"

export const metadata: Metadata = {
  title: "Wals Foundation",
  description: "Wals foundation here",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
