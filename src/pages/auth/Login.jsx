import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm.js";
import { validateLogin } from "../../utils/authValidation.js";
import { login } from "../../api/auth.api.js";
import AlertMessage from "../../components/UI/AlertMessage.jsx";
import submitHandler from "../../handlers/submitHandler.js";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const { t } = useTranslation();

  const { values, errors, setErrors, isLoading, setIsLoading, handleChange } =
    useForm({ email: "", password: "", rememberMe: false });

  const handleSubmit = (e) => {
    submitHandler({
      e,
      values,
      validate: validateLogin,
      setErrors,
      apiCall: login,
      setAlert,
      setIsLoading,
      onSuccess: () => navigate("/home"),
    });
  };

  return (
    <div className="h-full mt-8 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {alert && (
          <AlertMessage
            type={alert.type}
            message={alert.message}
            statusCode={alert.statusCode}
            onClose={() => setAlert(null)}
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary">
                {t("login.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.email ? "border-red-500" : "border-border"
                } bg-bg-tertiary text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-text-muted`}
                placeholder={t("login.email_placeholder")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
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
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  errors.password ? "border-red-500" : "border-border"
                } bg-bg-tertiary text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-text-muted`}
                placeholder={t("login.password_placeholder")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-text-secondary">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                />
                <span>{t("login.remember_me")}</span>
              </label>
              <button
                type="button"
                className="text-xs text-text-muted hover:text-text-primary">
                {t("login.forgot_password")}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-accent py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-50">
              {isLoading ? t("login.signing_in") : t("login.sign_in")}
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
