import { Home, Search, TrendingUp, User, Settings, List, Film, Tv, Star, Play, Mic2, Subtitles, ChevronDown, HelpCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Search", url: "/search", icon: Search },
  { title: "Trending", url: "/trending", icon: TrendingUp },
];

const browseItems = [
  { title: "A-Z List", url: "/az-list", icon: List },
  { title: "Movies", url: "/movies", icon: Film },
  { title: "TV Series", url: "/tv-series", icon: Tv },
  { title: "Most Popular", url: "/most-popular", icon: Star },
  { title: "Subbed", url: "/subbed-anime", icon: Subtitles },
  { title: "Dubbed", url: "/dubbed-anime", icon: Mic2 },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help Center", url: "/contact", icon: HelpCircle },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const [browseOpen, setBrowseOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border/5 bg-sidebar-background"
    >
      <SidebarContent className="bg-sidebar-background">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-border/5">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary">
            <Play className="h-5 w-5 text-primary-foreground fill-current" />
          </div>
          {open && (
            <div className="flex flex-col">
              <span className="text-base font-semibold text-sidebar-foreground">AnimixPlay</span>
            </div>
          )}
        </div>

        {/* Search Bar */}
        {open && (
          <div className="px-4 py-4">
            <NavLink to="/search">
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-sidebar-accent/40 hover:bg-sidebar-accent/60 transition-colors cursor-pointer group">
                <Search className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Search</span>
                <span className="ml-auto text-xs text-muted-foreground">⌘ F</span>
              </div>
            </NavLink>
          </div>
        )}

        {/* Main Menu */}
        <SidebarGroup className="px-2 py-2">
          {open && (
            <div className="px-3 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                Main Menu
              </span>
            </div>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end={item.url === "/"}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          isActive && "scale-110"
                        )} />
                        {open && <span>{item.title}</span>}
                      </>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Browse Section - Collapsible */}
        <Collapsible
          open={browseOpen}
          onOpenChange={setBrowseOpen}
          className="px-2 py-2"
        >
          {open && (
            <div className="px-3 mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full group hover:text-sidebar-foreground transition-colors">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 group-hover:text-muted-foreground/70">
                  Browse
                </span>
                <ChevronDown className={cn(
                  "h-3 w-3 text-muted-foreground/50 transition-transform duration-200",
                  browseOpen && "rotate-180"
                )} />
              </CollapsibleTrigger>
            </div>
          )}
          <CollapsibleContent className="space-y-0.5">
            <SidebarMenu className="space-y-0.5">
              {browseItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all duration-200 group",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className={cn(
                          "h-4 w-4 transition-all duration-200",
                          isActive && "text-primary"
                        )} />
                        {open && <span>{item.title}</span>}
                      </>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>

        {/* Settings Section - Collapsible */}
        <Collapsible
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          className="px-2 py-2 mt-auto"
        >
          {open && (
            <div className="px-3 mb-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full group hover:text-sidebar-foreground transition-colors">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 group-hover:text-muted-foreground/70">
                  Settings
                </span>
                <ChevronDown className={cn(
                  "h-3 w-3 text-muted-foreground/50 transition-transform duration-200",
                  settingsOpen && "rotate-180"
                )} />
              </CollapsibleTrigger>
            </div>
          )}
          <CollapsibleContent className="space-y-0.5">
            <SidebarMenu className="space-y-0.5">
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all duration-200 group",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className={cn(
                          "h-4 w-4 transition-all duration-200",
                          isActive && "text-primary"
                        )} />
                        {open && <span>{item.title}</span>}
                      </>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>

        {/* Profile Section */}
        <div className="px-2 py-4 border-t border-border/5 mt-2">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )
            }
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20">
              <User className="h-4 w-4 text-primary" />
            </div>
            {open && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Profile</p>
              </div>
            )}
          </NavLink>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
