import { useState } from "react";
import SubTreads from "../components/Threads/SubThreads";
import ThreadForm from "../components/Threads/ThreadForm";
import Thread from "../components/Threads/Thread";
import { useParams } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
export default function ThreadLayout() {
  const { threadID } = useParams();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleThreadCreated = () => {
    // Increment the trigger to cause a refetch
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="bg-bg-primary border-b border-border">
        <HeaderComponent page="Thread" />
      </div>

      {/* Fixed Original Post within container */}
      <div className="bg-bg-primary border-b border-border max-h-96">
        <Thread threadID={threadID} />
      </div>

      {/* Scrollable Subthreads Area */}
      <div className="flex-1 ">
        <div className="h-full overflow-y-auto">
          <div className="">
            <HeaderComponent page="Replies" />
          </div>
          <div className="pb-4 px-4">
            <SubTreads threadID={threadID} refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>

      {/* Fixed Comment Form at Bottom within container */}
      <div className="sticky bottom-0 bg-bg-primary border-t border-border z-20">
        <div className="max-h-80 overflow-y-auto">
          <h1 className="p-4 font-bold text-lg text-text-primary">Leave a comment</h1>
          <ThreadForm parentID={threadID} onThreadCreated={handleThreadCreated} />
        </div>
      </div>
    </div>
  );
}
