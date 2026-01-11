import { useState } from "react";
import { useTranslation } from "react-i18next";
export default function SearchInput({ query }) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(query || "");

  const handleSubmit = () => {
    // TODO: plug your search logic here
    console.log("Search:", searchQuery);
  };

  return (
    <div className="border-b border-border mb-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
          }}
          placeholder={t("rightbar.search_by_name_or_tag")}
          className="w-full ps-2 pe-20 py-2.5 text-sm border border-border rounded-md bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-0 focus:border-transparent transition-colors"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white absolute inset-y-1 right-1 px-3 text-xs font-medium rounded-md border border-border"
        >
          {t("rightbar.search")}
        </button>
      </div>
    </div>
  );
}
