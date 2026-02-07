import { NavLink, useLocation } from "react-router-dom";
import { FiHome, FiBell, FiPlus, FiUser, FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const BottomNavBar = ({ hasNotifications = true }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    {
      icon: FiHome,
      label: t("navmenu.home"),
      href: "/home",
    },
    {
      icon: FiSearch,
      label: t("rightbar.search") || "Search",
      href: "/search",
    },
    {
      icon: FiPlus,
      label: t("navmenu.new_thread"),
      href: "/new-thread",
      isAction: true,
    },
    {
      icon: FiBell,
      label: t("navmenu.notifications"),
      href: "/notifications",
      hasBadge: hasNotifications,
    },
    {
      icon: FiUser,
      label: t("navmenu.profile"),
      href: "/profile",
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary/95 backdrop-blur-lg border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");

          // Special styling for the "New Thread" action button
          if (item.isAction) {
            return (
              <NavLink
                key={index}
                to={item.href}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-accent hover:bg-accent-hover text-white shadow-lg transition-all duration-200 active:scale-95"
                aria-label={item.label}
              >
                <item.icon className="w-6 h-6" />
              </NavLink>
            );
          }

          // Regular nav items
          return (
            <NavLink
              key={index}
              to={item.href}
              className={`relative flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg transition-colors ${
                isActive ? "text-accent" : "text-text-muted hover:text-text-primary"
              }`}
              aria-label={item.label}
            >
              <div className="relative">
                <item.icon className="w-6 h-6" />
                {item.hasBadge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-bg-secondary" />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;
