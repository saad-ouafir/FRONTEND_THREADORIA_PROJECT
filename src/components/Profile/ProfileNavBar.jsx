import { useTranslation } from "react-i18next";
export default function ProfileNavBar() {
  const { t } = useTranslation();
  return (
    <div className="flex border-y border-border bg-bg-secondary">
      <button className="flex-1 py-4 text-center font-semibold text-accent border-b-2 border-accent">
        {t("profile.threads")}
      </button>
      <button className="flex-1 py-4 text-center font-semibold text-text-muted hover:text-blue-500 hover:bg-bg-tertiary/30 transition-colors rounded-t-lg">
        {t("profile.media")}
      </button>
      <button className="flex-1 py-4 text-center font-semibold text-text-muted hover:text-blue-500 hover:bg-bg-tertiary/30 transition-colors rounded-t-lg">
        {t("profile.likes")}
      </button>
    </div>
  );
}
