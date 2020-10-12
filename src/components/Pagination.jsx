import React from "react";

const Pagination = ({ totalPage, gotoPage, currentPage }) => {
  return (
    <nav aria-label="...">
      <ul className="pagination pagination-lg">
        {[...Array(totalPage).keys()].map((index) => (
          <li key={index} className={(currentPage == index + 1)? "page-item active" : "page-item" }>
            <a
              className="page-link"
              tabIndex="-1"
              href="#"
              onClick={() => gotoPage(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
