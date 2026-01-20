import { getThreadById } from "../../api/thread.api";
import { useEffect, useState } from "react";
import ThreadsCard from "./ThreadsCard";
import AlertMessage from "../UI/AlertMessage";

export default function Tread({ threadID }) {
  const [thread, setThread] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    async function fetchThread() {
      try {
        const response = await getThreadById(threadID);
        setThread([response.thread]);
        console.log(thread);
      } catch (error) {
        setAlert("");
        setAlert({ message: error.message || "Failed to fetch thread", statusCode: error.status || 500 });
        console.error(error);
      }
    }
    fetchThread();
  }, [threadID]);

  return (
    <div>
      <ThreadsCard threads={thread} />
    </div>
  );
}
