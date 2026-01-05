import { useRateLimitBlock } from "../hooks/security/useRateLimitBlock";
import BlockedView from "../components/Blocked/BlockedView";

export default function RateLimitBlocked() {
  const { blockInfo, timeRemaining, isExpired, formatTime, handleContinue } =
    useRateLimitBlock();

  if (!blockInfo) return null;

  return (
    <BlockedView
      isExpired={isExpired}
      timeRemaining={timeRemaining}
      formatTime={formatTime}
      handleContinue={handleContinue}
    />
  );
}
