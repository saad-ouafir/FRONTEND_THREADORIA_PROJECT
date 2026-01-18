import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ConfirmationBox = ({ message, onClose, onConfirm }) => {
  const { t } = useTranslation();

  // Close dialog on Escape key
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleEscape);
    // Prevent body scroll when dialog is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="max-w-md w-[90vw] bg-bg-secondary border border-border rounded-lg shadow-lg relative z-10 px-4 sm:px-6 py-4 sm:py-5"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-text-primary mb-3">Attention !</h2>
        <p className="text-sm sm:text-base text-text-muted mb-4 sm:mb-5">{message}</p>
        <div className="w-full flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-border text-sm sm:text-base font-medium text-text-primary bg-bg-tertiary hover:bg-bg-tertiary/80 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
            onClick={onClose}
          >
            {t("ConfirmationBox.cancel") || "Cancel"}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-sm sm:text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-colors"
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
          >
            {t("ConfirmationBox.confirm") || "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
