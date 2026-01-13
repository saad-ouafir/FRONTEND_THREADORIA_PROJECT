import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FollowRequests, NotificationsList, NotificationHeader } from "../components/notifications";
import { samplePublicFollows, sampleFollowRequests, sampleNotifications } from "../components/notifications/notificationData";

export default function Notifications() {
  const { t } = useTranslation();
  const [followRequests, setFollowRequests] = useState(sampleFollowRequests);
  const [publicFollows, setPublicFollows] = useState(samplePublicFollows);
  const [notifications, setNotifications] = useState(sampleNotifications);

  const handleAcceptRequest = async (requestId) => {
    try {
      // API call to accept follow request
      // await api.put(`/follow/requests/${requestId}/accept`);
      
      // Remove from pending requests
      const acceptedRequest = followRequests.find(req => req.id === requestId);
      setFollowRequests(prev => prev.filter(req => req.id !== requestId));
      
      // Add to public follows as accepted follow
      if (acceptedRequest) {
        const newPublicFollow = {
          id: Date.now(),
          user: acceptedRequest.follower,
          time: "just now",
          read: false
        };
        setPublicFollows(prev => [newPublicFollow, ...prev]);
      }
    } catch (error) {
      console.error('Failed to accept follow request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      // API call to reject follow request
      // await api.put(`/follow/requests/${requestId}/reject`);
      
      // Remove from pending requests
      setFollowRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Failed to reject follow request:', error);
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markFollowRequestAsRead = (requestId) => {
    setFollowRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, read: true } : req
      )
    );
  };

  return (
    <div className="min-h-screen w-full bg-bg-primary">
      <NotificationHeader />

      {/* Follow Activity Section */}
      <FollowRequests 
        requests={followRequests}
        publicFollows={publicFollows}
        onAccept={handleAcceptRequest}
        onReject={handleRejectRequest}
        onMarkAsRead={markFollowRequestAsRead}
      />

      {/* Other Notifications Section */}
      <NotificationsList 
        notifications={notifications}
        onMarkAsRead={markAsRead}
      />
    </div>
  );
}
