import { useContext } from "react";
import { FollowSyncContext } from "./followSyncContext.js";

export function useFollowSync() {
  const context = useContext(FollowSyncContext);
  if (!context) {
    return {
      subscribe: () => () => {},
      notifyFollowChange: () => {},
    };
  }
  return context;
}
