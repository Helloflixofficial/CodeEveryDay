import { Home, Search, TrendingUp, User, Settings, List, Film, Tv, Star, Play, Mic2, Subtitles } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigationItems = [
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

const accountItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border/10 bg-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30"
    >
      <SidebarContent className="py-6 px-3">
        {/* Modern Logo Section with glassmorphism */}
        <div className="px-2 pb-6 mb-4">
          {open ? (
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 shadow-lg shadow-primary/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-105">
                <Play className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground tracking-tight">AnimixPlay</span>
                <span className="text-xs text-muted-foreground">Stream Anime</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center cursor-pointer group">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 shadow-lg shadow-primary/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-105">
                <Play className="h-5 w-5 text-primary-foreground fill-current" />
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-0 mb-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[15px] font-medium transition-all duration-300 group relative overflow-hidden",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className={cn(
                            "flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300",
                            isActive 
                              ? "bg-primary-foreground/15" 
                              : "bg-accent/40 group-hover:bg-accent/60"
                          )}>
                            <item.icon className={cn(
                              "h-5 w-5 transition-all duration-300",
                              isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                            )} />
                          </div>
                          {open && (
                            <span className={cn(
                              "transition-all duration-300",
                              isActive ? "text-primary-foreground" : ""
                            )}>
                              {item.title}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Browse Section */}
        <SidebarGroup className="px-0 mb-6">
          {open && (
            <div className="px-4 pb-3 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                Browse
              </span>
            </div>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {browseItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[14px] transition-all duration-300 group",
                          isActive
                            ? "bg-accent text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={cn(
                            "h-[18px] w-[18px] transition-all duration-300",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          )} />
                          {open && <span>{item.title}</span>}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup className="px-0 mt-auto">
          {open && (
            <div className="px-4 pb-3 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                Account
              </span>
            </div>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[14px] transition-all duration-300 group",
                          isActive
                            ? "bg-accent text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={cn(
                            "h-[18px] w-[18px] transition-all duration-300",
                            isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          )} />
                          {open && <span>{item.title}</span>}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
