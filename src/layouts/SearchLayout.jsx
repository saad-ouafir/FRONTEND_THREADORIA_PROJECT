import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeaderComponent from "../components/HeaderComponent";
import SearchResultBar from "../components/Search/SearchResultBar";
import Pagination from "../components/UI/Pagination";
import UserCard from "../components/UI/UserCard";
import ThreadsCard from "../components/Threads/ThreadsCard";
import { useSearch } from "../hooks/api/useSearch";
import { useFollow } from "../hooks/api/useFollow";
import { useAlert } from "../hooks/states/useAlert";
import AlertMessage from "../components/UI/AlertMessage";
import { getFollowButtonConfig } from "../utils/profile/profileUtils";
import useProfile from "../hooks/states/useProfile";

export default function SearchLayout() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const currentUser = useProfile();
  const isAuthenticated = !!currentUser?.id;
  const { alert, setAlert, clearAlert } = useAlert();
  const { toggleFollow } = useFollow(setAlert);

  const {
    query,
    activeTab,
    loading,
    error,
    users,
    usersPagination,
    threads,
    threadsPagination,
    handleQueryChange,
    handleTabChange,
    executeSearch,
    goToPage,
  } = useSearch();

  // Execute search when URL params change or on initial load
  useEffect(() => {
    const urlQuery = searchParams.get("q");
    if (urlQuery) {
      handleQueryChange(urlQuery);
      executeSearch(urlQuery);
    }
  }, [searchParams, handleQueryChange, executeSearch]);

  const handleSearch = useCallback(
    searchQuery => {
      handleQueryChange(searchQuery);
      executeSearch(searchQuery);
    },
    [handleQueryChange, executeSearch],
  );

  const handleFollow = useCallback(
    async userId => {
      await toggleFollow(userId);
    },
    [toggleFollow],
  );

  const getButtonConfig = user => {
    return getFollowButtonConfig(isAuthenticated ? user.followStatus : null, t);
  };

  const currentPagination = activeTab === "users" ? usersPagination : threadsPagination;

  return (
    <div className="min-h-screen bg-bg-primary">
      <HeaderComponent page={"Search"} />

      {/* Search Bar */}
      <SearchResultBar onSearch={handleSearch} initialQuery={query} />

      {/* Error/Alert Messages */}
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={clearAlert} />}
      {error && <AlertMessage message={error} statusCode={500} onClose={() => {}} />}

      {/* Tabs */}
      <div className="mx-4 mt-4">
        <div className="flex border-b border-border">
          <button
            onClick={() => handleTabChange("users")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "users" ? "text-accent border-b-2 border-accent" : "text-text-muted hover:text-text-primary"
            }`}
          >
            {t("search.users") || "Users"}
          </button>
          <button
            onClick={() => handleTabChange("threads")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "threads"
                ? "text-accent border-b-2 border-accent"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            {t("search.threads") || "Threads"}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      )}

      {/* Results */}
      {!loading && (
        <div className="mx-4 mt-4">
          {activeTab === "users" ? (
            <>
              {users.length > 0 ? (
                <div className="space-y-2">
                  {users.map(user => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onAction={handleFollow}
                      size="lg"
                      actionButton={getButtonConfig(user)}
                      t={t}
                    />
                  ))}
                </div>
              ) : query ? (
                <div className="text-center py-8 text-text-muted">{t("search.no_users_found") || "No users found"}</div>
              ) : (
                <div className="text-center py-8 text-text-muted">
                  {t("search.search_for_users") || "Search for users by name or username"}
                </div>
              )}
            </>
          ) : (
            <>
              {threads.length > 0 ? (
                <ThreadsCard threads={threads} />
              ) : query ? (
                <div className="text-center py-8 text-text-muted">
                  {t("search.no_threads_found") || "No threads found"}
                </div>
              ) : (
                <div className="text-center py-8 text-text-muted">
                  {t("search.search_for_threads") || "Search for threads by content"}
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {currentPagination && currentPagination.totalPages > 1 && (
            <div className="mt-6 pb-4">
              <Pagination
                currentPage={currentPagination.currentPage}
                totalPages={currentPagination.totalPages}
                onPageChange={goToPage}
                hasNextPage={currentPagination.hasNextPage}
                hasPrevPage={currentPagination.hasPrevPage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
