import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import Navbar from "../components/Navbar";
import RightBarLayout from "./RightBarLayout";
import { BottomNavBar, MobileDrawer } from "../components/Mobile";
import useMobileNavigation from "../hooks/ui/useMobileNavigation";

export default function MainLayout() {
  const { isDrawerOpen, openDrawer, closeDrawer } = useMobileNavigation();

  return (
    <div className="h-screen bg-bg-surface flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block w-64 shrink-0 h-full overflow-y-auto">
          <NavMenu />
        </aside>

        {/* Main Content - Takes full height and scrolls */}
        <main className="flex-1 min-w-0 h-full border-x border-border overflow-y-auto pb-16 lg:pb-0">
          <Outlet />
        </main>

        {/* Right Sidebar - Hidden on mobile, shown on lg+ with responsive width */}
        <aside className="hidden lg:block lg:w-64 xl:w-80 shrink-0 h-full overflow-y-auto p-4">
          <RightBarLayout />
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavBar onMenuClick={openDrawer} />

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
}
