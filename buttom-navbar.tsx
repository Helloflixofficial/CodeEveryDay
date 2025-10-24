import { Home, Search, TrendingUp, User, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: TrendingUp, label: "Trending", path: "/trending" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-background/90 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/70 border-t border-border/20 shadow-2xl">
        <div className="flex items-center justify-around px-2 pb-safe pt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group relative",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className={cn(
                    "relative flex items-center justify-center transition-all duration-300",
                    isActive && "scale-110"
                  )}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 w-8 h-0.5 rounded-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
