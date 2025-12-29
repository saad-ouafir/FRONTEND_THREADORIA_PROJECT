import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function IndexLayout() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
