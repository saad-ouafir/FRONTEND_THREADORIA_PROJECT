import { useState } from "react";

export function useProfilePicture() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // handle upload externally
    setTimeout(() => setIsUploading(false), 800);
  };

  return {
    isUploading,
    handlers: {
      handleUpload,
    },
  };
}
