import { useTranslation } from "react-i18next";
import DialogBox from "../UI/DialogBox.jsx";
import { useState } from "react";

export default function AccountDelition() {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="w-full">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-border">
          <h2 className="text-lg sm:text-xl font-bold text-text-primary">
            {t("delete.title")}
          </h2>
        </div>
        {isDeleting && (
          <DialogBox
            message={
              t("delete.subtitle") ||
              "Are you sure you want to delete your account?"
            }
            onClose={() => setIsDeleting(false)}
            onConfirm={() => {
              // TODO: Handle account deletion
              setIsDeleting(false);
            }}
          />
        )}
        <button
          type="button"
          onClick={() => setIsDeleting(true)}
          className="rounded-lg border border-red-500 text-red-500 px-4 py-2 text-sm sm:text-base font-medium hover:bg-red-600 hover:text-white transition-colors">
          {t("settings.delete_account")}
        </button>
      </div>
    </div>
  );
}
