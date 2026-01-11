import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { 
  FiBell, FiUser, FiHeart, FiMessageCircle, FiRepeat, 
  FiChevronRight, FiChevronDown, FiCheck, FiX 
} from "react-icons/fi";

// --- MOCK DATA (Pour tester sans backend pour l'instant) ---
const mockFollowRequests = [
  {
    id: 101,
    user: {
      id: 5,
      name: "Sarah Connors",
      username: "@sarah_c",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    time: "10 min ago"
  },
  {
    id: 102,
    user: {
      id: 6,
      name: "Kyle Reese",
      username: "@kyle_future",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    time: "1 hour ago"
  }
];

const mockNotifications = [
  {
    id: 1,
    type: 'like', // Pour un compte public, 'follow' apparaîtrait ici
    user: {
      name: "Jhon Ait Doe",
      username: "@7imaroJo7a",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    message: "liked your thread",
    time: "4 hours ago",
    read: false
  },
  {
    id: 2,
    type: 'reply',
    user: {
      name: "7adda Rodriguez",
      username: "@7adda",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    message: "replied to your thread",
    time: "6 hours ago",
    read: true
  },
  {
    id: 3,
    type: 'follow', // Exemple de notif de suivi pour compte public
    user: {
      name: "Hamid Skefkef",
      username: "@hamidSkefkef",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    message: "started following you",
    time: "2 hours ago",
    read: false
  }
];

// --- COMPONENTS ---

// Composant pour une demande de suivi individuelle
const FollowRequestItem = ({ request, onAccept, onRefuse }) => (
  <div className="flex items-center justify-between p-4 hover:bg-bg-tertiary/30 transition-colors border-b border-border/50 last:border-0 animate-fadeIn">
    <div className="flex items-center gap-3">
      <img
        src={request.user.avatar}
        alt={request.user.name}
        className="w-10 h-10 rounded-full object-cover border border-border"
      />
      <div>
        <p className="font-semibold text-sm text-text-primary">{request.user.username}</p>
        <p className="text-xs text-text-muted">{request.user.name}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <button 
        onClick={() => onAccept(request.id)}
        className="px-4 py-1.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors flex items-center gap-1"
      >
        Accepter
      </button>
      <button 
        onClick={() => onRefuse(request.id)}
        className="px-4 py-1.5 bg-bg-tertiary text-text-primary border border-border text-sm font-medium rounded-lg hover:bg-bg-tertiary/80 transition-colors"
      >
        Refuser
      </button>
    </div>
  </div>
);

export default function Notifications() {
  const { t } = useTranslation();
  
  // Utilisation du contexte Auth. 
  // NOTE: Si user est null au chargement, on met une valeur par défaut pour éviter le crash.
  const { user } = useContext(AuthContext) || { user: { is_private: true } }; 
  
  // États
  const [activeNotifications, setActiveNotifications] = useState(mockNotifications);
  const [followRequests, setFollowRequests] = useState(mockFollowRequests);
  const [showRequests, setShowRequests] = useState(false);

  // Pour tester visuellement si tu n'as pas encore connecté l'AuthContext parfaitement :
  // Décommenter la ligne ci-dessous pour forcer le mode "Privé" ou "Public"
  // const user = { is_private: true }; 

  // --- LOGIQUE ---

  const handleAcceptRequest = (id) => {
    // API Call simulation
    setFollowRequests(prev => prev.filter(req => req.id !== id));
  };

  const handleRefuseRequest = (id) => {
    // API Call simulation
    setFollowRequests(prev => prev.filter(req => req.id !== id));
  };

  const markAsRead = (notificationId) => {
    setActiveNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'follow': return <FiUser className="w-5 h-5 text-accent" />;
      case 'like': return <FiHeart className="w-5 h-5 text-red-500 fill-current" />;
      case 'reply': return <FiMessageCircle className="w-5 h-5 text-green-500" />;
      case 'repost': return <FiRepeat className="w-5 h-5 text-purple-500" />;
      default: return <FiBell className="w-5 h-5 text-text-muted" />;
    }
  };

  // Filtrer les notifications pour ne pas montrer "started following you" si le compte est privé
  // (car c'est censé être dans les requêtes), sauf si c'est déjà accepté.
  const filteredNotifications = activeNotifications.filter(n => {
    if (user?.is_private && n.type === 'follow') return false; 
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-bg-primary pb-20">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border p-4 sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
        <h1 className="text-xl font-bold text-text-primary">Notifications</h1>
      </div>

      {/* --- SECTION COMPTES PRIVÉS : DEMANDES DE SUIVI --- */}
      {user?.is_private && followRequests.length > 0 && (
        <div className="border-b border-border bg-bg-secondary mb-2">
          {/* Header cliquable pour rétracter/étendre */}
          <div 
            onClick={() => setShowRequests(!showRequests)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-bg-tertiary/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-text-primary/10 flex items-center justify-center bg-bg-tertiary overflow-hidden">
                    <span className="text-text-primary font-bold">+{followRequests.length}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-bg-secondary flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{followRequests.length}</span>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary">Demandes de suivi</h3>
                <p className="text-sm text-text-muted">Approuvez ou ignorez les demandes</p>
              </div>
            </div>
            <div className="text-text-muted group-hover:text-text-primary transition-colors">
               {showRequests ? <FiChevronDown size={24} /> : <FiChevronRight size={24} />}
            </div>
          </div>

          {/* Liste rétractable */}
          {showRequests && (
            <div className="bg-bg-primary/50 border-t border-border animate-scaleIn origin-top">
              {followRequests.map(req => (
                <FollowRequestItem 
                  key={req.id} 
                  request={req} 
                  onAccept={handleAcceptRequest}
                  onRefuse={handleRefuseRequest}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- LISTE DES NOTIFICATIONS CLASSIQUES --- */}
      <div className="divide-y divide-border bg-bg-secondary">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-bg-tertiary/50 transition-colors cursor-pointer relative ${
                !notification.read ? 'bg-accent/5' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-4">
                {/* Left Icon (Type) */}
                <div className="shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Avatar */}
                <div className="shrink-0 relative">
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="w-10 h-10 object-cover rounded-full border border-border"
                  />
                  {/* Petit badge icone sur l'avatar (style Instagram) */}
                  <div className="absolute -bottom-1 -right-1 bg-bg-secondary rounded-full p-0.5 border border-border">
                     {/* On pourrait remettre l'icone ici en petit si on veut */}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary text-sm leading-snug">
                    <span className="font-semibold hover:underline">{notification.user.username}</span>
                    {" "}
                    <span className="text-text-primary">{notification.message}</span>
                    <span className="text-text-muted ml-1 inline-block text-xs">• {notification.time}</span>
                  </p>
                </div>

                {/* Media Preview (Optionnel - si la notif concerne une image) */}
                {/* <div className="shrink-0 w-10 h-10 bg-gray-200 rounded md:w-12 md:h-12"></div> */}

                {/* Unread Indicator */}
                {!notification.read && (
                  <div className="shrink-0 self-center">
                    <div className="w-2.5 h-2.5 bg-accent rounded-full shadow-sm"></div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 px-8 text-center">
            <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
               <FiBell className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">Aucune notification</h3>
            <p className="text-text-muted text-sm mt-2 max-w-xs mx-auto">
              Lorsque quelqu'un interagit avec votre contenu, vous le verrez ici.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}