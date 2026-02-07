const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export function createPaginationState(limit = DEFAULT_LIMIT) {
  return {
    currentPage: DEFAULT_PAGE,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: limit,
    hasNextPage: false,
    hasPrevPage: false,
  };
}

export function updatePaginationState(paginationResponse) {
  if (!paginationResponse) {
    return createPaginationState();
  }

  return {
    currentPage: paginationResponse.currentPage || DEFAULT_PAGE,
    totalPages: paginationResponse.totalPages || 0,
    totalItems: paginationResponse.totalItems || 0,
    itemsPerPage: paginationResponse.itemsPerPage || DEFAULT_LIMIT,
    hasNextPage: paginationResponse.hasNextPage || false,
    hasPrevPage: paginationResponse.hasPrevPage || false,
  };
}

export function getVisiblePageNumbers(currentPage, totalPages, maxVisible = 5) {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function buildPaginationParams(page, limit = DEFAULT_LIMIT) {
  return { page, limit };
}

export default {
  createPaginationState,
  updatePaginationState,
  getVisiblePageNumbers,
  buildPaginationParams,
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
};
