import HeaderComponent from "../components/HeaderComponent";
import SuggestedThreads from "../components/Threads/SuggestedThreads";
import ThreadForm from "../components/Threads/ThreadForm";
import { useState } from "react";
import useProfile from "../hooks/states/useProfile";

export default function HomeLayout() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const currentUser = useProfile();

  const handleThreadCreated = () => {
    // Increment the trigger to cause a refetch
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <HeaderComponent page="Home" />
      {currentUser && <ThreadForm onThreadCreated={handleThreadCreated} />}
      <SuggestedThreads refreshTrigger={refreshTrigger} />
    </div>
  );
}
