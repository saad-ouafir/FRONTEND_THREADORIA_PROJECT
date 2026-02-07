import { useState, useCallback } from "react";
import { searchProfiles } from "../../api/profile.api";
import { searchThreads } from "../../api/thread.api";

/**
 * Custom hook for search functionality with pagination
 * Separates search logic from display components
 * @returns {Object} Search state and handlers
 */
export function useSearch() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("users"); // "users" or "threads"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Users search state
  const [users, setUsers] = useState([]);
  const [usersPagination, setUsersPagination] = useState(null);

  // Threads search state
  const [threads, setThreads] = useState([]);
  const [threadsPagination, setThreadsPagination] = useState(null);

  // Search users
  const searchUsers = useCallback(async (searchQuery, page = 1, limit = 10) => {
    if (!searchQuery?.trim()) {
      setUsers([]);
      setUsersPagination(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchProfiles(searchQuery, page, limit);
      setUsers(response.users || []);
      setUsersPagination(response.pagination || null);
    } catch (err) {
      setError(err.message || "Failed to search profiles");
      setUsers([]);
      setUsersPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search threads
  const searchThreadsHandler = useCallback(async (searchQuery, page = 1, limit = 10) => {
    if (!searchQuery?.trim()) {
      setThreads([]);
      setThreadsPagination(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchThreads(searchQuery, page, limit);
      setThreads(response.threads || []);
      setThreadsPagination(response.pagination || null);
    } catch (err) {
      setError(err.message || "Failed to search threads");
      setThreads([]);
      setThreadsPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Execute search based on active tab
  const executeSearch = useCallback(
    async (searchQuery = query, page = 1) => {
      if (!searchQuery?.trim()) return;

      if (activeTab === "users") {
        await searchUsers(searchQuery, page);
      } else {
        await searchThreadsHandler(searchQuery, page);
      }
    },
    [query, activeTab, searchUsers, searchThreadsHandler],
  );

  // Handle query change
  const handleQueryChange = useCallback(newQuery => {
    setQuery(newQuery);
  }, []);

  // Handle tab change
  const handleTabChange = useCallback(
    newTab => {
      setActiveTab(newTab);
      // Re-execute search with new tab if we have a query
      if (query?.trim()) {
        if (newTab === "users") {
          searchUsers(query);
        } else {
          searchThreadsHandler(query);
        }
      }
    },
    [query, searchUsers, searchThreadsHandler],
  );

  // Go to specific page
  const goToPage = useCallback(
    page => {
      executeSearch(query, page);
    },
    [query, executeSearch],
  );

  // Clear search results
  const clearSearch = useCallback(() => {
    setQuery("");
    setUsers([]);
    setThreads([]);
    setUsersPagination(null);
    setThreadsPagination(null);
    setError(null);
  }, []);

  return {
    // State
    query,
    activeTab,
    loading,
    error,
    users,
    usersPagination,
    threads,
    threadsPagination,

    // Actions
    handleQueryChange,
    handleTabChange,
    executeSearch,
    goToPage,
    clearSearch,
    searchUsers,
    searchThreads: searchThreadsHandler,
  };
}

export default useSearch;
