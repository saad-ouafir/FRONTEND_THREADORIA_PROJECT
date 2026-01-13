import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FiUser, FiCheck, FiX } from "react-icons/fi";

const FollowRequests = ({ requests, publicFollows, onAccept, onReject, onMarkAsRead }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [showAllPublicFollows, setShowAllPublicFollows] = useState(false);

  const hasContent = requests.length > 0 || publicFollows.length > 0;
  const displayedRequests = showAllRequests ? requests : requests.slice(0, 2);
  const displayedPublicFollows = showAllPublicFollows ? publicFollows : publicFollows.slice(0, 2);

  if (!hasContent) return null;

  return (
    <div className="bg-bg-secondary border-b border-border">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-text-primary mb-3">{t('notifications.new_followers', 'New followers')}</h2>
        
        {/* Public Follows */}
        {publicFollows.length > 0 && (
          <div className="space-y-3 mb-4">
            {displayedPublicFollows.map((follow) => (
              <div 
                key={follow.id} 
                className={`flex items-center gap-3 p-3 bg-bg-primary rounded-lg cursor-pointer hover:bg-bg-tertiary/50 transition-colors ${
                  !follow.read ? 'bg-accent/10 border-l-4 border-accent/50' : 'opacity-75'
                }`}
                onClick={() => navigate(`/profile/${follow.user.id}`)}
              >
                <img
                  src={follow.user.avatar}
                  alt={follow.user.name}
                  className={`w-12 h-12 object-cover rounded-full ${
                    !follow.read ? 'ring-2 ring-accent ring-offset-2' : ''
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p 
                    className={`font-medium hover:text-accent cursor-pointer transition-colors ${
                      !follow.read ? 'text-text-primary' : 'text-text-muted'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${follow.user.id}`);
                    }}
                  >
                    {follow.user.name}
                  </p>
                  <p className={`text-xs mt-1 font-semibold ${
                    !follow.read ? 'text-text-primary' : 'text-text-muted'
                  }`}>
                    {t('notifications.started_following', 'started following you')}
                  </p>
                </div>
                <div className="shrink-0">
                  <FiUser className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            ))}
            {publicFollows.length > 2 && (
              <button
                className="w-full p-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
              >
                {t('rightbar.see_more', 'See more')}
              </button>
            )}
          </div>
        )}

        {/* Private Follow Requests */}
        {requests.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-text-secondary">{t('notifications.follow_requests', 'Follow Requests')}</h3>
            {displayedRequests.map((request) => (
              <div 
                key={request.id} 
                className={`flex items-center gap-3 p-3 bg-bg-primary rounded-lg ${
                  !request.read ? 'bg-accent/10 border-l-4 border-accent/50' : 'opacity-75'
                }`}
                onClick={() => {
                  onMarkAsRead(request.id);
                }}
              >
                <img
                  src={request.follower.avatar}
                  alt={request.follower.name}
                  className={`w-12 h-12 object-cover rounded-full ${
                    !request.read ? 'ring-2 ring-accent ring-offset-2' : ''
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p 
                    className={`font-medium hover:text-accent cursor-pointer transition-colors ${
                      !request.read ? 'text-text-primary' : 'text-text-muted'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${request.follower.id}`);
                    }}
                  >
                    {request.follower.name}
                  </p>
                  <p className={`text-xs mt-1 font-semibold ${
                    !request.read ? 'text-text-primary' : 'text-text-muted'
                  }`}>
                    {t('notifications.requested_follow', 'requested to follow you')}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => onAccept(request.id)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                    aria-label={t('notifications.accept_request', 'Accept follow request')}
                  >
                    <FiCheck className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onReject(request.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    aria-label={t('notifications.reject_request', 'Reject follow request')}
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {requests.length > 2 && (
              <button
                className="w-full p-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
              >
                {t('rightbar.see_more', 'See more')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowRequests;
