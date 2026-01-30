import ProfilesCard from "./ProfilesCard";
import Modal from "../UI/Modal";
import { useNavigate, useParams } from "react-router-dom";
import useProfile from "../../hooks/states/useProfile";
import { getFollowers, getFollowing } from "../../api/follow.api";
import { useTranslation } from "react-i18next";
import AlertMessage from "../UI/AlertMessage";
import { useFetch } from "../../hooks/api/useFetch";
import { useAlert } from "../../hooks/states/useAlert";
import { useProfileContext } from "../../hooks/context/useProfileContext";

export default function Follows({ opt }) {
  const { alert, setAlert, clearAlert } = useAlert();
  const navigate = useNavigate();
  const { id: userID } = useParams();
  const user = useProfile();
  const { t } = useTranslation();
  const { updateFollowerCount, updateFollowingCount } = useProfileContext();

  const idToUse = userID || user.id;
  const isOwnProfile = !userID || userID === String(user.id);
  const fetchedData = useFetch(setAlert, opt === "followers" ? getFollowers : getFollowing, idToUse);
  const users = opt === "followers" ? fetchedData.followers : fetchedData.following;

  const handleClose = () => navigate(-1);
  const title = opt === "followers" ? t("profile.followers") : t("profile.following");

  // Callback to update counts when user is removed/unfollowed
  const onCountChange = delta => {
    if (opt === "followers") {
      updateFollowerCount(delta);
    } else {
      updateFollowingCount(delta);
    }
  };

  return (
    <div>
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={clearAlert} />}
      {!alert && fetchedData.loading && (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      )}
      {!alert && !fetchedData.loading && (
        <Modal isOpen={true} onClose={handleClose}>
          <ProfilesCard
            fetchedUsers={users}
            title={title}
            isOwnProfile={isOwnProfile}
            listType={opt}
            onCountChange={onCountChange}
          />
        </Modal>
      )}
    </div>
  );
}
