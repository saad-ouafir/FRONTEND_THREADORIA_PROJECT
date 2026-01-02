import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "../../hooks/forms/useAppForm.js";
import { useFormSubmitter } from "../../hooks/forms/useFormSubmitter.js";
import { register } from "../../api/auth.api.js";
import AlertMessage from "../../components/UI/AlertMessage.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRegisterForm();

  const { alert, isSubmitting, submit, clearAlert } = useFormSubmitter(
    register,
    {
      successMessage: t("register.success"),
      onSuccess: () => navigate("/home"),
    }
  );

  const onSubmit = async (data) => {
    await submit(data);
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {alert && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            statusCode={alert.statusCode}
            onClose={clearAlert}
          />
        )}
      </div>
      <div className="w-full max-w-md">
        <div className="bg-bg-secondary border border-border rounded-2xl shadow-lg px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
              {t("register.create_account")}
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              {t("register.subtitle")}
            </p>
          </div>

          {/* Section 1: Profile Image Upload */}
          <div className="mb-6">
            <label
              htmlFor="profile_picture_url"
              className="block text-sm font-medium text-text-primary mb-2">
              {t("register.profile_picture") || "Profile Picture"}
            </label>
            <input
              id="profile_picture_url"
              type="file"
              accept="image/*"
              {...register("profile_picture_url")}
              className="block w-full text-sm text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
            />
          </div>

          {/* Section 2: Account Information */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-text-primary">
                {t("register.username") || "Username"}
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.username ? "border-red-500" : "border-border"
                } bg-bg-tertiary text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-text-muted`}
                placeholder={
                  t("register.username_placeholder") || "Enter your username"
                }
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary">
                {t("register.email")}
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.email ? "border-red-500" : "border-border"
                } bg-bg-tertiary text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-text-muted`}
                placeholder={t("register.email_placeholder")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-primary">
                  {t("register.password")}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-xs text-text-muted hover:text-text-primary">
                  {showPassword ? t("register.hide") : t("register.show")}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.password ? "border-red-500" : "border-border"
                } bg-bg-tertiary text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-text-muted`}
                placeholder={t("register.password_placeholder")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-text-primary">
                  {t("register.confirm_password")}
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-xs text-text-muted hover:text-text-primary">
                  {showConfirm ? t("register.hide") : t("register.show")}
                </button>
              </div>
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-border"
                } bg-bg-tertiary text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-text-muted`}
                placeholder={t("register.password_placeholder")}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Private Account Toggle */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t("register.private_account") || "Private account"}
              </label>
              <p className="text-xs text-text-muted">
                {t("register.private_account_description")}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-sm text-blue-400">{t("register.no")}</p>
                <button
                  type="button"
                  {...register("is_private")}
                  onClick={(e) => {
                    e.preventDefault();
                    // Toggle logic will be handled by react-hook-form
                  }}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    false ? "bg-accent" : "bg-gray-300"
                  }`}
                  aria-pressed={false}
                  aria-label={
                    t("register.private_account") || "Private account"
                  }>
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform duration-300 ${
                      false ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>
                <p className="text-sm text-blue-400">{t("register.yes")}</p>
              </div>

              {errors.is_private && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.is_private.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register("terms")}
                  className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-xs text-text-secondary">
                  {t("register.terms_text")}
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-accent py-2.5 px-4 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50 transition-colors duration-200">
              {isSubmitting ? t("register.creating") : t("register.submit")}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-text-muted">
              {t("register.have_account")}{" "}
              <button
                type="button"
                className="font-medium text-accent hover:text-accent-hover transition-colors duration-200"
                onClick={() => navigate("/login")}>
                {t("register.sign_in")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
