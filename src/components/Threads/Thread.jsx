import { getThreadById } from "../../api/thread.api";
import { useState } from "react";
import ThreadsCard from "./ThreadsCard";
import AlertMessage from "../UI/AlertMessage";
import { useFetch } from "../../hooks/api/useFetch";

export default function Thread({ threadID, threads, allowDelete = false, message }) {
  const [alert, setAlert] = useState(null);

  let displayThreads = [];

  if (threads && Array.isArray(threads)) {
    displayThreads = threads;
  } else if (threadID) {
    const fetchedThread = useFetch(setAlert, getThreadById, threadID);
    displayThreads = fetchedThread.thread ? [fetchedThread.thread] : [];
  }

  return (
    <div>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}
      <ThreadsCard threads={displayThreads} allowDelete={allowDelete} message={message} />
    </div>
  );
}
