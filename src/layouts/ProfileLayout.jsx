import { Outlet, useParams } from "react-router-dom";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileNavBar from "../components/Profile/ProfileNavBar";
import { ProfileProvider } from "../context/ProfileContext";

export default function ProfileLayout() {
  const { id: userID } = useParams();

  return (
    <ProfileProvider userID={userID}>
      <div>
        <ProfileInfo userID={userID} />
        <ProfileNavBar />
        <Outlet />
      </div>
    </ProfileProvider>
  );
}
