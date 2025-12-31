import { useState } from "react";

export function useEditableField(initialValue, onSave) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(initialValue);

  const handleEdit = () => {
    setDraft(initialValue);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(initialValue);
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave(draft);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return {
    isEditing,
    draft,
    setDraft,
    handlers: {
      handleEdit,
      handleCancel,
      handleSave,
      handleKeyDown,
    },
  };
}
