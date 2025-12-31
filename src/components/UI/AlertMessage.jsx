import {
  IoCheckmarkDoneCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { MdErrorOutline, MdOutlineInfo } from "react-icons/md";
import { HiOutlineXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";

export default function AlertMessage({ type, message, statusCode, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Auto-determine alert type based on status code
  const getAlertTypeFromStatus = () => {
    if (!statusCode) return type;

    if (statusCode >= 200 && statusCode < 300) {
      return "success";
    } else if (statusCode >= 300 && statusCode < 400) {
      return "info";
    } else if (statusCode >= 400 && statusCode < 500) {
      return "error";
    } else if (statusCode >= 500) {
      return "error";
    }
    return type;
  };

  const alertType = getAlertTypeFromStatus();

  // Format message to include status code if provided
  const getDisplayMessage = () => {
    if (statusCode && !message.includes(`(${statusCode})`)) {
      return `${message}`;
    }
    return message;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsVisible(false), 300);
    }, 5000);

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    if (onClose) onClose();
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;
  const getAlertStyles = () => {
    switch (alertType) {
      case "success":
        return {
          bg: "bg-emerald-500/10",
          icon: "text-emerald-600",
          text: "text-emerald-600",
          iconComponent: IoCheckmarkDoneCircleOutline,
        };
      case "error":
        return {
          bg: "bg-red-500/10",
          icon: "text-red-600",
          text: "text-red-600",
          iconComponent: MdErrorOutline,
        };
      case "warning":
        return {
          bg: "bg-yellow-500/10",
          icon: "text-yellow-600",
          text: "text-yellow-600",
          iconComponent: IoWarningOutline,
        };

      case "info":
        return {
          bg: "bg-blue-500/10",
          // border: "border-blue-500",
          icon: "text-blue-600",
          text: "text-blue-600",
          iconComponent: MdOutlineInfo,
        };
      default:
        return {
          bg: "bg-gray-500/10",
          icon: "text-gray-600",
          text: "text-gray-600",
          iconComponent: MdOutlineInfo,
        };
    }
  };

  const styles = getAlertStyles();
  const IconComponent = styles.iconComponent;

  return (
    <div className="w-full mb-4 px-4 ">
      <div
        className={`p-4 ${
          styles.bg
        } flex items-center justify-between rounded-lg shadow-md transition-all duration-300 transform ${
          isExiting
            ? "opacity-0 translate-x-full scale-95"
            : "opacity-100 translate-x-0 scale-100"
        }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <IconComponent
            className={`${styles.icon} text-[1.25rem] sm:text-[1.5rem] flex-shrink-0`}
          />
          <p
            className={`${styles.text} text-sm sm:text-base font-semibold leading-tight`}>
            {getDisplayMessage()}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          <div className={`text-lg ${styles.text}`}>{countdown}s</div>
          <HiOutlineXMark
            onClick={handleClose}
            className={`${styles.icon} text-[1.25rem] sm:text-[1.5rem] p-1 rounded-full hover:bg-current/20 cursor-pointer active:scale-[0.9] transition-all duration-200`}
          />
        </div>
      </div>
    </div>
  );
}
