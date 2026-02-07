import { useState, useEffect, useCallback } from "react";
import { suggestThreads } from "../../api/thread.api";
import ThreadsCard from "./ThreadsCard";
import Pagination from "../UI/Pagination";

/**
 * SuggestedThreads - Component with pagination support for home feed
 * @param {number} refreshTrigger - Trigger to refresh threads
 */
export default function SuggestedThreads({ refreshTrigger }) {
  const [threads, setThreads] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchThreads = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const response = await suggestThreads(null, page, 10);
      setThreads(response.threads || []);
      setPagination(response.pagination || null);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching threads:", error);
      setThreads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThreads(1);
  }, [refreshTrigger, fetchThreads]);

  const handlePageChange = useCallback(
    page => {
      fetchThreads(page);
      // Scroll to top of threads
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [fetchThreads],
  );

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div>
      <ThreadsCard threads={threads} />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="py-4 px-4">
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
          />
        </div>
      )}
    </div>
  );
}
