import ThreadsCard from "../Threads/ThreadsCard";
import { getThreadsByUserID } from "../../api/thread.api";
import { useState } from "react";
import AlertMessage from "../UI/AlertMessage";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/states/useProfile";
import { useFetch } from "../../hooks/api/useFetch";
export default function ProfileThreads() {
  const [alert, setAlert] = useState(null);
  const { id: userID } = useParams();
  const user = useProfile();

  const fetchedThreads = useFetch(setAlert, getThreadsByUserID, userID || user?.id);

  // Use fetched threads directly, fallback to empty array
  let threads = fetchedThreads.threads || [];

  return (
    <>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}
      <ThreadsCard threads={threads} allowDelete={true} />
    </>
  );
}
