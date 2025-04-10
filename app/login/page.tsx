"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // No validation, just proceed to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="container flex flex-col items-center justify-center py-12 md:py-24">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Image src="/images/logo.png" alt="FemiliKite Logo" width={60} height={60} className="h-16 w-auto" />
          <h1 className="text-2xl font-bold">Login to FemiliKite.online</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-[#cc0000] text-white hover:bg-[#aa0000]">
            Login
          </Button>
        </form>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/dashboard" className="text-[#0033cc] hover:underline">
            Create Free Inbox
          </Link>
        </div>
      </div>
    </div>
  )
}
