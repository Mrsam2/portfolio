import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "XdpSam - Cosmic Portfolio",
  description:
    "Interactive galaxy portfolio showcasing full-stack development projects and skills by Saurabh Wankhede (XdpSam)",
  icons: {
    icon: "/profile-image.jpg", // Use the user's profile image as the favicon
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
