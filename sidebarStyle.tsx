import { Home, Search, TrendingUp, User, Settings, List, Film, Tv, Star, Play, Mic2, Subtitles } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
      className="border-none bg-sidebar-background/50 backdrop-blur-2xl"
    >
      <SidebarContent className="py-4 px-2">
        {/* Minimalist Logo Section */}
        <div className="px-3 pb-4 mb-2 border-b border-border/5">
          {open ? (
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/70 transition-all duration-200 group-hover:scale-105">
                <Play className="h-4 w-4 text-primary-foreground fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-foreground">AnimixPlay</span>
                <span className="text-[10px] text-muted-foreground/60">Stream Anime</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center cursor-pointer group">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/70 transition-all duration-200 group-hover:scale-105">
                <Play className="h-4 w-4 text-primary-foreground fill-current" />
              </div>
            </div>
          )}
        </div>

        {/* Main Navigation - Ultra Clean Minimalist */}
        <SidebarGroup className="px-0">
          {open && (
            <SidebarGroupLabel className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
              Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={cn(
                            "h-[18px] w-[18px] transition-all duration-200",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )} />
                          {open && <span className="text-[13px]">{item.title}</span>}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Browse Section - Ultra Clean Minimalist */}
        <SidebarGroup className="px-0 mt-6">
          {open && (
            <SidebarGroupLabel className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
              Browse
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {browseItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={cn(
                            "h-[18px] w-[18px] transition-all duration-200",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )} />
                          {open && <span className="text-[13px]">{item.title}</span>}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Section - Ultra Clean Minimalist */}
        <SidebarGroup className="px-0 mt-6">
          {open && (
            <SidebarGroupLabel className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
              Account
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={cn(
                            "h-[18px] w-[18px] transition-all duration-200",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )} />
                          {open && <span className="text-[13px]">{item.title}</span>}
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
