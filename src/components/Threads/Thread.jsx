import { getThreadById } from "../../api/thread.api";
import { useState } from "react";
import ThreadsCard from "./ThreadsCard";
import AlertMessage from "../UI/AlertMessage";
import { useFetch } from "../../hooks/api/useFetch";

// Separate component for fetching a single thread by ID
function ThreadFetcher({ threadID, allowDelete, message }) {
  const [alert, setAlert] = useState(null);
  const fetchedThread = useFetch(setAlert, getThreadById, threadID);
  const displayThreads = fetchedThread.thread ? [fetchedThread.thread] : [];

  return (
    <div>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}
      <ThreadsCard threads={displayThreads} allowDelete={allowDelete} message={message} />
    </div>
  );
}

export default function Thread({ threadID, threads, allowDelete = false, message }) {
  // If threads array is provided, render directly without fetching
  if (threads && Array.isArray(threads)) {
    return (
      <div>
        <ThreadsCard threads={threads} allowDelete={allowDelete} message={message} />
      </div>
    );
  }

  // If threadID is provided, use the fetcher component
  if (threadID) {
    return <ThreadFetcher threadID={threadID} allowDelete={allowDelete} message={message} />;
  }

  // Fallback: render empty threads
  return (
    <div>
      <ThreadsCard threads={[]} allowDelete={allowDelete} message={message} />
    </div>
  );
}
