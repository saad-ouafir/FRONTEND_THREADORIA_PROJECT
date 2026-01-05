import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const getStoredBlockInfo = () => {
  try {
    const stored = localStorage.getItem("rateLimitBlock");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed.blockedUntil ? parsed : null;
  } catch {
    return null;
  }
};

export const useRateLimitBlock = () => {
  const navigate = useNavigate();

  const blockInfo = useMemo(() => getStoredBlockInfo(), []);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Redirect if no block info
  useEffect(() => {
    if (!blockInfo) {
      localStorage.removeItem("rateLimitBlock");
      navigate("/", { replace: true });
    }
  }, [blockInfo, navigate]);

  // Countdown timer
  useEffect(() => {
    if (!blockInfo?.blockedUntil) return;

    const calculateRemaining = () => {
      const remaining = Math.max(0, blockInfo.blockedUntil - Date.now());
      setTimeRemaining(remaining);
      return remaining;
    };

    calculateRemaining();
    const interval = setInterval(() => {
      if (calculateRemaining() === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [blockInfo?.blockedUntil]);

  const formatTime = ms => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const handleContinue = () => {
    localStorage.removeItem("rateLimitBlock");
    navigate("/", { replace: true });
  };

  const isExpired = timeRemaining === 0;

  return {
    blockInfo,
    timeRemaining,
    isExpired,
    formatTime,
    handleContinue,
  };
};
