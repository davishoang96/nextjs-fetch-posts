import React from 'react';

function Pagination({ currentPage, totalPages, handleNextPage, handlePreviousPage }) {
  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        <li className="page-item">
          <span className="page-link">
            Page {currentPage} of {totalPages}
          </span>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
