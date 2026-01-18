import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto backdrop-blur-sm">
      {/* Backdrop */}
      <div className="fixed inset-0 transition-opacity duration-300 opacity-20" onClick={onClose} aria-hidden="true" />

      {/* Modal Content */}
      <div className="relative bg-bg-secondary rounded-lg shadow-xl w-2/5 mx-4 h-fit overflow-y-auto z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Body - Renders the passed component */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
