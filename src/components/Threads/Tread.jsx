import { getThreadById } from "../../api/thread.api";
import { useState } from "react";
import ThreadsCard from "./ThreadsCard";
import AlertMessage from "../UI/AlertMessage";
import { useFetch } from "../../hooks/api/useFetch";

export default function Thread({ threadID }) {
  const [alert, setAlert] = useState(null);

  let displayThread = [];

  const fetchedThread = useFetch(setAlert, getThreadById, threadID);
  displayThread = fetchedThread.thread ? [fetchedThread.thread] : [];

  return (
    <div>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}
      <ThreadsCard threads={displayThread} />
    </div>
  );
}
