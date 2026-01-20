import { useEffect, useState } from "react";
import SubTreads from "../components/Threads/SubThreads";
import ThreadForm from "../components/Threads/ThreadForm";
import Tread from "../components/Threads/Tread";
import { useParams } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
export default function ThreadLayout() {
  const { threadID } = useParams();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    console.log(threadID);
  });

  const handleThreadCreated = () => {
    // Increment the trigger to cause a refetch
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-max">
      {/* Fixed Header */}
      <div className="shrink-0">
        <HeaderComponent page="Thread" />
      </div>
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Main Thread - Fixed at top of scrollable area */}
        <div className="shrink-0">
          <Tread threadID={threadID} />
        </div>

        {/* Subthreads - Scrollable */}
        <div className="flex-1 overflow-y-auto mt-4">
          <h1 className="px-4 font-bold text-lg mb-3 text-text-primary">Replies</h1>
          <SubTreads threadID={threadID} refreshTrigger={refreshTrigger} />
        </div>
      </div>

      {/* Fixed Comment Form at Bottom */}
      <div className="shrink-0 border-t border-border bg-bg-primary">
        <div className="p-4">
          <h1 className="font-bold text-lg mb-3 text-text-primary">Leave a comment</h1>
          <ThreadForm parentID={threadID} onThreadCreated={handleThreadCreated} />
        </div>
      </div>
    </div>
  );
}
