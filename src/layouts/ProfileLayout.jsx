import { Outlet } from "react-router-dom";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileNavBar from "../components/Profile/ProfileNavBar";

export default function ProfileLayout() {
  return (
    <div>
      <ProfileInfo />
      <ProfileNavBar />
      <Outlet />
    </div>
  );
}
