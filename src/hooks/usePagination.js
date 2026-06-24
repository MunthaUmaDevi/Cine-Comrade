import { useState, useMemo } from "react";

const usePagination = (data, itemsPerPage = 4) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 🌟 Calculate the array of page numbers dynamically (e.g., [1, 2, 3, 4, 5])
  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }, [totalPages]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((prev) =>
      prev < totalPages ? prev + 1 : prev
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) =>
      prev > 1 ? prev - 1 : prev
    );
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 🌟 Added a helper to automatically handle page rollback if items are deleted
  const adjustPageOnDelete = (currentSubsetLength) => {
    if (currentSubsetLength === 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    pageNumbers, // 🌟 Exported here to map numbers in UI
    nextPage,
    prevPage,
    goToPage,
    adjustPageOnDelete, // 🌟 Exported for safe deletions
  };
};

export default usePagination;