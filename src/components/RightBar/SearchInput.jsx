import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function SearchInput({ query, onSearch }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(query || "");

  const handleSubmit = useCallback(
    e => {
      e?.preventDefault();
      if (searchQuery.trim()) {
        // If onSearch callback is provided, use it (for embedded search)
        if (onSearch) {
          onSearch(searchQuery.trim());
        } else {
          // Otherwise navigate to search page
          navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
      }
    },
    [searchQuery, navigate, onSearch],
  );

  const handleKeyDown = useCallback(
    e => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    },
    [handleSubmit],
  );

  return (
    <div className="border-b border-border mb-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("rightbar.search_by_name_or_tag")}
          className="w-full ps-2 pe-20 py-2.5 text-sm border border-border rounded-md bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white absolute inset-y-1 right-1 px-3 text-xs font-medium rounded-md transition-colors"
        >
          {t("rightbar.search")}
        </button>
      </div>
    </div>
  );
}
