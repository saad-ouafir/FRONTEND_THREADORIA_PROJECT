import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import Navbar from "../components/Navbar";
import RightBarLayout from "./RightBarLayout";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
          <NavMenu />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 border-x border-border">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 shrink-0 sticky top-16 h-[calc(100vh-4rem)] p-4">
          {/* Trending, suggestions, etc. can go here */}
          <RightBarLayout />
        </aside>
      </div>
    </div>
  );
}
