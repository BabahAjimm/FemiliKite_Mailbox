import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { UserProvider } from "@/components/user-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FemiliKite.online - Temporary Email Service",
  description: "Create disposable inboxes in seconds with FemiliKite.online",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <UserProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-center text-sm text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} FemiliKite.online. All rights reserved.
                  </p>
                  <div className="flex gap-4 text-sm text-[#0033cc]">
                    <a href="#" className="hover:underline">
                      Privacy
                    </a>
                    <span>|</span>
                    <a href="#" className="hover:underline">
                      Terms
                    </a>
                    <span>|</span>
                    <a href="#" className="hover:underline">
                      Contact
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'