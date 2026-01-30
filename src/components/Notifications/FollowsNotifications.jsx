import { useState, useEffect, useCallback } from "react";

// Api Hook and Handlers
import { acceptFollowRequest, toggleFollow, getFollowRequests, rejectFollowRequest } from "../../api/follow.api";
import submitHandler from "../../handlers/submitHandler";

// UI components
import AlertMessage from "../UI/AlertMessage";
import FollowersCard from "./FollowersCard";

export default function FollowsNotifications() {
  const [alert, setAlert] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch follow requests on mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await getFollowRequests();
        setRequests(response.followRequests || []);
      } catch (error) {
        setAlert({ message: error.message || "Failed to fetch requests", statusCode: error.status || 500 });
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Remove request from local state after action
  const removeRequest = useCallback(followerId => {
    setRequests(prev => prev.filter(r => r.follower_id !== followerId));
  }, []);

  // Handle Follow Requests (Accept, Reject & Follow Back)
  const handleAccept = async followerId => {
    const result = await submitHandler(setAlert, acceptFollowRequest, followerId);
    if (result) {
      removeRequest(followerId);
    }
  };

  const handleReject = async followerId => {
    const result = await submitHandler(setAlert, rejectFollowRequest, followerId);
    if (result) {
      removeRequest(followerId);
    }
  };

  const handleFollow = async followerId => {
    await submitHandler(setAlert, toggleFollow, followerId);
  };

  if (loading) {
    return (
      <div className="bg-bg-secondary p-4 flex justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}
      <FollowersCard followers={requests} onAccept={handleAccept} onReject={handleReject} onFollow={handleFollow} />
    </div>
  );
}
