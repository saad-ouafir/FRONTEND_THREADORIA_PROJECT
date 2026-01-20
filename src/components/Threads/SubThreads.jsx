import { getSubThreads } from "../../api/thread.api";
import { useEffect, useState } from "react";
import ThreadsCard from "./ThreadsCard";
import AlertMessage from "../UI/AlertMessage";

export default function SubTreads({ threadID, refreshTrigger }) {
  const [thread, setThread] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    async function fetchThread() {
      try {
        const response = await getSubThreads(threadID);
        setThread(response.threads);
      } catch (error) {
        setAlert("");
        setAlert({ message: error.message || "Failed to fetch thread", statusCode: error.status || 500 });
        console.error(error);
      }
    }
    fetchThread();
  }, [threadID, refreshTrigger]);

  return (
    <div>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}
      <ThreadsCard threads={thread} message="No Comments for the moment !" />
    </div>
  );
}
