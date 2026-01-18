import ThreadsCard from "../Threads/ThreadsCard";
import { getThreadsByUserID } from "../../api/thread.api";
import { useEffect, useState } from "react";
import AlertMessage from "../UI/AlertMessage";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/states/useProfile";

export default function ProfileThreads() {
  const [threads, setThreads] = useState([]);
  const [alert, setAlert] = useState(null);
  const { id: userID } = useParams();
  const user = useProfile();
  useEffect(() => {
    async function fetchThreas() {
      const targetUserId = userID || user?.id;
      if (!targetUserId) return;
      try {
        setAlert(null);
        const response = await getThreadsByUserID(targetUserId);
        setThreads(response.threads);
        setAlert({ message: response.message, statusCode: response.status });
      } catch (err) {
        setAlert(null);
        setAlert({ message: err.message || "Unexpected error ! Please contact us", statusCode: err.status || 500 });
        console.log(err);
      }
    }
    fetchThreas();
  }, [user?.id, userID]);
  return (
    <>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}
      <ThreadsCard threads={threads} allowDelete={true} />
    </>
  );
}
