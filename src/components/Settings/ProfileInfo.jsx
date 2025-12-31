import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

export default function ProfileInfo() {
  const { t } = useTranslation();
  const [editingField, setEditingField] = useState(null);
  const [fields, setFields] = useState({
    username: "",
    full_name: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditField = (fieldName) => {
    setEditingField(fieldName);
  };

  const handleSaveField = () => {
    setEditingField(null);
  };

  const personalInfoFields = [
    { name: "username", label: t("settings.username") || "Username" },
    { name: "full_name", label: t("settings.full_name") || "Full Name" },
  ];

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-border">
          <h2 className="text-lg sm:text-xl font-bold text-text-primary">
            {t("settings.profile_info")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {personalInfoFields.map((field) => (
            <div key={field.name} className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium text-text-primary">
                    {field.label}
                  </p>
                </div>
              </div>

              {editingField !== field.name && (
                <div className="relative">
                  <div className="px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm pr-12">
                    <span className="wrap-break-word">
                      {fields[field.name] || (
                        <span className="text-text-muted">Not set</span>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => handleEditField(field.name)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full text-text-secondary hover:text-text-primary dark:text-text-secondary dark:hover:text-text-primary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-accent/50 dark:focus:ring-accent/50 transition-colors"
                    aria-label={`Edit ${field.label}`}
                  >
                    <FiEdit2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {editingField === field.name && (
                <div className="space-y-2">
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={fields[field.name]}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border text-sm sm:text-base text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
                    placeholder={
                      t(`settings.enter_${field.name}`) ||
                      `Enter ${field.label}`
                    }
                    autoComplete="off"
                    autoFocus
                  />
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSaveField}
                      className="px-4 py-2 rounded-lg bg-accent text-xs sm:text-sm font-medium text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
                    >
                      {t("settings.save")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 sm:pt-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium text-text-primary">
                {t("settings.bio")}
              </p>
            </div>
          </div>

          {editingField !== "bio" && (
            <div className="relative">
              <div className="px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm pr-12">
                <span className="wrap-break-word">
                  {fields.bio || (
                    <span className="text-text-muted">Not set</span>
                  )}
                </span>
              </div>
              <button
                onClick={() => handleEditField("bio")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full text-text-secondary hover:text-text-primary dark:text-text-secondary dark:hover:text-text-primary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-accent/50 dark:focus:ring-accent/50 transition-colors"
                aria-label={`Edit ${t("settings.bio")}`}
              >
                <FiEdit2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {editingField === "bio" && (
            <div className="space-y-2 mt-2 sm:mt-3">
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={fields.bio}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border text-sm sm:text-base text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors resize-none"
                placeholder={t("settings.enter_bio") || "Enter bio"}
                autoFocus
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSaveField}
                  className="px-4 py-2 rounded-lg bg-accent text-xs sm:text-sm font-medium text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
                >
                  {t("settings.save")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
