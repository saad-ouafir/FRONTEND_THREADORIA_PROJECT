import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiX, FiSettings, FiLogOut, FiSearch, FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import useThemeHandler from "../../hooks/ui/useThemeHandler";
import languageHandler from "../../handlers/languageHandler";

const MobileDrawer = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme, mounted } = useThemeHandler();
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Focus trap inside drawer when open
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const firstFocusable = drawerRef.current.querySelector("button, a");
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [isOpen]);

  // Mock user data - replace with actual auth context
  const user = {
    name: "Jane Doe",
    username: "@janedesign",
    avatar: null,
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/auth/login");
    onClose();
  };

  const menuItems = [
    {
      icon: FiSearch,
      label: t("rightbar.search") || "Search",
      href: "/search",
    },
    {
      icon: FiSettings,
      label: t("navmenu.settings"),
      href: "/settings",
    },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        ref={drawerRef}
        className={`lg:hidden fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-bg-secondary border-l border-border/50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile menu"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <h2 className="text-lg font-semibold text-text-primary">{t("navmenu.menu") || "Menu"}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
              aria-label="Close menu"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-accent to-purple-500 flex items-center justify-center shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-white text-base font-semibold">
                    {user.name
                      .split(" ")
                      .map(n => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary truncate">{user.name}</p>
                <p className="text-sm text-text-muted truncate">{user.username}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.href}
                    onClick={onClose}
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
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Appearance Section */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <h3 className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                {t("settings.appearance") || "Appearance"}
              </h3>
              <ul className="space-y-1">
                {/* Theme Toggle */}
                <li>
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                  >
                    {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                    <span>
                      {isDark ? t("settings.light_mode") || "Light Mode" : t("settings.dark_mode") || "Dark Mode"}
                    </span>
                  </button>
                </li>
                {/* Language Toggle */}
                <li>
                  <button
                    onClick={() => {
                      languageHandler();
                    }}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FiGlobe className="w-5 h-5" />
                      <span>{t("settings.language") || "Language"}</span>
                    </div>
                    <span className="text-sm font-medium text-text-muted">{i18n.language.toUpperCase()}</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-border/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="font-medium">{t("navmenu.logout")}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileDrawer;
