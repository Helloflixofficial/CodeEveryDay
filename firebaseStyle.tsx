"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Home,
  Flame,
  Users,
  Puzzle,
  Server,
  ChevronDown,
  ChevronUp,
  Settings,
  ExternalLink,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NavItem {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

interface CollapsibleSection {
  title: string
  items?: NavItem[]
}

const projectShortcuts: NavItem[] = [
  { title: "Authentication", icon: Users, href: "/auth" },
  { title: "Extensions", icon: Puzzle, href: "/extensions" },
  { title: "App Hosting", icon: Server, href: "/hosting" },
]

const productCategories: CollapsibleSection[] = [
  { title: "Build" },
  { title: "Run" },
  { title: "Analytics" },
  { title: "AI" },
]

export function FirebaseSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Project Overview")
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]))
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 flex flex-col bg-[#1a1a1a] text-white transition-transform duration-300 w-[280px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header - Firebase Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-800">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-orange-500 to-amber-600">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-xl">Firebase</span>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <div className="px-3 py-4 space-y-6">
            {/* Project Overview Button */}
            <button
              onClick={() => {
                setActiveItem("Project Overview")
                setIsMobileOpen(false)
              }}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                activeItem === "Project Overview"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-600/90 text-white hover:bg-blue-600",
              )}
            >
              <Home className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1 text-left">Project Overview</span>
              <Settings className="h-5 w-5 flex-shrink-0" />
            </button>

            {/* Project Shortcuts */}
            <div>
              <h3 className="mb-3 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Project shortcuts
              </h3>
              <div className="space-y-1">
                {projectShortcuts.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.title
                  return (
                    <button
                      key={item.title}
                      onClick={() => {
                        setActiveItem(item.title)
                        setIsMobileOpen(false)
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal transition-colors",
                        isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800/50",
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="mb-3 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Product categories
              </h3>
              <div className="space-y-1">
                {productCategories.map((section) => {
                  const isExpanded = expandedSections.includes(section.title)
                  return (
                    <div key={section.title}>
                      <button
                        onClick={() => toggleSection(section.title)}
                        className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-normal text-white hover:bg-gray-800/50 transition-colors"
                      >
                        <span>{section.title}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      {isExpanded && section.items && (
                        <div className="ml-3 mt-1 space-y-1">
                          {section.items.map((item) => {
                            const Icon = item.icon
                            return (
                              <button
                                key={item.title}
                                onClick={() => {
                                  setActiveItem(item.title)
                                  setIsMobileOpen(false)
                                }}
                                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
                              >
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                <span className="flex-1 text-left">{item.title}</span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Related Development Tools */}
            <div>
              <h3 className="mb-3 px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Related development tools
              </h3>
              <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal text-blue-400 hover:bg-gray-800/50 transition-colors">
                <Flame className="h-5 w-5 flex-shrink-0" />
                <span className="flex-1 text-left">Firebase Studio</span>
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
              </button>
            </div>
          </div>
        </ScrollArea>

        {/* Footer - Pricing Section */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-white">Spark</div>
              <div className="text-xs text-gray-400">No-cost ($0/month)</div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800 rounded-md transition-colors">
              Upgrade
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-600 text-white rounded">NEW</span>
            </button>
          </div>
          <button className="w-full flex items-center justify-center py-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </aside>
    </>
  )
}
