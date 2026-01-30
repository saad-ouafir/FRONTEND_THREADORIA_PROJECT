import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import useProfile from "../../hooks/states/useProfile";
import { updateAccount } from "../../api/auth.api";
import { useValidateProfileForm } from "../../hooks/forms/useFormValidator";
import AlertMessage from "../UI/AlertMessage";
import submitHandler from "../../handlers/submitHandler";

export default function ProfileInfo() {
  const { t } = useTranslation();
  const user = useProfile();
  const [editingField, setEditingField] = useState(null);
  const [alert, setAlert] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    // reset,
  } = useValidateProfileForm({
    defaultValues: {
      full_name: user?.full_name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  });

  const onSubmit = async data => {
    const result = await submitHandler(setAlert, updateAccount, data);
    if (result?.status >= 200 && result?.status < 300) {
      setEditingField(null);
    }
  };

  const handleEditField = fieldName => {
    setEditingField(fieldName);
  };

  const getDisplayValue = fieldName => {
    const values = getValues();
    return values[fieldName] || "";
  };

  return (
    <div className="w-full">
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-border">
          <h2 className="text-lg sm:text-xl font-bold text-text-primary">{t("settings.profile_info")}</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm sm:text-base font-medium text-text-primary">{t("settings.full_name")}</label>
            </div>

            {editingField !== "full_name" && (
              <div className="relative">
                <div className="px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm">
                  {getDisplayValue("full_name") || <span className="text-text-muted">Not set</span>}
                </div>
                <button
                  type="button"
                  onClick={() => handleEditField("full_name")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-bg-tertiary transition-colors"
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
              </div>
            )}

            {editingField === "full_name" && (
              <div className="space-y-2">
                <input
                  {...register("full_name")}
                  type="text"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${
                    errors.full_name ? "border-red-500" : "border-border"
                  } text-sm sm:text-base text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors`}
                  placeholder={t("settings.enter_full_name")}
                  autoFocus
                />
                {errors.full_name && <p className="text-xs text-red-500">{errors.full_name.message}</p>}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingField(null)}
                    className="px-3 py-2 text-xs rounded-lg border border-border hover:bg-bg-tertiary transition-colors"
                  >
                    {t("settings.cancel") || "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-accent text-xs font-medium text-white hover:bg-accent-hover transition-colors"
                  >
                    {t("settings.save")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm sm:text-base font-medium text-text-primary">{t("settings.username")}</label>
            </div>

            {editingField !== "username" && (
              <div className="relative">
                <div className="px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm">
                  {getDisplayValue("username") || <span className="text-text-muted">Not set</span>}
                </div>
                <button
                  type="button"
                  onClick={() => handleEditField("username")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-bg-tertiary transition-colors"
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
              </div>
            )}

            {editingField === "username" && (
              <div className="space-y-2">
                <input
                  {...register("username")}
                  type="text"
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${
                    errors.username ? "border-red-500" : "border-border"
                  } text-sm sm:text-base text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors`}
                  placeholder={t("settings.enter_username")}
                  autoFocus
                />
                {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingField(null)}
                    className="px-3 py-2 text-xs rounded-lg border border-border hover:bg-bg-tertiary transition-colors"
                  >
                    {t("settings.cancel") || "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-accent text-xs font-medium text-white hover:bg-accent-hover transition-colors"
                  >
                    {t("settings.save")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-2 sm:space-y-3">
            <label className="text-sm sm:text-base font-medium text-text-primary">{t("settings.bio")}</label>

            {editingField !== "bio" && (
              <div className="relative">
                <div className="px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm">
                  {getDisplayValue("bio") || <span className="text-text-muted">Not set</span>}
                </div>
                <button
                  type="button"
                  onClick={() => handleEditField("bio")}
                  className="absolute right-2 top-2 p-1.5 rounded-full hover:bg-bg-tertiary transition-colors"
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
              </div>
            )}

            {editingField === "bio" && (
              <div className="space-y-2">
                <textarea
                  {...register("bio")}
                  rows={4}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${
                    errors.bio ? "border-red-500" : "border-border"
                  } text-sm sm:text-base text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors resize-none`}
                  placeholder={t("settings.enter_bio")}
                  autoFocus
                />
                {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingField(null)}
                    className="px-3 py-2 text-xs rounded-lg border border-border hover:bg-bg-tertiary transition-colors"
                  >
                    {t("settings.cancel") || "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-accent text-xs font-medium text-white hover:bg-accent-hover transition-colors"
                  >
                    {t("settings.save")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
