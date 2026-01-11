import { useTranslation } from "react-i18next";
import DialogBox from "../UI/DialogBox.jsx";
import { useState } from "react";
import { deleteAccount } from "../../api/auth.api.js";
import AlertMessage from "../UI/AlertMessage.jsx";
import { useNavigate } from "react-router-dom";

export default function AccountDelition() {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      const response = deleteAccount();
      setAlertMessage({
        message: response.message,
        statusCode: response.status,
      });
      navigate("/");
    } catch (errors) {
      setAlertMessage({
        message: errors.message,
        statusCode: errors.status,
      });
    }
  };

  return (
    <div className="w-full">
      {alertMessage && (
        <AlertMessage
          message={alertMessage.message}
          type={alertMessage.type}
          onClose={() => setAlertMessage(null)}
        />
      )}
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
              handleDelete();
            }}
          />
        )}
        <button
          type="button"
          onClick={() => setIsDeleting(true)}
          className="rounded-lg border border-red-500 text-red-500 px-4 py-2 text-sm sm:text-base font-medium hover:bg-red-600 hover:text-white transition-colors"
        >
          {t("settings.delete_account")}
        </button>
      </div>
    </div>
  );
}
