import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ThreadsCard from "../Threads/ThreadsCard";
import Pagination from "../UI/Pagination";
import AlertMessage from "../UI/AlertMessage";
import { getThreadsByUserID } from "../../api/thread.api";
import useProfile from "../../hooks/states/useProfile";

/**
 * ProfileThreads - Displays user's threads with pagination
 */
export default function ProfileThreads() {
  const [alert, setAlert] = useState(null);
  const [threads, setThreads] = useState([]);
  const [forbidden, setForbidden] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { id: userID } = useParams();
  const user = useProfile();

  // Determine which user ID to use
  const effectiveUserId = window.location.pathname === "/profile" ? user?.id : userID;

  const fetchThreads = useCallback(
    async (page = 1) => {
      if (!effectiveUserId) return;

      try {
        setLoading(true);
        const response = await getThreadsByUserID(effectiveUserId, page, 10);

        if (response.forbidden) {
          setForbidden(true);
          setThreads([]);
        } else {
          setForbidden(false);
          setThreads(response.threads || []);
          setPagination(response.pagination || null);
        }
        setCurrentPage(page);
      } catch (error) {
        setAlert({
          message: error.message || "Failed to fetch threads",
          statusCode: error.status || 500,
        });
        setThreads([]);
      } finally {
        setLoading(false);
      }
    },
    [effectiveUserId],
  );

  useEffect(() => {
    fetchThreads(1);
  }, [fetchThreads]);

  const handlePageChange = useCallback(
    page => {
      fetchThreads(page);
      // Scroll to top of thread section
      window.scrollTo({ top: 200, behavior: "smooth" });
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
      {alert && <AlertMessage message={alert.message} statusCode={alert.statusCode} onClose={() => setAlert(null)} />}

      <ThreadsCard threads={threads} allowDelete={true} forbidden={forbidden} />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && !forbidden && (
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
