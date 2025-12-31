import { useState } from "react";
import { useTranslation } from "react-i18next";

function EditableSettingRow({ label, sublabel, value, type = "text", onSave }) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleEdit = () => {
    setDraft(value);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave(draft);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className="space-y-2 py-4 border-b border-border last:border-b-0">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-primary">
            {label}
          </p>
          {sublabel && (
            <p className="text-xs text-text-muted mt-0.5">
              {sublabel}
            </p>
          )}
        </div>

        {!isEditing && (
          <button
            onClick={handleEdit}
            className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-text-secondary hover:text-text-primary dark:text-text-secondary dark:hover:text-text-primary hover:bg-bg-tertiary dark:hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-accent/50 dark:focus:ring-accent/50 transition-colors"
            aria-label={`Edit ${label}`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        )}
      </div>

      {!isEditing && (
        <div className="px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm">
          {type === "password" ? (
            <span className="tracking-widest select-none">●●●●●●●●</span>
          ) : (
            <span className="break-words">{value || "—"}</span>
          )}
        </div>
      )}

      {isEditing && (
        <div className="space-y-2">
          <input
            type={type}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full px-3 py-2.5 rounded-lg border border-border text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
            placeholder={t(`settings.enter_${label.toLowerCase().replace(' ', '_')}`)}
          />

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-text-secondary hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
            >
              {t('settings.cancel')}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1.5 rounded-lg bg-accent text-xs font-medium text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
            >
              {t('settings.save')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfilePictureSection({ imageUrl = null, name = "User" }) {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // handle upload externally
    setTimeout(() => setIsUploading(false), 800);
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="py-6 border-b border-border">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-tertiary text-lg font-semibold text-text-primary">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-text-primary">
              {t('settings.profile_picture')}
            </p>
            <p className="text-xs text-text-muted">
              {t('settings.profile_picture_subtitle')}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-bg-tertiary focus-within:outline-none focus-within:ring-2 focus-within:ring-accent/50 transition-colors">
            {isUploading ? t('settings.uploading') : t('settings.upload_new_picture')}
            <input
              type="file"
              accept="image/png,image/jpeg"
              disabled={isUploading}
              onChange={handleUpload}
              className="hidden"
            />
          </label>

          <button
            type="button"
            className="rounded-lg border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
          >
            {t('settings.delete')}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({ title, subtitle, children }) {
  return (
    <section className="space-y-2">
      <div>
        <h2 className="text-sm font-semibold text-text-primary">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-text-muted">
            {subtitle}
          </p>
        )}
      </div>
      <div className="divide-y divide-border">
        {children}
      </div>
    </section>
  );
}

export default function AccountSettingsPage() {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("Bryan");
  const [lastName, setLastName] = useState("Cranston");
  const [email, setEmail] = useState("bryan.cranston@mail.com");
  const [password, setPassword] = useState("");
  const [profileImage] = useState(null);

  const fullName = `${firstName} ${lastName}`;

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 flex-grow min-h-full">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {t('settings.account_settings')}
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          {t('settings.account_settings_subtitle')}
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-surface shadow-sm">
        <div className="px-6 py-6 sm:px-8">
          <ProfilePictureSection name={fullName} imageUrl={profileImage} />
        </div>

        <div className="space-y-6 px-6 pb-6 sm:px-8 sm:pb-8">
          <SettingsSection title={t('settings.personal_information')}>
            <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
              <EditableSettingRow
                label={t('settings.first_name')}
                value={firstName}
                onSave={setFirstName}
              />
              <EditableSettingRow
                label={t('settings.last_name')}
                value={lastName}
                onSave={setLastName}
              />
            </div>
          </SettingsSection>

          <SettingsSection
            title={t('settings.contact_email')}
            subtitle={t('settings.contact_email_subtitle')}
          >
            <EditableSettingRow
              label={t('settings.email_address')}
              value={email}
              type="email"
              onSave={setEmail}
            />

            <div className="flex justify-end py-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-border px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-border-hover hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
              >
                <span className="text-sm font-bold">+</span>
                {t('settings.add_another_email')}
              </button>
            </div>
          </SettingsSection>

          <SettingsSection
            title={t('settings.security')}
            subtitle={t('settings.security_subtitle')}
          >
            <EditableSettingRow
              label={t('settings.password')}
              sublabel={t('settings.password_subtitle')}
              value={password}
              type="password"
              onSave={setPassword}
            />
          </SettingsSection>

          <div className="border-t border-border pt-6">
            {/* <h3 className="mb-3 text-sm font-semibold text-red-600 dark:text-red-400">
              {t('settings.danger_zone')}
            </h3> */}
            <button
              type="button"
              className="rounded-lg border border-red-200 text-red-700 px-4 py-2 text-sm font-medium hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 transition-colors"
            >
              {t('settings.delete_account')}
            </button>
          </div>
        </div>

        {/* <footer className="border-t border-border px-6 py-4 text-xs text-text-muted sm:px-8">
          {t('settings.last_updated')}: {new Date().toLocaleDateString()}
        </footer> */}
      </section>
    </main>
  );
}
