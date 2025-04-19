"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
interface Email {
  id: number;
  sender: string;
  subject: string;
  timestamp: string;
  content: string;
}

export default function InboxPage() {

  const mockEmails: Email[] = [
    {
      id: 1,
      sender: "noreply@example.com",
      subject: "Welcome to Our Service!",
      timestamp: "2 hours ago",
      content:
        "Dear User,\n\nThank you for joining our service. We're excited to have you on board!\n\nBest regards,\nThe Example Team",
    },
    {
      id: 2,
      sender: "support@company.net",
      subject: "Regarding Your Recent Inquiry",
      timestamp: "3 hours ago",
      content:
        "Hello,\n\nWe've received your inquiry and are working to address it. We will get back to you within 24 hours.\n\nSincerely,\nThe Support Team",
    },
    {
      id: 3,
      sender: "alerts@notifications.io",
      subject: "New Notification Received",
      timestamp: "5 hours ago",
      content:
        "Hi there,\n\nYou have a new notification in your account. Please log in to view more details.\n\nThanks,\nThe Notifications Team",
    },
    {
      id: 4, sender: "noreply@example.com", subject: "Action Required: Update Your Password", timestamp: "1 day ago", content: "Dear User, We've detected suspicious activity on your account. For your safety, please update your password immediately. Best regards, The Example Team"
    },
    { id: 5, sender: "marketing@company.net", subject: "Special Offer Just For You!", timestamp: "3 days ago", content: "Hello! We're excited to share a special offer just for you. Click here to learn more and save big! The Marketing Team" },
  ];

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const { inboxName } = useParams();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Button variant="outline" onClick={handleBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>
        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#cc0000] to-[#0033cc] bg-clip-text text-transparent">
            {decodeURIComponent(inboxName as string)}
        </h1>
      <div className="flex gap-4 h-[calc(100vh-200px)]">
        {/* Email List */}
        <div className="w-1/3 border-r">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {mockEmails.map((email) => (
                <Card
                    key={email.id}
                    className={`cursor-pointer rounded-lg border bg-gradient-to-br from-white to-gray-50 shadow-sm ${
                        selectedEmail?.id === email.id
                            ? "bg-gray-100 border-2 border-blue-500"
                            : ""
                    }`}
                    onClick={() => setSelectedEmail(email)}
                >
                  <CardHeader className="p-2">
                    <CardTitle className="text-sm">{email.sender}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 text-sm">
                    {email.subject}
                  </CardContent>

                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
          {/* Email Content Viewer */}
          <div className="w-2/3 p-4">
              {selectedEmail ? (
                  <Card className="rounded-lg shadow-sm border">
                      <CardContent className="p-4">
                          <h2 className="text-xl font-semibold mb-2">
                              {selectedEmail.subject}
                          </h2>
                          <p className="mb-4 text-[#0033cc]">
                              From: {selectedEmail.sender} - {selectedEmail.timestamp}
                          </p>
                          <p>{selectedEmail.content}</p>
                      </CardContent>
                  </Card>
            ) : (
            <p>Select an email to view its content.</p>
          )}
          </div>
        </div>
    </div>
  );
}