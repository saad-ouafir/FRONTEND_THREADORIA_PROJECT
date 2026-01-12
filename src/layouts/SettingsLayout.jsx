import HeaderComponent from "../components/HeaderComponent";
import ProfilePicture from "../components/Settings/ProfilePicture";
import ProfileInfo from "../components/Settings/ProfileInfo";
import CredentialsInfo from "../components/Settings/CredentialsInfo";
import AccountDelition from "../components/Settings/AccountDelition";
import useProfile from "../hooks/states/useProfile";
export default function SettingsLayout() {
  const user = useProfile() || {};
  return (
    <div>
      <HeaderComponent page="Account Settings" />
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 bg-surface">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
          <ProfilePicture user={user} />
          <ProfileInfo user={user} />
          <CredentialsInfo user={user} />
          <AccountDelition />
        </div>
      </div>
    </div>
  );
}
