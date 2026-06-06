import React, { useState, useEffect } from "react";

export default function CustomPagination({ page, totalPages, onPageChange }) {
  const windowSize = 10;
  const [windowStartPage, setWindowStartPage] = useState(0);
  const lastWindowStart = Math.max(totalPages - windowSize, 0);

  useEffect(() => {
    // Move window if current page is outside of window
    if (page < windowStartPage) {
      setWindowStartPage(Math.max(page - windowSize + 1, 0));
    } else if (page >= windowStartPage + windowSize) {
      setWindowStartPage(Math.min(page, lastWindowStart));
    }
  }, [page, windowStartPage, lastWindowStart]);

  const startPage = windowStartPage;
  const endPage = Math.min(windowStartPage + windowSize, totalPages);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
      <button
        onClick={() => onPageChange(Math.max(page - 1, 0))}
        disabled={page === 0}
        style={{ margin: "0 5px", padding: "5px 10px" }}
      >
        Prev
      </button>

      {Array.from({ length: endPage - startPage }, (_, i) => {
        const pageNum = startPage + i;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            style={{
              margin: "0 3px",
              padding: "5px 10px",
              fontWeight: page === pageNum ? "bold" : "normal",
              backgroundColor: page === pageNum ? "#ddd" : "white",
            }}
          >
            {pageNum + 1}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
        disabled={page >= totalPages - 1}
        style={{ margin: "0 5px", padding: "5px 10px" }}
      >
        Next
      </button>
    </div>
  );
}
