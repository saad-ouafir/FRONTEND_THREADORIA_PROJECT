import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import Navbar from "../components/Navbar";
import RightBarLayout from "./RightBarLayout";

export default function MainLayout() {
  return (
    <div className="h-screen bg-bg-surface flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 h-full overflow-y-auto">
          <NavMenu />
        </aside>

        {/* Main Content - Takes full height and scrolls */}
        <main className="flex-1 min-w-0 h-full border-x border-border overflow-y-auto">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 shrink-0 h-full overflow-y-auto p-4">
          <RightBarLayout />
        </aside>
      </div>
    </div>
  );
}
