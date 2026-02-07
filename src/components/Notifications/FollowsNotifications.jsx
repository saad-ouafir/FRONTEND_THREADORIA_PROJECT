// Custom hooks
import { useFollowRequests } from "../../hooks/api/useFollowRequests";

// UI components
import AlertMessage from "../UI/AlertMessage";
import FollowersCard from "./FollowersCard";

/**
 * FollowsNotifications - Display component for follow requests
 * Uses useFollowRequests hook for all business logic
 */
export default function FollowsNotifications() {
  const { requests, loading, alert, handleAccept, handleReject, handleFollow, clearAlert } = useFollowRequests();

  if (loading) {
    return (
      <div className="bg-bg-secondary p-4 flex justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={clearAlert} />}
      <FollowersCard followers={requests} onAccept={handleAccept} onReject={handleReject} onFollow={handleFollow} />
    </div>
  );
}
