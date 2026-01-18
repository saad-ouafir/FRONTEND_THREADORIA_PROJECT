import { Outlet, useParams } from "react-router-dom";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileNavBar from "../components/Profile/ProfileNavBar";

export default function ProfileLayout() {
  const { id: userID } = useParams();

  return (
    <div>
      <ProfileInfo userID={userID} />
      <ProfileNavBar />
      <Outlet />
    </div>
  );
}
