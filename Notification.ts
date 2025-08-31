"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Mail, Calendar, User, AlertTriangle, Eye, Check } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"

const statsData = [
  {
    title: "Unread",
    value: "23",
    icon: Bell,
  },
  {
    title: "Read",
    value: "156",
    icon: Check,
  },
  {
    title: "High Priority",
    value: "5",
    icon: AlertTriangle,
  },
  {
    title: "Total",
    value: "179",
    icon: Bell,
  },
]

const notifications = [
  {
    id: 1,
    type: "message",
    icon: Mail,
    title: "New message from John Doe",
    description: "Regarding the project timeline and deliverables",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unread: true,
    priority: false,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    type: "calendar",
    icon: Calendar,
    title: "Meeting reminder",
    description: "Team standup in 15 minutes",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unread: true,
    priority: true,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: 3,
    type: "system",
    icon: AlertTriangle,
    title: "System maintenance scheduled",
    description: "Scheduled maintenance on Sunday at 2:00 AM",
    time: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    unread: false,
    priority: true,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: 4,
    type: "user",
    icon: User,
    title: "New team member joined",
    description: "Sarah Wilson has joined the Marketing team",
    time: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    unread: true,
    priority: false,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: 5,
    type: "alert",
    icon: AlertTriangle,
    title: "Budget threshold exceeded",
    description: "Project Alpha has exceeded 90% of allocated budget",
    time: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    unread: false,
    priority: true,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: 6,
    type: "message",
    icon: Mail,
    title: "Invoice payment received",
    description: "Payment for invoice INV-001 has been processed",
    time: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    unread: false,
    priority: false,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 7,
    type: "calendar",
    icon: Calendar,
    title: "Project deadline approaching",
    description: "Website Redesign project due in 3 days",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: false,
    priority: true,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: 8,
    type: "user",
    icon: User,
    title: "Leave request submitted",
    description: "Mike Johnson submitted a leave request for next week",
    time: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
    unread: false,
    priority: false,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

export function Notifications() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with the latest activities</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = notification.icon
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                    notification.unread ? "bg-muted/30 border-border" : "border-border"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                    <Icon className={`h-4 w-4 ${notification.color}`} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`font-medium ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {notification.priority && (
                          <Badge variant="destructive" className="text-xs">
                            High
                          </Badge>
                        )}
                        {notification.unread && <div className="h-2 w-2 bg-blue-500 rounded-full" />}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{notification.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{formatRelativeTime(notification.time)}</span>
                      <div className="flex gap-2">
                        {notification.unread && (
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Mark as read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
