import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import NavigationBar from "../components/nav";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "My App",
  description: "Next.js 15 + FastAPI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <NavigationBar />
        <main>{children}</main>
      </body>
    </html>
  )
}