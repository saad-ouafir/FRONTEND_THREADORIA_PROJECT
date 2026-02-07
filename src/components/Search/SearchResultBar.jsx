import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

/**
 * SearchResultBar - Search input component
 * @param {Function} onSearch - Callback when search is submitted
 * @param {string} initialQuery - Initial search query
 */
export default function SearchResultBar({ onSearch, initialQuery = "" }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  // Derive initial value from URL params or props
  const urlQuery = searchParams.get("q");
  const [searchQuery, setSearchQuery] = useState(() => urlQuery || initialQuery || "");

  // Use the URL query as the source of truth when it changes
  const displayQuery = urlQuery || searchQuery;

  const handleSubmit = useCallback(
    e => {
      e?.preventDefault();
      if (searchQuery.trim()) {
        // Update URL params
        setSearchParams({ q: searchQuery.trim() });
        // Call onSearch callback
        onSearch?.(searchQuery.trim());
      }
    },
    [searchQuery, setSearchParams, onSearch],
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
    <div className="mx-4 mt-4">
      <div className="relative">
        <input
          type="text"
          value={displayQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("rightbar.search_by_name_or_tag")}
          className="w-full ps-4 pe-14 py-3 px-8 p-2 text-sm text-text-primary border border-border rounded-lg bg-bg-secondary/10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent/50"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="absolute inset-y-1 right-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-xs font-medium rounded-md shadow-sm transition-colors"
        >
          {t("rightbar.search")}
        </button>
      </div>
    </div>
  );
}
