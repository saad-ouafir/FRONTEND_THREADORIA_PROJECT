import HeaderComponent from "../components/HeaderComponent";
import AccountSettings from "../components/Settings/AccountSettings";
import SettingsMenu from "../components/Settings/SettingsMenu";

export default function SettingsLayout() {
  return (
    <div>
      <HeaderComponent page="Settings" />
      {/* <SettingsMenu /> */}
      <AccountSettings />
    </div>
  );
}
