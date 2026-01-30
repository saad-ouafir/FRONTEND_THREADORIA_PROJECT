import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiBell, FiUser, FiSettings, FiEdit3, FiMoreHorizontal, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import useProfile from "../hooks/states/useProfile";
import { logout } from "../api/auth.api";
import { getFollowRequests } from "../api/follow.api";
import { getUserNotifications } from "../api/notification.api";
import AlertMessage from "./UI/AlertMessage";
import submitHandler from "../handlers/submitHandler";
import { useSelector } from "react-redux";
import { getValidProfilePictureUrl, getUserInitials } from "../utils/profile/profileUtils";

const NavMenu = () => {
  const { t } = useTranslation();
  const [hasNotifications, setHasNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const isAuth = useSelector(state => state.auth.isAuth);
  const userData = useProfile() || {};
  let user = null;
  if (isAuth) {
    user = userData;
  }

  // Fetch notification count on mount and periodically
  useEffect(() => {
    if (!isAuth) return;

    const checkNotifications = async () => {
      try {
        // Check for unread notifications
        const notifResponse = await getUserNotifications();
        const unreadNotifications = notifResponse.unreadCount > 0;

        // Check for pending follow requests (for private accounts)
        const followResponse = await getFollowRequests();
        const pendingRequests = (followResponse.followRequests || []).length > 0;

        setHasNotifications(unreadNotifications || pendingRequests);
      } catch {
        // Silently fail - don't show error for background check
        setHasNotifications(false);
      }
    };

    checkNotifications();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(checkNotifications, 30000);
    return () => clearInterval(interval);
  }, [isAuth]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const onLogout = async () => {
    submitHandler(setAlert, logout, null, navigate, "/");
  };

  return (
    <aside className="bg-bg-secondary border-r border-border/50 h-full flex flex-col">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}
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
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.hasBadge && <span className="w-2 h-2 bg-red-500 rounded-full ml-auto" />}
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
      {user && (
        <div className="p-4 border-t border-border/50 relative" ref={dropdownRef}>
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-bg-tertiary transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center shrink-0">
              {getValidProfilePictureUrl(user.profile_picture_url) ? (
                <img
                  src={getValidProfilePictureUrl(user.profile_picture_url)}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-sm font-semibold">{getUserInitials(user)}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{user.full_name || "Unknown User"}</p>
              <p className="text-xs text-text-muted truncate">{user.username || "user"}</p>
            </div>
            <button
              className="p-1.5 text-text-muted hover:text-text-secondary rounded-lg hover:bg-bg-tertiary transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FiMoreHorizontal className="w-5 h-5" />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute bottom-full left-4 mb-2 w-48 bg-surface border border-border rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={onLogout}
                  className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-bg-tertiary text-red-500 transition-colors flex items-center gap-3"
                >
                  <FiLogOut className="w-4 h-4 text-red-500 font-bold" />
                  {t("navmenu.logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export default NavMenu;
