import { useState, useEffect, useCallback } from "react";
import { createPaginationState, updatePaginationState, buildPaginationParams } from "../../handlers/paginationHandler";

export function usePaginatedFetch(setAlert, fetchFunction, additionalParams = {}, initialLimit = 10) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(createPaginationState(initialLimit));

  const fetchPage = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setAlert(null);

        const params = {
          ...additionalParams,
          ...buildPaginationParams(page, pagination.itemsPerPage),
        };

        const response = await fetchFunction(params);

        // Handle different response structures
        const responseData = response.data || response.notifications || response.items || [];
        setData(responseData);

        if (response.pagination) {
          setPagination(updatePaginationState(response.pagination));
        }

        return response;
      } catch (error) {
        setData([]);
        setAlert({
          message: error.message || "Failed to fetch data",
          statusCode: error.status || 500,
        });
        console.error("Pagination fetch error:", error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction, additionalParams, pagination.itemsPerPage, setAlert],
  );

  // Fetch first page on mount
  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Go to next page
  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      fetchPage(pagination.currentPage + 1);
    }
  }, [pagination, fetchPage]);

  // Go to previous page
  const prevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      fetchPage(pagination.currentPage - 1);
    }
  }, [pagination, fetchPage]);

  // Go to specific page
  const goToPage = useCallback(
    page => {
      if (page >= 1 && page <= pagination.totalPages) {
        fetchPage(page);
      }
    },
    [pagination.totalPages, fetchPage],
  );

  // Refresh current page
  const refresh = useCallback(() => {
    fetchPage(pagination.currentPage);
  }, [pagination.currentPage, fetchPage]);

  return {
    data,
    loading,
    pagination,
    fetchPage,
    nextPage,
    prevPage,
    goToPage,
    refresh,
  };
}

export default usePaginatedFetch;
