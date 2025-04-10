"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserPlan = "free" | "premium"

interface UserContextType {
  userPlan: UserPlan
  setUserPlan: (plan: UserPlan) => void
  claimedInboxes: any[]
  addClaimedInbox: (inbox: any) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userPlan, setUserPlan] = useState<UserPlan>("free")
  const [claimedInboxes, setClaimedInboxes] = useState<any[]>([])

  useEffect(() => {
    // Check localStorage for user plan
    const storedPlan = localStorage.getItem("userPlan")
    if (storedPlan === "premium") {
      setUserPlan("premium")
    }

    // Check localStorage for claimed inboxes
    const storedInboxes = localStorage.getItem("claimedInboxes")
    if (storedInboxes) {
      setClaimedInboxes(JSON.parse(storedInboxes))
    }
  }, [])

  const addClaimedInbox = (inbox: any) => {
    const updatedInboxes = [...claimedInboxes, inbox]
    setClaimedInboxes(updatedInboxes)
    localStorage.setItem("claimedInboxes", JSON.stringify(updatedInboxes))
  }

  return (
    <UserContext.Provider value={{ userPlan, setUserPlan, claimedInboxes, addClaimedInbox }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
