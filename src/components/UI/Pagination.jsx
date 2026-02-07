import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { getVisiblePageNumbers } from "../../handlers/paginationHandler";
export default function Pagination({ pagination, onPageChange, loading = false, showInfo = true }) {
  const { currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, hasPrevPage } = pagination;

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePageNumbers(currentPage, totalPages, 5);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3">
      {/* Pagination Info */}
      {showInfo && (
        <p className="text-sm text-text-muted">
          Showing <span className="font-medium text-text-secondary">{startItem}</span> to{" "}
          <span className="font-medium text-text-secondary">{endItem}</span> of{" "}
          <span className="font-medium text-text-secondary">{totalItems}</span> results
        </p>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* First Page Button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={!hasPrevPage || loading}
          className="p-2 rounded-lg border border-border hover:border-accent/30 hover:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="First page"
        >
          <FiChevronsLeft className="w-4 h-4 text-text-secondary" />
        </button>

        {/* Previous Page Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage || loading}
          className="p-2 rounded-lg border border-border hover:border-accent/30 hover:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Previous page"
        >
          <FiChevronLeft className="w-4 h-4 text-text-secondary" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-1">
          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                disabled={loading}
                className="min-w-9 h-9 px-3 rounded-lg border border-border hover:border-accent/30 hover:bg-bg-tertiary text-sm text-text-secondary transition-all"
              >
                1
              </button>
              {visiblePages[0] > 2 && <span className="px-1 text-text-muted">...</span>}
            </>
          )}

          {visiblePages.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={loading}
              className={`min-w-9 h-9 px-3 rounded-lg border text-sm transition-all ${
                page === currentPage
                  ? "bg-accent border-accent text-white font-medium"
                  : "border-border hover:border-accent/30 hover:bg-bg-tertiary text-text-secondary"
              }`}
            >
              {page}
            </button>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-1 text-text-muted">...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                disabled={loading}
                className="min-w-9 h-9 px-3 rounded-lg border border-border hover:border-accent/30 hover:bg-bg-tertiary text-sm text-text-secondary transition-all"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage || loading}
          className="p-2 rounded-lg border border-border hover:border-accent/30 hover:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Next page"
        >
          <FiChevronRight className="w-4 h-4 text-text-secondary" />
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={!hasNextPage || loading}
          className="p-2 rounded-lg border border-border hover:border-accent/30 hover:bg-bg-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Last page"
        >
          <FiChevronsRight className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
    </div>
  );
}
