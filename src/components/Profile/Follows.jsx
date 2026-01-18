import ProfilesCard from "./ProfilesCard";
import Modal from "../UI/Modal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProfile from "../../hooks/states/useProfile";
import { getFollowers, getFollowing } from "../../api/follow.api";
import { useTranslation } from "react-i18next";
import AlertMessage from "../UI/AlertMessage";

export default function Follows({ opt }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigate = useNavigate();
  const { id: userID } = useParams();
  const user = useProfile();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const targetUserId = userID || user?.id;
      if (!targetUserId) return;

      setIsLoading(true);
      try {
        let response;
        if (opt === "followers") {
          response = await getFollowers(targetUserId);
          setUsers(response.followers || []);
        } else if (opt === "following") {
          response = await getFollowing(targetUserId);
          setUsers(response.following || []);
        }
      } catch (error) {
        setAlertMessage(null);
        setAlertMessage({
          message: error.message || `Failed to fetch ${opt}`,
          statusCode: error.status || 500,
        });
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [opt, user?.id, userID]);

  const handleClose = () => {
    navigate(-1);
  };

  const title = opt === "followers" ? t("profile.followers") : t("profile.following");

  return (
    <div>
      {alertMessage && (
        <AlertMessage
          message={alertMessage.message}
          statusCode={alertMessage.statusCode}
          onClose={() => setAlertMessage(null)}
        />
      )}
      {!alertMessage && (
        <Modal isOpen={true} onClose={handleClose}>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          ) : (
            <ProfilesCard fetchedUsers={users} title={title} />
          )}
        </Modal>
      )}
    </div>
  );
}
