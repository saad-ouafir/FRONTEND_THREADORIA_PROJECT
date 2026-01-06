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
          className="w-full ps-2 pe-20 py-2.5 text-sm border border-border rounded-md bg-surface text-text-primary placeholder-text-muted outline-none focus:outline-none focus:ring-0 focus:border-accent/70 transition-colors"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-00 text-white absolute inset-y-1 right-1 px-3 text-xs font-medium rounded-md border border-border hover:text-text-primary hover:border-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-1 focus-visible:ring-offset-surface transition-colors"
        >
          {t("rightbar.search")}
        </button>
      </div>
    </div>
  );
}
