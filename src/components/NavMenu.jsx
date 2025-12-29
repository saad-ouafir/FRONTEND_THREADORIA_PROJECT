import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FiHome,
  FiBell,
  FiUser,
  FiSettings,
  FiEdit3,
  FiMoreHorizontal,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

const NavMenu = () => {
  const { t } = useTranslation();
  const [hasNotifications] = useState(true);

  const navItems = [
    {
      icon: FiHome,
      label: t("navmenu.home"),
      href: "/home",
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
    {
      icon: FiSettings,
      label: t("navmenu.settings"),
      href: "/settings",
    },
  ];

  const user = {
    name: "Jane Doe",
    username: "@janedesign",
    avatar: null,
  };

  return (
    <aside className="bg-bg-secondary border-r border-border/50 h-full flex flex-col">
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.href}
                end={item.href === "/app"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                  }`
                }>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.hasBadge && (
                  <span className="w-2 h-2 bg-red-500 rounded-full ml-auto" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* New Thread Button */}
        <div className="mt-6">
          <button className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <FiEdit3 className="w-5 h-5" />
            <span>{t("navmenu.new_thread")}</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-bg-tertiary transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center shrink-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-sm font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {user.name}
            </p>
            <p className="text-xs text-text-muted truncate">{user.username}</p>
          </div>
          <button className="p-1.5 text-text-muted hover:text-text-secondary rounded-lg hover:bg-bg-tertiary transition-colors">
            <FiMoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default NavMenu;
