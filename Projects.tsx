"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Plus, Calendar, DollarSign, Users, Clock } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

const statsData = [
  {
    title: "Total Projects",
    value: "24",
    change: "+12%",
    icon: Clock,
  },
  {
    title: "Active Projects",
    value: "18",
    change: "+8%",
    icon: Clock,
  },
  {
    title: "Completed",
    value: "156",
    change: "+23%",
    icon: Clock,
  },
  {
    title: "On Hold",
    value: "3",
    change: "-2%",
    icon: Clock,
  },
]

const projectsData = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design and improved UX",
    status: "In Progress",
    priority: "High",
    progress: 75,
    dueDate: new Date("2024-02-15"),
    budget: 50000,
    spent: 37500,
    team: [
      { name: "John Doe", avatar: "JD" },
      { name: "Jane Smith", avatar: "JS" },
      { name: "Mike Johnson", avatar: "MJ" },
    ],
    members: 8,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms",
    status: "Planning",
    priority: "Medium",
    progress: 25,
    dueDate: new Date("2024-04-30"),
    budget: 80000,
    spent: 20000,
    team: [
      { name: "Sarah Wilson", avatar: "SW" },
      { name: "David Brown", avatar: "DB" },
    ],
    members: 5,
  },
  {
    id: 3,
    name: "CRM Integration",
    description: "Integrate new CRM system with existing tools and workflows",
    status: "Completed",
    priority: "High",
    progress: 100,
    dueDate: new Date("2024-01-20"),
    budget: 30000,
    spent: 28500,
    team: [
      { name: "Alex Chen", avatar: "AC" },
      { name: "Lisa Wang", avatar: "LW" },
      { name: "Tom Wilson", avatar: "TW" },
    ],
    members: 6,
  },
  {
    id: 4,
    name: "Marketing Campaign",
    description: "Q1 marketing campaign launch across multiple channels",
    status: "On Hold",
    priority: "Low",
    progress: 10,
    dueDate: new Date("2024-03-01"),
    budget: 25000,
    spent: 2500,
    team: [{ name: "Emma Davis", avatar: "ED" }],
    members: 3,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    case "In Progress":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    case "Planning":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    case "On Hold":
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    default:
      return ""
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "border-red-500 text-red-500"
    case "Medium":
      return "border-yellow-500 text-yellow-500"
    case "Low":
      return "border-green-500 text-green-500"
    default:
      return ""
  }
}

export function Projects() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Header with Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-10 bg-muted border-border" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projectsData.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  <Badge variant="outline" className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due {formatDate(project.dueDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>
                    {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                  </span>
                </div>
              </div>

              {/* Team and Members */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={`/placeholder-icon.png?height=32&width=32&text=${member.avatar}`} />
                        <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">+{project.team.length - 3}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{project.members} members</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
