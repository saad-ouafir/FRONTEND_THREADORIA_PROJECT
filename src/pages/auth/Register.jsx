// src/pages/SignupPage.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle signup (create account)
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg shadow-neutral-200/60 dark:shadow-black/40 px-8 py-10">
          {/* Logo / Title */}
          <div className="mb-8 text-center">
           
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("register.create_account")}
            </h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {t("register.subtitle")}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                {t("register.full_name")}
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/80 focus:border-neutral-900/80 dark:focus:ring-neutral-100/80 dark:focus:border-neutral-100/80"
                  placeholder={t("register.full_name_placeholder")}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                {t("register.email")}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/80 focus:border-neutral-900/80 dark:focus:ring-neutral-100/80 dark:focus:border-neutral-100/80"
                  placeholder={t("register.email_placeholder")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
                >
                  {t("register.password")}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  {showPassword ? t("register.hide") : t("register.show")}
                </button>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/80 focus:border-neutral-900/80 dark:focus:ring-neutral-100/80 dark:focus:border-neutral-100/80"
                  placeholder={t("register.password_placeholder")}
                />
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
                >
                  {t("register.confirm_password")}
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  {showConfirm ? t("register.hide") : t("register.show")}
                </button>
              </div>
              <div className="mt-1">
                <input
                  id="passwordConfirm"
                  type={showConfirm ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/80 focus:border-neutral-900/80 dark:focus:ring-neutral-100/80 dark:focus:border-neutral-100/80"
                  placeholder={t("register.password_placeholder")}
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 rounded border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 focus:ring-neutral-900 dark:focus:ring-neutral-100"
              />
              <label
                htmlFor="terms"
                className="text-xs text-neutral-600 dark:text-neutral-300"
              >
                {t("register.terms_text")}
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-lg bg-blue-900  text-sm font-medium text-white py-2.5 shadow-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:ring-neutral-100 dark:focus:ring-offset-neutral-900"
            >
              {t("register.submit")}
            </button>
          </form>

          {/* Footer text */}
          <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
            {t("register.have_account")}{" "}
            <button
              type="button"
              className="font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
            >
              {t("register.sign_in")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
