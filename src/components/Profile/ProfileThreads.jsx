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

  const fetchedThreads = useFetch(
    setAlert,
    getThreadsByUserID,
    window.location.pathname === "/profile" ? user?.id : userID,
  );

  let threads = fetchedThreads.threads;

  return (
    <>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}
      <ThreadsCard threads={threads} allowDelete={true} />
    </>
  );
}
