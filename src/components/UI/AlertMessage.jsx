import { IoCheckmarkDoneCircleOutline, IoWarningOutline } from "react-icons/io5";
import { MdErrorOutline, MdOutlineInfo } from "react-icons/md";
import { HiOutlineXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";

export default function AlertMessage({ type, message, statusCode, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const getAlertTypeFromStatus = () => {
    if (!statusCode) return type;
    if (statusCode >= 200 && statusCode < 300) return "success";
    if (statusCode >= 300 && statusCode < 400) return "info";
    if (statusCode >= 400 && statusCode < 500) return "error";
    if (statusCode >= 500) return "error";
    return type;
  };

  const alertType = getAlertTypeFromStatus();

  const getDisplayMessage = () => {
    if (statusCode && !message.includes(`(${statusCode})`)) {
      return `${message}`;
    }
    return message;
  };

  useEffect(() => {
    if (!message) return;

    setIsVisible(true);
    setIsExiting(false);
    setCountdown(5);
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsVisible(false), 300);
    }, 5000);

    const countdownTimer = setInterval(() => {
      setCountdown(prev => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [message, statusCode]);

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
          bg: "bg-emerald-200",
          icon: "text-emerald-700",
          text: "text-emerald-700",
          iconComponent: IoCheckmarkDoneCircleOutline,
        };
      case "error":
        return {
          bg: "bg-red-200",
          icon: "text-red-700",
          text: "text-red-700",
          iconComponent: MdErrorOutline,
        };
      case "warning":
        return {
          bg: "bg-yellow-200",
          icon: "text-yellow-700",
          text: "text-yellow-700",
          iconComponent: IoWarningOutline,
        };

      case "info":
        return {
          bg: "bg-blue-200",
          icon: "text-blue-700",
          text: "text-blue-700",
          iconComponent: MdOutlineInfo,
        };
      default:
        return {
          bg: "bg-gray-200",
          icon: "text-gray-700",
          text: "text-gray-700",
          iconComponent: MdOutlineInfo,
        };
    }
  };

  const styles = getAlertStyles();
  const IconComponent = styles.iconComponent;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4">
      <div
        className={`p-4 ${
          styles.bg
        } flex items-center justify-between rounded-lg transition-all duration-300 transform ${
          isExiting ? "opacity-0 translate-x-full scale-95" : "opacity-100 translate-x-0 scale-100"
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <IconComponent className={`${styles.icon} text-[1.25rem] sm:text-[1.5rem] shrink-0`} />
          <p className={`${styles.text} text-sm sm:text-base font-semibold leading-tight`}>{getDisplayMessage()}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
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
