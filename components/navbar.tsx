"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isLoggedIn = pathname !== "/" && pathname !== "/login"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="FemiliKite Logo" width={40} height={40} className="h-10 w-auto" />
          <span className="hidden font-bold sm:inline-block">FemiliKite.online</span>
        </Link>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <nav className={`${isMenuOpen ? "absolute inset-x-0 top-16 border-b bg-background p-4" : "hidden"} md:block`}>
          <ul className={`flex ${isMenuOpen ? "flex-col gap-4" : "items-center gap-6"}`}>
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className={`text-sm font-medium ${pathname === "/dashboard" ? "text-[#cc0000]" : "text-[#0033cc] hover:text-[#cc0000]"}`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/billing"
                    className={`text-sm font-medium ${pathname === "/billing" ? "text-[#cc0000]" : "text-[#0033cc] hover:text-[#cc0000]"}`}
                  >
                    Billing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/claim"
                    className={`text-sm font-medium ${pathname === "/claim" ? "text-[#cc0000]" : "text-[#0033cc] hover:text-[#cc0000]"}`}
                  >
                    Claim Inbox
                  </Link>
                </li>
                <li>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000] hover:text-white"
                  >
                    <Link href="/">Logout</Link>
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Button asChild className="bg-[#cc0000] text-white hover:bg-[#aa0000]">
                  <Link href="/login">Login</Link>
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
