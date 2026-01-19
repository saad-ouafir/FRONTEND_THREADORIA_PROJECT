import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiLoader } from "react-icons/fi";
import { acceptFollowRequest, rejectFollowRequest } from "../../../api/follow.api";
import Modal from "../../UI/Modal";
import AlertMessage from "../../UI/AlertMessage";

// Mock test data for private follow requests
const mockFollowRequests = [
  {
    id: 1,
    follower: {
      id: 101,
      name: "Alice Johnson",
      username: "alice_dev",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Full-stack developer passionate about React and Node.js.",
      follower_count: 245,
      following_count: 189,
    },
    read: false,
    type: "request",
  },
  {
    id: 2,
    follower: {
      id: 102,
      name: "Bob Smith",
      username: "bob_designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "UI/UX Designer with 5+ years experience.",
      follower_count: 156,
      following_count: 234,
    },
    read: true,
    type: "request",
  },
  {
    id: 3,
    follower: {
      id: 103,
      name: "Carol Williams",
      username: "carol_writer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Technical writer and content creator.",
      follower_count: 89,
      following_count: 145,
    },
    read: false,
    type: "request",
  },
  {
    id: 4,
    follower: {
      id: 104,
      name: "David Brown",
      username: "david_photographer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Professional photographer specializing in portraits and landscapes.",
      follower_count: 312,
      following_count: 98,
    },
    read: true,
    type: "request",
  },
  {
    id: 5,
    follower: {
      id: 105,
      name: "Eva Martinez",
      username: "eva_designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "UX/UI Designer with a passion for user-centered design.",
      follower_count: 567,
      following_count: 234,
    },
    read: false,
    type: "request",
  },
  {
    id: 6,
    follower: {
      id: 106,
      name: "Felix Garcia",
      username: "felix_developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Full-stack developer specializing in React and Node.js.",
      follower_count: 423,
      following_count: 187,
    },
    read: true,
    type: "request",
  },
  {
    id: 7,
    follower: {
      id: 107,
      name: "Gina Patel",
      username: "gina_writer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Technical writer and content strategist.",
      follower_count: 298,
      following_count: 145,
    },
    read: false,
    type: "request",
  },
];

export default function FollowRequestsNotifications() {
  const { t } = useTranslation();
  const [requests, setRequests] = useState(mockFollowRequests);
  const [loadingIds, setLoadingIds] = useState(new Set());
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccept = async requestId => {
    setLoadingIds(prev => new Set(prev).add(requestId));
    try {
      const response = await acceptFollowRequest({ requestId });
      if (response.status === 200) {
        setRequests(prev => prev.filter(req => req.id !== requestId));
        setAlertMessage("Follow request accepted successfully!");
        setAlertType("success");
      }
    } catch (err) {
      console.error("Error accepting follow request:", err);
      setAlertMessage(err.message || "Failed to accept follow request");
      setAlertType("error");
    } finally {
      setLoadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleReject = async requestId => {
    setLoadingIds(prev => new Set(prev).add(requestId));
    try {
      const response = await rejectFollowRequest({ requestId });
      if (response.status === 200) {
        setRequests(prev => prev.filter(req => req.id !== requestId));
        setAlertMessage("Follow request rejected");
        setAlertType("success");
      }
    } catch (err) {
      console.error("Error rejecting follow request:", err);
      setAlertMessage(err.message || "Failed to reject follow request");
      setAlertType("error");
    } finally {
      setLoadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const computedValues = useMemo(() => {
    const displayedRequests = requests.slice(0, 3);
    return {
      displayedRequests,
      hasContent: requests.length > 0,
    };
  }, [requests]);

  if (!computedValues.hasContent) return null;

  return (
    <div className="bg-bg-secondary border-b border-border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-text-primary">
              {t("notifications.follow_requests", "Follow Requests")}
            </h2>
            {requests.filter(req => !req.read).length > 0 && (
              <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                {requests.filter(req => !req.read).length}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {computedValues.displayedRequests.map(request => (
            <FollowRequestItem
              key={request.id}
              request={request}
              isLoading={loadingIds.has(request.id)}
              onAccept={() => handleAccept(request.id)}
              onReject={() => handleReject(request.id)}
              userID={request.follower.id}
            />
          ))}
        </div>

        {requests.length > 3 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-6 py-3 px-4 bg-bg-primary hover:bg-bg-tertiary border border-border hover:border-accent/30 text-accent hover:text-accent-hover text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 rounded-xl shadow-sm hover:shadow-md"
          >
            <FiChevronDown className="w-4 h-4" />
            <span>{t("rightbar.see_more", "See more")}</span>
            <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">
              {requests.length - 3}
            </span>
          </button>
        )}

        {/* Modal for showing all follow requests */}
        <AllRequestsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          requests={requests}
          loadingIds={loadingIds}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </div>

      {/* Alert Message */}
      <AlertMessage type={alertType} message={alertMessage} onClose={() => setAlertMessage("")} />
    </div>
  );
}

// Follow Request Item Component
function FollowRequestItem({ request, isLoading, onAccept, onReject, userID }) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex items-center gap-3 p-3 bg-bg-primary hover:bg-bg-tertiary transition-colors rounded-lg relative ${
        !request.read ? "bg-accent/5" : ""
      }`}
    >
      {!request.read && <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></div>}
      <Link to={`/profile/${userID}`} className="shrink-0">
        <img
          src={request.follower.avatar}
          alt={request.follower.name}
          className="w-10 h-10 object-cover rounded-full"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            to={`/profile/${userID}`}
            className="font-medium text-text-primary hover:text-accent transition-colors truncate"
          >
            {request.follower.name}
          </Link>
          <span className="text-text-secondary text-sm">•</span>
          <span className="text-text-secondary text-sm truncate">
            {t("notifications.requested_follow", "requested to follow you")}
          </span>
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={onAccept}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium bg-accent hover:bg-accent-hover disabled:bg-accent/50 text-white transition-colors rounded-lg shadow-sm"
        >
          {isLoading ? <FiLoader className="w-4 h-4 animate-spin" /> : "accept"}
        </button>

        <button
          onClick={onReject}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-700 disabled:bg-red-500/50 text-white transition-colors rounded-lg shadow-sm"
        >
          {isLoading ? <FiLoader className="w-4 h-4 animate-spin" /> : "x"}
        </button>
      </div>
    </div>
  );
}

// Modal Component for showing all follow requests
function AllRequestsModal({ isOpen, onClose, requests, loadingIds, onAccept, onReject }) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[70vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-text-primary mb-6">
          {t("notifications.all_requests", "All Follow Requests")}
        </h2>

        <div className="space-y-3">
          {requests.map(request => (
            <FollowRequestItem
              key={request.id}
              request={request}
              isLoading={loadingIds.has(request.id)}
              onAccept={() => onAccept(request.id)}
              onReject={() => onReject(request.id)}
              userID={request.follower.id}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
