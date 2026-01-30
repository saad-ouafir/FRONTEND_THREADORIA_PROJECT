import { useState } from "react";

// Api Hook and Handlers
import { acceptFollowRequest, followUser, getFollowRequests, rejectFollowRequest } from "../../api/follow.api";
import { useFetch } from "../../hooks/api/useFetch";
import submitHandler from "../../handlers/submitHandler";

// UI components
import AlertMessage from "../UI/AlertMessage";
import FollowersCard from "./FollowersCard";

export default function FollowsNotifications() {
  const [alert, setAlert] = useState("");

  // fetch follow requests
  const frFetchResponse = useFetch(setAlert, getFollowRequests, null) || {};
  const requests = frFetchResponse.followRequests || [];

  // Handle Follow Requests (Accept, Reject & Follow Back)
  const handleAccept = async requestId => {
    await submitHandler(setAlert, acceptFollowRequest, requestId);
  };

  const handleReject = async requestId => {
    await submitHandler(setAlert, rejectFollowRequest, requestId);
  };

  const handleFollow = async requestId => {
    await submitHandler(setAlert, followUser, requestId);
  };

  return (
    <div className="bg-bg-secondary">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} />}
      <FollowersCard followers={requests} onAccept={handleAccept} onReject={handleReject} onFollow={handleFollow} />
    </div>
  );
}
