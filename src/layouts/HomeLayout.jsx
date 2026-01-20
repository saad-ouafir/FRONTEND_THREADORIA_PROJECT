import HeaderComponent from "../components/HeaderComponent";
import SuggestedThreads from "../components/Threads/SuggestedThreads";
import ThreadForm from "../components/Threads/ThreadForm";
import { useState } from "react";

export default function HomeLayout() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleThreadCreated = () => {
    // Increment the trigger to cause a refetch
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <HeaderComponent page="Home" />
      <ThreadForm onThreadCreated={handleThreadCreated} />
      <SuggestedThreads refreshTrigger={refreshTrigger} />
    </div>
  );
}
