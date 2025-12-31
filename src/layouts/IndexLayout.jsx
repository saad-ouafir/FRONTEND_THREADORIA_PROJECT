import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function IndexLayout() {
  return (
    <div className="min-h-screen bg-bg-surface">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
