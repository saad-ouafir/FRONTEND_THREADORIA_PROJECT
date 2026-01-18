import { suggestThreads } from "../../api/thread.api";
import ThreadsCard from "./ThreadsCard";
import { useEffect, useState } from "react";

export default function SuggestedThreads() {
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    async function fetchThreads() {
      try {
        const response = await suggestThreads(null, null);
        setThreads(response.threads);
      } catch (error) {
        console.error(error);
      }
    }
    fetchThreads();
  }, []);
  return (
    <>
      <ThreadsCard threads={threads} />
    </>
  );
}
