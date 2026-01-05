import { FiShield, FiClock } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function BlockedView({
  isExpired,
  timeRemaining,
  formatTime,
  handleContinue,
}) {
  const { t } = useTranslation();

  return (
    <div className="mt-8 bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Icon with neon effect */}
        <div className="relative inline-block mb-6">
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-50"
            style={{ backgroundColor: isExpired ? "#22c55e" : "#ef4444" }}
          />
          <div
            className={`relative p-5 rounded-full border-2 ${
              isExpired
                ? "bg-green-500/10 border-green-500"
                : "bg-red-500/10 border-red-500"
            }`}
          >
            <FiShield
              className={`w-10 h-10 ${
                isExpired ? "text-green-500" : "text-red-500"
              }`}
            />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-2xl font-bold mb-3 ${
            isExpired ? "text-green-500" : "text-red-500"
          }`}
        >
          {isExpired
            ? t("blocked.unblocked_title", "You're unblocked!")
            : t("blocked.title", "Temporarily Blocked")}
        </h1>

        {/* Description */}
        <p className="text-text-secondary mb-6">
          {isExpired
            ? t("blocked.unblocked_desc", "You can now continue using the app.")
            : t(
                "blocked.description",
                "Too many attempts. Please wait before trying again."
              )}
        </p>

        {/* Timer */}
        {!isExpired && (
          <div className="bg-bg-secondary rounded-xl p-5 mb-6 border border-red-500/20">
            <div className="flex items-center justify-center gap-2 text-text-muted text-sm mb-2">
              <FiClock className="w-4 h-4" />
              <span>{t("blocked.wait_time", "Wait time")}</span>
            </div>
            <p className="text-3xl font-mono font-bold text-red-500">
              {formatTime(timeRemaining)}
            </p>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleContinue}
          disabled={!isExpired}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
            isExpired
              ? "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
              : "bg-bg-tertiary text-text-muted cursor-not-allowed"
          }`}
        >
          {isExpired
            ? t("blocked.continue", "Continue")
            : t("blocked.please_wait", "Please wait...")}
        </button>
      </div>
    </div>
  );
}
