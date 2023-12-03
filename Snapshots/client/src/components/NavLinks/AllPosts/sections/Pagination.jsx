import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <nav className="flex justify-center mt-4 mb-10">
      <ul className="flex">
        {getPageNumbers().map((pageNumber) => (
          <li
            key={pageNumber}
            className={`mx-1 px-3 py-2 ${
              pageNumber === currentPage
                ? 'bg-[#00ADB5] text-white'
                : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
            } cursor-pointer rounded-full`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
