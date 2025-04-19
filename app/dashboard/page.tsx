"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, Lock, Trash2, Plus, Clock, Check, AlertCircle, Sparkles, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DialogClose } from "@radix-ui/react-dialog"

// Types for our inboxes
type InboxType = "temporary" | "claimed"
type InboxStatus = "active" | "locked" | "expired"

interface Inbox {
  id: number
  name: string
  expiresIn: string
  type: InboxType
  status: InboxStatus
  claimedUntil?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [inboxes, setInboxes] = useState<Inbox[]>([])
  const [userPlan, setUserPlan] = useState<"free" | "premium">("free")
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [customInboxName, setCustomInboxName] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [errorMessage, setErrorMessage] = useState("")
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [transferDialogOpen, setTransferDialogOpen] = useState(false)
  const [newOwnerEmail, setNewOwnerEmail] = useState("")
  const [transferInbox, setTransferInbox] = useState<Inbox | null>(null)
  const [transferError, setTransferError] = useState<string | null>(null);

  // Only run client-side code after component is mounted
  useEffect(() => {
    setIsMounted(true)

    // Load claimed inboxes from localStorage
    const claimedInboxesData = localStorage.getItem("claimedInboxes")
    const claimedInboxes: Inbox[] = claimedInboxesData ? JSON.parse(claimedInboxesData) : []

    // Load user's plan from localStorage
    const plan = localStorage.getItem("userPlan")
    if (plan === "premium") {
      setUserPlan("premium")
    }

    // Load temporary inboxes (mock data, can be replaced with API call)
    const temporaryInboxes: Inbox[] = [
      { id: 1, name: "random123@femilikite.online", expiresIn: "22h 15m", type: "temporary", status: "active" },
      { id: 2, name: "shopping542@femilikite.online", expiresIn: "10h 45m", type: "temporary", status: "active" },
      { id: 3, name: "newsletter87@femilikite.online", expiresIn: "5h 30m", type: "temporary", status: "active" },
    ]

    // Combine claimed and temporary inboxes
    setInboxes([
      ...claimedInboxes.map((item) => ({ ...item, type: "claimed", id: Date.now() })),
      ...temporaryInboxes,
    ])

    if (plan !== "premium") {

     // Show upgrade prompt after 2 seconds for free users
      const timer = setTimeout(() => {
        setShowUpgradePrompt(true)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setShowUpgradePrompt(false)
    }
  }, [])

  const handleDelete = (id: number) => {
    // Remove from localStorage if it's a claimed inbox
     const claimedInboxes = JSON.parse(localStorage.getItem("claimedInboxes") || "[]")
     localStorage.setItem("claimedInboxes", JSON.stringify(claimedInboxes.filter((inbox:any) => inbox.id !== id)))
     setInboxes(inboxes.filter((inbox) => inbox.id !== id));
  };

  const handleLock = (id: number) => {
    if (userPlan === "free") {
      alert("Locking inboxes is a premium feature. Please upgrade to premium.")
      return
    }

    setInboxes((prevInboxes) => {
      return prevInboxes.map((inbox) => {
        if (inbox.id === id) {
          const newStatus = inbox.status === "locked" ? "active" : "locked";
          const newExpiresIn = newStatus === "locked" ? "Locked - No expiration" : "24h 00m";
          return { ...inbox, status: newStatus, expiresIn: newExpiresIn };
        } else {
          return inbox;
        }
      });
    }
    )
  }
  const handleRefresh = (id: number) => {
    console.log("Refresh ", id)
  }


  const handleTransferOwnership = (inbox: Inbox) => {
    if(userPlan !== "premium"){
      alert("Transfer inbox is a premium feature. Please upgrade to premium.")
      return
    }
    setTransferInbox(inbox)
    setTransferDialogOpen(true);
  }
  const handleTransfer = () => {
    if (!isValidEmail(newOwnerEmail)) {
      setTransferError("Invalid email address");
      return;
    }
    if (inboxes.some((inbox) => inbox.name === `${newOwnerEmail}`)) {
      setTransferError("This email is already taken");
      return;
    }
    // Add here the logic to transfer
    console.log("transfer ", newOwnerEmail)
    setTransferDialogOpen(false);
    setTransferError(null)
    setNewOwnerEmail("")
  };

  const handleCreateInbox = () => {
    if (userPlan === "free") {
      // Generate a random inbox name for free users
      const randomString = Math.random().toString(36).substring(2, 8)
      const newInbox = {
        id: Date.now(),
        name: `${randomString}@femilikite.online`,
        expiresIn: "24h 00m",
        type: "temporary" as InboxType,
        status: "active" as InboxStatus,
      }

      setInboxes([...inboxes, newInbox])
      setCreateDialogOpen(false)
    } else {
      // For premium users, check if they entered a custom name
      if (!customInboxName) {
        setErrorMessage("Please enter a custom inbox name")
        return
      }

      // Check if the name already exists
      if (inboxes.some((inbox) => inbox.name === `${customInboxName}@femilikite.online`)) {
        setErrorMessage("This inbox name is already taken")
        return
      }

      const newInbox = {
        id: Date.now(),
        name: `${customInboxName}@femilikite.online`,
        expiresIn: "24h 00m",
        type: "temporary" as InboxType,
        status: "active" as InboxStatus,
      }

      setInboxes([...inboxes, newInbox])
      setCustomInboxName("")
      setErrorMessage("")
      setCreateDialogOpen(false)
    }
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Filter inboxes based on active tab
  const filteredInboxes =
    activeTab === "all"
      ? inboxes
      : activeTab === "temporary"
      ? inboxes.filter((inbox) => inbox.type === "temporary")
      : inboxes.filter((inbox) => inbox.type === "claimed")

  // If not mounted yet (server-side), render a simpler version
  if (!isMounted) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your temporary inboxes</p>
        </div>
        <div className="h-96 flex items-center justify-center">
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Dashboard Header with Animated Background */}
      <div className="relative mb-8 rounded-xl bg-gradient-to-r from-[#f8f9fa] to-[#f1f3f5] p-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#cc0000]/5 blur-xl"></div>
          <div className="absolute bottom-0 left-1/4 h-24 w-24 rounded-full bg-[#0033cc]/5 blur-xl"></div>
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#cc0000] to-[#0033cc] bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground">Manage your temporary inboxes</p>
          </div>
          <Badge
            className={
              userPlan === "premium"
                ? "bg-gradient-to-r from-[#cc0000] to-[#aa0000]"
                : "bg-gradient-to-r from-[#0033cc] to-[#002299]"
            }
          >
            {userPlan === "premium" ? (
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>Premium</span>
              </div>
            ) : (
              "Free Tier"
            )}
          </Badge>
        </div>
      </div>

      {/* Upgrade Prompt for Free Users */}
      {userPlan === "free" && showUpgradePrompt && (
        <div className="mb-6 rounded-lg border border-[#0033cc]/20 bg-gradient-to-r from-[#f8f9fa] to-[#f1f3f5] p-4 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-center opacity-5"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0033cc]/20">
              <Sparkles className="h-5 w-5 text-[#0033cc]" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-[#0033cc]">Upgrade to Premium</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Unlock custom inbox names, inbox locking, and unlimited inboxes with our premium plan.
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-[#0033cc] to-[#002299] text-white hover:from-[#002299] hover:to-[#001166]"
                >
                  <a href="/billing">View Plans</a>
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowUpgradePrompt(false)}>
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-gradient-to-r from-[#f8f9fa] to-[#f1f3f5] p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            All Inboxes
          </TabsTrigger>
          <TabsTrigger value="temporary" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Temporary
          </TabsTrigger>
          <TabsTrigger value="claimed" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Claimed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your Inboxes</h2>
          <p className="text-sm text-muted-foreground">
            You have {filteredInboxes.length} {activeTab !== "all" ? activeTab : ""} inboxes
          </p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="bg-gradient-to-r from-[#cc0000] to-[#aa0000] text-white hover:from-[#aa0000] hover:to-[#880000] transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Inbox
        </Button>
      </div>

      {filteredInboxes.length === 0 ? (
        <Card className="p-8 text-center border border-dashed">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No inboxes found</h3>
          <p className="text-sm text-muted-foreground">
            {activeTab === "claimed"
              ? "You haven't claimed any permanent inboxes yet."
              : "Create your first inbox to get started."}
          </p>
          {activeTab === "claimed" && (
            <Button
              asChild
              className="mt-4 bg-gradient-to-r from-[#0033cc] to-[#002299] text-white hover:from-[#002299] hover:to-[#001166]"
            >
              <a href="/claim">Claim an Inbox</a>
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredInboxes.map((inbox) => (
            <Card
              onClick={() => {
               router.push(`/dashboard/inbox/${encodeURIComponent(inbox.name)}`) }}
              key={inbox.id}
              className={`group transition-all duration-300 hover:shadow-md ${inbox.status === "locked"
                ? "border-[#0033cc] bg-gradient-to-br from-white to-[#0033cc]/5"
                : inbox.type === "claimed"
                ? "border-[#cc0000] bg-gradient-to-br from-white to-[#cc0000]/5"
                : "hover:-translate-y-1"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">
                    {inbox.name.split("@")[0]}
                    <span className="text-muted-foreground">@femilikite.online</span>
                  </CardTitle>
                  {inbox.status === "locked" && (
                    <Badge className="bg-gradient-to-r from-[#0033cc] to-[#002299]">
                      <Lock className="mr-1 h-3 w-3" />
                      Locked
                    </Badge>
                  )}
                  {inbox.type === "claimed" && (
                    <Badge className="bg-gradient-to-r from-[#cc0000] to-[#aa0000]">
                      <Shield className="mr-1 h-3 w-3" />
                      Claimed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {inbox.type === "claimed" ? (
                    <div className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Paid until: {inbox.claimedUntil}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-[#cc0000]" />
                      <span>
                      {inbox.expiresIn}                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                {inbox.type === "temporary" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:border-[#0033cc] group-hover:text-[#0033cc] transition-colors duration-300" onClick={(event) => {event.stopPropagation();handleRefresh(inbox.id)}}
                    >
                      <RefreshCw className="mr-1 h-4 w-4" />
                      Refresh
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm" onClick={() => handleLock(inbox.id)}                            
                              disabled={userPlan === "free"}
                              className={
                                inbox.status === "locked"
                                  ? "border-[#0033cc] text-[#0033cc] hover:bg-[#0033cc]/10"
                                  : "group-hover:border-[#cc0000] group-hover:text-[#cc0000] transition-colors duration-300"
                              }
                            >
                            <Lock className="mr-1 h-4 w-4" />
                            {inbox.status === "locked" ? "Unlock" : "Lock"}
                          </Button>
                        </TooltipTrigger>
                        {userPlan === "free" && (
                          <TooltipContent className="bg-[#0033cc] text-white">
                            <p>Premium feature</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(event) => {event.stopPropagation();handleTransferOwnership(inbox)}}
                  className={`text-[#0033cc] hover:bg-[#0033cc]/10 hover:border-[#0033cc] transition-colors duration-300 ${inbox.type !== "claimed" ? "hidden" : ""} `}
                >
                  <Shield className="mr-1 h-4 w-4" />
                  Transfer Ownership
                </Button>


                <Button
                
                  
                  size="sm" onClick={(event) => {event.stopPropagation(); handleDelete(inbox.id)}}
                  className="text-white bg-[#cc0000] hover:bg-[#cc0000]/10 hover:text-[#cc0000] z-[10]"
                 
                >
                  <Trash2 className="mr-1 h-4 w-4" />Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Create Inbox Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Inbox</DialogTitle>
            <DialogDescription>
              {userPlan === "premium"
                ? "Create a custom inbox with your preferred name."
                : "A random inbox name will be generated for you."}
            </DialogDescription>
          </DialogHeader>

          {userPlan === "premium" && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="inbox-name">Custom Inbox Name</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="inbox-name"
                    value={customInboxName}
                    onChange={(e) => {
                      setCustomInboxName(e.target.value)
                      setErrorMessage("")
                    }}
                    placeholder="e.g. yourname"
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">@femilikite.online</span>
                </div>
                {errorMessage && <p className="text-sm text-[#cc0000]">{errorMessage}</p>}
              </div>
              <p className="text-xs text-muted-foreground">
                Note: Custom inboxes still expire after 24 hours unless locked.
              </p>
            </div>
          )}

          {userPlan === "free" && (
            <div className="py-4">
              <p className="text-sm">
                As a free user, you'll get a randomly generated inbox name that expires after 24 hours.
              </p>
              <div className="mt-4 rounded-md bg-gradient-to-r from-[#f8f9fa] to-[#f1f3f5] p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#cc0000]" />
                  <p className="text-sm font-medium">Want custom inbox names?</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Upgrade to Premium to create custom inbox names and lock them indefinitely.
                </p>
                <Button
                  asChild
                  className="mt-2 bg-gradient-to-r from-[#cc0000] to-[#aa0000] text-white hover:from-[#aa0000] hover:to-[#880000]"
                  size="sm"
                >
                  <a href="/billing">Upgrade Now</a>
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCreateDialogOpen(false)
                setCustomInboxName("")
                setErrorMessage("")
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateInbox}
              className="bg-gradient-to-r from-[#0033cc] to-[#002299] text-white hover:from-[#002299] hover:to-[#001166]"
            >
              Create Inbox
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

         {/* Transfer Dialog */}
         <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transfer Ownership</DialogTitle>
            <DialogDescription>Enter the new owner's email address</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">New owner's email</Label>
              <Input
                id="email"
                placeholder="New owner's email"
                type="email"
                value={newOwnerEmail}
                onChange={(e) => {setNewOwnerEmail(e.target.value)
                setTransferError(null)}}
              />
              {transferError && <p className="text-sm text-[#cc0000]">{transferError}</p>}
            </div>
          </div>
          <DialogFooter>
          <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleTransfer}
              disabled={!isValidEmail(newOwnerEmail)}
              className="bg-gradient-to-r from-[#0033cc] to-[#002299] text-white hover:from-[#002299] hover:to-[#001166]"
            >
              Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

