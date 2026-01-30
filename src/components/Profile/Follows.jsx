import ProfilesCard from "./ProfilesCard";
import Modal from "../UI/Modal";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProfile from "../../hooks/states/useProfile";
import { getFollowers, getFollowing } from "../../api/follow.api";
import { useTranslation } from "react-i18next";
import AlertMessage from "../UI/AlertMessage";
import { useFetch } from "../../hooks/api/useFetch";

export default function Follows({ opt }) {
  const [alertMessage, setAlertMessage] = useState(null);

  const navigate = useNavigate();
  const { id: userID } = useParams();
  const user = useProfile();
  const { t } = useTranslation();

  const idToUse = userID || user.id;
  const fetchedData = useFetch(setAlertMessage, opt === "followers" ? getFollowers : getFollowing, idToUse);
  const users = opt === "followers" ? fetchedData.followers : fetchedData.following;

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
      {!alertMessage && fetchedData.loading && (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      )}
      {!alertMessage && !fetchedData.loading && (
        <Modal isOpen={true} onClose={handleClose}>
          <ProfilesCard fetchedUsers={users} title={title} />
        </Modal>
      )}
    </div>
  );
}
