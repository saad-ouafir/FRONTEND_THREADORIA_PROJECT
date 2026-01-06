import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

export default function HeaderComponent({ page }) {
  const { user } = useContext(AuthContext);
  
  return (
    <header className="p-4 border-b border-border bg-bg-secondary">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg text-text-primary">{page}</h1>
      </div>
    </header>
  );
}
