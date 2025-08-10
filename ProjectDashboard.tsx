"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Clock, Users, MoreHorizontal, Eye } from "lucide-react"

const kpiData = [
  {
    title: "Payrolls Cost",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    subtitle: "from last month",
    icon: DollarSign,
  },
  {
    title: "Total Expense",
    value: "$12,234.56",
    change: "+4.3%",
    trend: "up",
    subtitle: "from last month",
    icon: CreditCard,
  },
  {
    title: "Pending Payments",
    value: "$8,945.23",
    change: "-2.1%",
    trend: "down",
    subtitle: "from last month",
    icon: Clock,
  },
  {
    title: "Total Payrolls",
    value: "2,350",
    change: "+12.5%",
    trend: "up",
    subtitle: "from last month",
    icon: Users,
  },
]

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
  { month: "Jul", sales: 7000 },
  { month: "Aug", sales: 6500 },
  { month: "Sep", sales: 8000 },
  { month: "Oct", sales: 7500 },
  { month: "Nov", sales: 9000 },
  { month: "Dec", sales: 8500 },
]

const emailData = [
  { month: "Jan", clickThrough: 2.4, openRate: 18.2 },
  { month: "Feb", clickThrough: 2.8, openRate: 19.1 },
  { month: "Mar", clickThrough: 3.2, openRate: 20.5 },
  { month: "Apr", clickThrough: 2.9, openRate: 18.8 },
  { month: "May", clickThrough: 3.5, openRate: 21.2 },
  { month: "Jun", clickThrough: 3.8, openRate: 22.1 },
]

const teamData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@company.com",
    role: "Product Manager",
    department: "Product",
    status: "Active",
  },
  { id: 3, name: "Mike Johnson", email: "mike@company.com", role: "Designer", department: "Design", status: "Active" },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@company.com",
    role: "Marketing Manager",
    department: "Marketing",
    status: "On Leave",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@company.com",
    role: "Sales Representative",
    department: "Sales",
    status: "Active",
  },
]

export function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-foreground">{kpi.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>{kpi.change}</span>
                  <span className="text-muted-foreground">{kpi.subtitle}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Sales Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Monthly sales data for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Email Metrics Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Email Metrics</CardTitle>
            <CardDescription>Click through rate and open rate trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emailData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clickThrough"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="Click Through Rate"
                  />
                  <Line
                    type="monotone"
                    dataKey="openRate"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Open Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Directory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Directory</CardTitle>
          <CardDescription>Overview of all team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden lg:table-cell">Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamData.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder-icon.png?height=32&width=32&text=${member.name.charAt(0)}`}
                        />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <span className="font-medium block truncate">{member.name}</span>
                        <span className="text-sm text-muted-foreground sm:hidden block truncate">{member.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden sm:table-cell">{member.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{member.role}</TableCell>
                    <TableCell className="hidden lg:table-cell">{member.department}</TableCell>
                    <TableCell>
                      <Badge
                        variant={member.status === "Active" ? "default" : "secondary"}
                        className={
                          member.status === "Active" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""
                        }
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
