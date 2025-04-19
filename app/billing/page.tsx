"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles, Shield, Zap, Mail, Lock, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function BillingPage() {
  const router = useRouter()
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false)
  const [paymentPeriod, setPaymentPeriod] = useState("monthly")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only run client-side code after component is mounted
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleUpgrade = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setUpgradeDialogOpen(false)

      // Store premium status in localStorage
      localStorage.setItem("userPlan", "premium")

      // Redirect to dashboard
      router.push("/dashboard")
    }, 1500)
  }

  // If not mounted yet (server-side), render a simpler version
  if (!isMounted) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Your Plan</h1>
          <p className="text-muted-foreground">Manage your subscription and payment methods</p>
        </div>
        <div className="h-96 flex items-center justify-center">
          <p>Loading billing page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#cc0000] to-[#0033cc] bg-clip-text text-transparent">
          Your Plan
        </h1>
        <p className="text-muted-foreground">Manage your subscription and payment methods</p>
      </div>

      {/* Animated background */}
      <div className="relative">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#cc0000]/5 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0033cc]/5 blur-3xl"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 relative z-10">
        {/* Free Plan */}
        <Card className="flex flex-col border-2 border-muted relative overflow-hidden group transition-all duration-300 hover:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 transition-opacity duration-300 group-hover:opacity-0"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <CardHeader className="relative z-10">
            <CardTitle>Free</CardTitle>
            <CardDescription>Basic temporary email service</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 relative z-10">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-[#0033cc]" />
                <span>20 inboxes per day</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-[#0033cc]" />
                <span>24-hour inbox lifetime</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-[#0033cc]" />
                <span>Basic inbox management</span>
              </li>
              <li className="flex items-center opacity-50">
                <Check className="mr-2 h-4 w-4" />
                <span>Custom inbox names</span>
              </li>
              <li className="flex items-center opacity-50">
                <Check className="mr-2 h-4 w-4" />
                <span>Lock inboxes</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300" disabled>
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="flex flex-col border-2 border-[#0033cc] relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="absolute -top-4 -right-4 h-16 w-16 bg-[#0033cc] rotate-12 z-0"></div>
          <div className="absolute top-2 right-2 bg-white text-[#0033cc] text-xs font-bold px-2 py-1 rounded-full z-20 flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            POPULAR
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-[#0033cc]/5 transition-opacity duration-300 group-hover:opacity-0"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-[#0033cc]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <CardHeader className="relative z-10">
            <CardTitle>Premium</CardTitle>
            <CardDescription>Advanced features for power users</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">$10</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 relative z-10">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#0033cc]">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Unlimited inboxes</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#0033cc]">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Custom inbox names</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#0033cc]">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Lock inboxes indefinitely</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#0033cc]">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Advanced inbox management</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#0033cc]">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button
              className="w-full bg-gradient-to-r from-[#cc0000] to-[#aa0000] text-white hover:from-[#aa0000] hover:to-[#880000] transition-all duration-300"
              onClick={() => setUpgradeDialogOpen(true)}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Upgrade Now
            </Button>
          </CardFooter>
        </Card>

        {/* Claimed Inbox Plan */}
        <Card className="flex flex-col border-2 border-muted relative overflow-hidden group transition-all duration-300 hover:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 transition-opacity duration-300 group-hover:opacity-0"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <CardHeader className="relative z-10">
            <CardTitle>Claimed Inbox</CardTitle>
            <CardDescription>Reserve your custom email address</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">$1</span>
              <span className="text-muted-foreground">/month per inbox</span>
            </div>
            <p className="mt-1 text-xs text-[#cc0000]">Promotional price, $3/month after</p>
          </CardHeader>
          <CardContent className="flex-1 relative z-10">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-[#0033cc]" />
                <span>Custom email address</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-[#0033cc]" />
                <span>Permanent reservation</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-[#0033cc]" />
                <span>Email forwarding</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-[#0033cc] to-[#002299] text-white hover:from-[#002299] hover:to-[#001166] transition-all duration-300"
            >
              <a href="/claim">Claim Inbox</a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Feature Comparison */}
      <div className="mt-12 rounded-xl border bg-gradient-to-br from-white to-gray-50 p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#cc0000]/5 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0033cc]/5 blur-3xl"></div>

        <h2 className="mb-6 text-xl font-semibold">Feature Comparison</h2>

        <div className="grid grid-cols-4 gap-4 relative z-10">
          <div className="col-span-1"></div>
          <div className="text-center font-medium">Free</div>
          <div className="text-center font-medium text-[#0033cc]">Premium</div>
          <div className="text-center font-medium border-b-2">Claimed</div>

          {[
            { name: "Inboxes per day", icon: Mail, free: "20", premium: "Unlimited", claimed: "1 permanent" },
            { name: "Custom inbox names", icon: Mail, free: "❌", premium: "✓", claimed: "✓" },
            { name: "Lock inboxes", icon: Lock, free: "❌", premium: "✓", claimed: "Always locked" },
            { name: "Inbox lifetime", icon: Clock, free: "24 hours", premium: "24h (lockable)", claimed: "Permanent" },
            { name: "Priority support", icon: Shield, free: "❌", premium: "✓", claimed: "✓" },
          ].map((feature, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2 py-2">
                <feature.icon className="h-4 w-4 text-muted-foreground" />
                <span>{feature.name}</span>
              </div>
              <div className="text-center py-2">{feature.free}</div>
              <div className="text-center py-2 font-medium text-[#0033cc]">{feature.premium}</div>
              <div className="text-center py-2"><span className="text-xs">{feature.claimed}</span></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Payment Methods</h2>
        <Card className="bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-6">
            <p className="text-muted-foreground">No payment methods added yet.</p>
            <Button className="mt-4 bg-gradient-to-r from-[#0033cc] to-[#002299] text-white hover:from-[#002299] hover:to-[#001166] transition-all duration-300">
              <Zap className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Invoice History</h2>
        <Card className="bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-6">
            <p className="text-muted-foreground">No invoices available.</p>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Upgrade to Premium</DialogTitle>
            <DialogDescription>
              Unlock all premium features including custom inbox names and the ability to lock inboxes.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <RadioGroup
              defaultValue="monthly"
              value={paymentPeriod}
              onValueChange={setPaymentPeriod}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                <Label
                  htmlFor="monthly"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-[#0033cc] peer-data-[state=checked]:text-[#0033cc]"
                >
                  <span className="text-sm font-medium">Monthly</span>
                  <span className="text-2xl font-bold">$10</span>
                  <span className="text-xs text-muted-foreground">per month</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
                <Label
                  htmlFor="yearly"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-[#0033cc] peer-data-[state=checked]:text-[#0033cc]"
                >
                  <span className="text-sm font-medium">Yearly</span>
                  <span className="text-2xl font-bold">$100</span>
                  <span className="text-xs text-muted-foreground">per year (save $20)</span>
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="4242 4242 4242 4242" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUpgradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-[#cc0000] to-[#aa0000] text-white hover:from-[#aa0000] hover:to-[#880000]"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay ${paymentPeriod === "monthly" ? "$10" : "$100"}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
