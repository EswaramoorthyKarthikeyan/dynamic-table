import React from "react"

import "./pagination.css"

const Pagination = ({ data, paginationFn }) => {
  //   paginatioln click function
  const paginationFuntion = (currentPage) => paginationFn(currentPage)

  //   // Pagination ellipsis
  const showPage = (currentPage, pageIndex) =>
    pageIndex <= currentPage + 1 && pageIndex >= currentPage - 1 ? true : false

  return (
    <ul className={`${data.pagination.length <= 1 ? "pagination-list hide" : "pagination-list"}`}>
      <li className={`${data.currentPage === 1 ? "disabled" : ""}`} onClick={() => paginationFuntion(1)}>{`First`}</li>
      <li
        className={`${data.currentPage === 1 ? "disabled" : ""}`}
        onClick={() => paginationFuntion(data.currentPage - 1)}
      >
        {`Prev`}
      </li>
      <li className={`spacer ${data.currentPage === 1 || data.currentPage === 2 ? "hide" : "show"}`}>
        <span>...</span>
      </li>
      {data.pagination.map((page, pageIndex) => {
        return (
          <li
            key={pageIndex}
            className={`${data.currentPage === pageIndex + 1 ? "active" : ""} ${
              showPage(data.currentPage, pageIndex + 1) ? "show" : "hide"
            }`}
            onClick={() => paginationFuntion(page + 1)}
          >
            {`  ${page + 1} `}
          </li>
        )
      })}
      <li
        className={`spacer ${
          data.currentPage === data.pagination.length || data.currentPage === data.pagination.length - 1
            ? "hide"
            : "show"
        }`}
      >
        <span>...</span>
      </li>
      <li
        className={`${data.currentPage === Math.ceil(data.tableBody.length / data.itemsPerPage) ? "disabled" : ""}`}
        onClick={() => paginationFuntion(data.currentPage + 1)}
      >
        {`Next`}
      </li>
      <li
        className={`${data.currentPage === Math.ceil(data.tableBody.length / data.itemsPerPage) ? "disabled" : ""}`}
        onClick={() => paginationFuntion(Math.ceil(data.tableBody.length / data.itemsPerPage))}
      >
        {`Last`}
      </li>
    </ul>
  )
}
export default Pagination
