import React from "react";
import "../assets/styles/pageOrder.css";

const pageOrder = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="pageOrder-container">
      <button
        className="pageOrder-btn"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`pageOrder-btn${page === currentPage ? " active" : ""}`}
            onClick={() => handlePageClick(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        )
      )}
      <button
        className="pageOrder-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default pageOrder;
