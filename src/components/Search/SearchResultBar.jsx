import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchResultBar({ query }) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(query || "");

  const handleSubmit = () => {};

  return (
    <div className="mx-4 mt-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t("rightbar.search_by_name_or_tag")}
          className="w-full ps-4 pe-14 py-3 px-8 p-2 text-sm text-text-primary border border-border rounded-lg bg-bg-secondary/10 focus:border-transparent "
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
