import { useState } from "react";
const parseSearchQuery = (query) => {
  const tagMatch = query.match(/#(\w+)/);
  const searchTerm = query.replace(/#\w+/, "").trim();

  return {
    tag: tagMatch ? tagMatch[1].toLowerCase() : null,
    searchTerm: searchTerm.toLowerCase(),
  };
};

// Filter users based on search query
const filteredUsers = suggestedUsers.filter((user) => {
  if (!searchQuery.trim()) return true;

  const { tag, searchTerm } = parseSearchQuery(searchQuery);

  // If tag is present, filter by tag
  if (tag) {
    return user.tags.some((userTag) => userTag.toLowerCase().includes(tag));
  }

  // Otherwise search by name or username
  return (
    user.name.toLowerCase().includes(searchTerm) ||
    user.username.toLowerCase().includes(searchTerm)
  );
});
export default function SearchInput() {
  return (
    <div className="px-4 py-3 border-b border-border">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("rightbar.search_by_name_or_tag")}
          className="w-full px-3 py-2 pr-9 text-sm border border-border rounded-lg bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
        />
        <svg
          className="absolute right-3 top-2.5 w-4 h-4 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {searchQuery.includes("#") && (
        <p className="mt-2 text-xs text-text-muted">
          {t("rightbar.searching_by_tag", {
            tag: searchQuery.match(/#(\w+)/)?.[1],
          })}
        </p>
      )}
    </div>
  );
}
