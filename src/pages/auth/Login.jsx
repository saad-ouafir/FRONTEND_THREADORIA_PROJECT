import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/api/useAuth.js";
import AlertMessage from "../../components/UI/AlertMessage.jsx";
import { useValidateLoginForm } from "../../hooks/forms/useFormValidator.js";
import useFormSubmitter from "../../hooks/forms/useFormSubmitter.js";

import { login as loginApi } from "../../api/auth.api.js";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useValidateLoginForm();

  const { alert, isSubmitting, submit, clearAlert } = useFormSubmitter(
    loginApi,
    {
      successMessage: t("login.success"),
      onSuccess: (response) => {
        login(response.accessToken, response.user);
        navigate("/home");
      },
    }
  );

  const onSubmit = async (data) => {
    await submit(data);
  };

  return (
    <div className="h-full mt-8 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {alert && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            statusCode={alert.statusCode}
            onClose={clearAlert}
          />
        )}
        <div className="bg-bg-secondary border border-border rounded-2xl shadow-lg px-8 py-10">
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
              {t("login.welcome_back")}
            </h1>
            <p className="mt-1 text-sm text-text-muted">
              {t("login.subtitle")}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary">
                {t("login.email")}
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.email ? "border-red-500" : "border-border"
                } bg-bg-tertiary text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-text-muted`}
                placeholder={t("login.email_placeholder")}
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
                  {t("login.password")}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-xs text-text-muted hover:text-text-primary">
                  {showPassword ? t("login.hide") : t("login.show")}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.password ? "border-red-500" : "border-border"
                } bg-bg-tertiary text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-text-muted`}
                placeholder={t("login.password_placeholder")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-xs text-text-muted hover:text-text-primary">
                {t("login.forgot_password")}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-accent py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50">
              {isSubmitting ? t("login.signing_in") : t("login.sign_in")}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-text-muted">
            {t("login.no_account")}{" "}
            <button
              type="button"
              className="font-medium text-accent hover:text-accent-hover"
              onClick={() => navigate("/auth/register")}>
              {t("login.create_account")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
