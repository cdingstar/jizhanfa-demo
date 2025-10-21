import React from 'react';

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  totalItems,
  itemType,
  onPrevPage, 
  onNextPage, 
  onPageClick 
}) => {
  return (
    <div className="pagination-controls">
      <div className="pagination-info">
        共 {totalItems} {itemType}，第 {currentPage + 1}/{totalPages} 页
      </div>
      
      <div className="pagination-buttons">
        <button 
          className="page-btn prev" 
          onClick={onPrevPage}
          disabled={currentPage === 0}
        >
          ← 上一页
        </button>
        
        <div className="page-indicators">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-indicator ${i === currentPage ? 'active' : ''}`}
              onClick={() => onPageClick(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        
        <button 
          className="page-btn next" 
          onClick={onNextPage}
          disabled={currentPage === totalPages - 1}
        >
          下一页 →
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;