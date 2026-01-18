import { FiShield, FiClock, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function BlockedView({ isExpired, timeRemaining, formatTime, handleContinue }) {
  const { t } = useTranslation();

  return (
    <div className=" bg-bg-primary flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg">
        {/* Main Card */}
        <div className="bg-bg-secondary rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
          {/* Header Gradient */}
          <div
            className={`h-2 ${
              isExpired ? "bg-linear-to-r from-green-500 to-emerald-500" : "bg-linear-to-r from-red-500 to-pink-500"
            }`}
          />

          <div className="p-8 sm:p-10">
            {/* Icon Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                {/* Icon container */}
                <div
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${
                    isExpired
                      ? "bg-green-500/10 border-2 border-green-500/30"
                      : "bg-red-500/10 border-2 border-red-500/30"
                  }`}
                >
                  {isExpired ? (
                    <FiCheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
                  ) : (
                    <FiAlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
                  )}
                </div>
              </div>

              {/* Title */}
              <h1
                className={`text-3xl sm:text-4xl font-bold mb-4 ${
                  isExpired ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {isExpired ? t("blocked.unblocked_title", "You're Free!") : t("blocked.title", "Access Restricted")}
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-text-secondary max-w-sm mx-auto leading-relaxed">
                {isExpired
                  ? t("blocked.unblocked_desc", "Welcome back! You can now continue using the app.")
                  : t("blocked.description", "Too many attempts detected. Please wait before trying again.")}
              </p>
            </div>

            {/* Timer Section */}
            {!isExpired && (
              <div className="bg-bg-tertiary/50 rounded-xl p-6 mb-8 border border-red-500/10">
                <div className="flex items-center justify-center gap-3 text-text-muted mb-4">
                  <FiClock className="w-5 h-5" />
                  <span className="font-medium">{t("blocked.wait_time", "Time Remaining")}</span>
                </div>

                {/* Timer Display */}
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-red-500 mb-2">
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="w-full bg-bg-primary rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-red-500 to-pink-500 transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.max(0, (timeRemaining / (15 * 60 * 1000)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleContinue}
              disabled={!isExpired}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                isExpired
                  ? "bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-bg-tertiary text-text-muted cursor-not-allowed"
              }`}
            >
              {isExpired ? t("blocked.continue", "Continue to App") : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
