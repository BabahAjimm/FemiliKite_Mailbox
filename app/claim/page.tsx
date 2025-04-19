"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle2, Mail, Shield, Sparkles } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ClaimInboxPage() {
  const router = useRouter()
  const [inboxName, setInboxName] = useState("")
  const [checkResult, setCheckResult] = useState<null | "available" | "taken">(null)
  const [enableGmail, setEnableGmail] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [subscriptionPeriod, setSubscriptionPeriod] = useState("monthly")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only run client-side code after component is mounted
  useEffect(() => {
    setIsMounted(true)
  }, [])
  useEffect(() => {setCheckResult(null)}, [inboxName])

  const handleCheckAvailability = () => {
    if (!inboxName) return

    // Simulate checking availability - randomly available or taken
    const isAvailable = Math.random() > 0.3
    setCheckResult(isAvailable ? "available" : "taken")
  }

  const handleClaimInbox = () => {
    setPaymentDialogOpen(true)
  }

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentDialogOpen(false)

      // Store the claimed inbox in localStorage
      const claimedInboxes = JSON.parse(localStorage.getItem("claimedInboxes") || "[]");

      // Calculate claimedUntil date based on subscriptionPeriod
      const now = new Date();
      let claimedUntilDate: Date;
      if (subscriptionPeriod === "monthly") {
        claimedUntilDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
      } else { // yearly
        claimedUntilDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
      }
      const claimedUntil = claimedUntilDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

      claimedInboxes.push({
        name: `${inboxName}@femilikite.online`,
        claimedUntil: claimedUntil,
        enableGmail: enableGmail,
        subscriptionPeriod: subscriptionPeriod,
      })
      localStorage.setItem("claimedInboxes", JSON.stringify(claimedInboxes))

      // Redirect to dashboard
      router.push("/dashboard")
    }, 1500)
  }

  // If not mounted yet (server-side), render a simpler version
  if (!isMounted) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Claim Your Inbox</h1>
          <p className="text-muted-foreground">Reserve a custom email address that's uniquely yours</p>
        </div>
        <div className="h-96 flex items-center justify-center">
          <p>Loading claim page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#cc0000] to-[#0033cc] bg-clip-text text-transparent">
            Claim Your Inbox
          </h1>
          <p className="text-muted-foreground">Reserve a custom email address that's uniquely yours</p>
        </div>

        {/* Animated background */}
        <div className="relative rounded-xl border bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm mb-8 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#cc0000]/5 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0033cc]/5 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#cc0000]/20 to-[#cc0000]/10">
                <Mail className="h-5 w-5 text-[#cc0000]" />
              </div>
              <div>
                <h2 className="font-medium">Permanent Email Address</h2>
                <p className="text-sm text-muted-foreground">Claim your own custom inbox that never expires</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inbox-name" className="font-medium">
                  Enter your desired inbox name
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="inbox-name"
                    value={inboxName}
                    onChange={(e) => setInboxName(e.target.value)}
                    placeholder="e.g. yourname"
                    className="flex-1 border-2 focus:border-[#0033cc] transition-colors"
                  />
                  <span className="text-muted-foreground">@femilikite.online</span>
                </div>
              </div>

              <Button
                onClick={handleCheckAvailability}
                className="bg-gradient-to-r from-[#0033cc] to-[#002299] text-white hover:from-[#002299] hover:to-[#001166] transition-all duration-300 w-full"
                disabled={!inboxName}
              >
                Check Availability
              </Button>
            </div>
          </div>
        </div>

        {checkResult === "available" && (
          <Alert className="border-green-500 bg-gradient-to-r from-green-50 to-white mb-6 animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Available!
            </AlertTitle>
            <AlertDescription className="mt-2">
              <p className="mb-2">
                <strong>{inboxName}@femilikite.online</strong> is available for you to claim.
              </p>
              <Button
                className="mt-2 bg-gradient-to-r from-[#cc0000] to-[#aa0000] text-white hover:from-[#aa0000] hover:to-[#880000] transition-all duration-300"
                onClick={handleClaimInbox}
              >
                <Shield className="mr-2 h-4 w-4" />
                Claim Now – $1/month
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {checkResult === "taken" && (
          <Alert className="border-[#cc0000] bg-gradient-to-r from-red-50 to-white mb-6 animate-fadeIn">
            <AlertCircle className="h-4 w-4 text-[#cc0000]" />
            <AlertTitle className="text-[#cc0000]">Already Taken</AlertTitle>
            <AlertDescription>
              Sorry, <strong>{inboxName}@femilikite.online</strong> is already claimed. Please try another name.
            </AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg border bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#cc0000]/5 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#0033cc]/5 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#cc0000]" />
                  Enable Gmail Login (Google SSO)
                </h3>
                <p className="text-sm text-muted-foreground">Use your claimed inbox with Google SSO authentication</p>
              </div>
              <Switch
                checked={enableGmail}
                onCheckedChange={setEnableGmail}
                className="data-[state=checked]:bg-[#cc0000]"
              />
            </div>

            {enableGmail && (
              <div className="mt-4 rounded-md bg-gradient-to-r from-[#f8f9fa] to-[#f1f3f5] p-4">
                <p className="font-medium text-[#cc0000] flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  ${subscriptionPeriod === "monthly" ? "8/month" : "80/year"} additional
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  This feature allows you to use your custom inbox with Google services and adds an extra layer of
                  security.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Claim {inboxName}@femilikite.online</DialogTitle>
            <DialogDescription>Choose your subscription period and payment details.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <RadioGroup
              defaultValue="monthly"
              value={subscriptionPeriod}
              onValueChange={setSubscriptionPeriod}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="monthly" id="monthly-claim" className="peer sr-only" />
                <Label
                  htmlFor="monthly-claim"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-[#0033cc] peer-data-[state=checked]:text-[#0033cc]"
                >
                  <span className="text-sm font-medium">Monthly</span>
                  <span className="text-2xl font-bold">$1</span>
                  <span className="text-xs text-muted-foreground">per month</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem value="yearly" id="yearly-claim" className="peer sr-only" />
                <Label
                  htmlFor="yearly-claim"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-[#0033cc] peer-data-[state=checked]:text-[#0033cc]"
                >
                  <span className="text-sm font-medium">Yearly</span>
                  <span className="text-2xl font-bold">$10</span>
                  <span className="text-xs text-muted-foreground">per year (save $2)</span>
                </Label>
              </div>
            </RadioGroup>

            {enableGmail && (
              <div className="rounded-md bg-gradient-to-r from-[#f8f9fa] to-[#f1f3f5] p-4">
                <p className="text-sm font-medium flex items-center gap-1">
                  <Shield className="h-4 w-4 text-[#cc0000]" />
                  Gmail Login (Google SSO)
                </p>
                <p className="text-xs text-muted-foreground">
                  Additional ${subscriptionPeriod === "monthly" ? "8/month" : "80/year"}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="card-number-claim">Card Number</Label>
              <Input id="card-number-claim" placeholder="4242 4242 4242 4242" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-claim">Expiry Date</Label>
                <Input id="expiry-claim" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc-claim">CVC</Label>
                <Input id="cvc-claim" placeholder="123" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              className="bg-gradient-to-r from-[#cc0000] to-[#aa0000] text-white hover:from-[#aa0000] hover:to-[#880000] transition-all duration-300"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay ${calculateTotal()}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  function calculateTotal() {
    let base = subscriptionPeriod === "monthly" ? 1 : 10
     if (enableGmail) {
      base += subscriptionPeriod === "monthly" ? 8 : 80
    }
    return `$${base}`
  }
}
