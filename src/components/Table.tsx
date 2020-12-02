import React from "react"
import "./css/table.css"

function Table({ header, tableData, sortFn }) {
  // Dynamic sort function
  const dynamicSort = (property) => {
    var sortOrder = 1
    if (property[0] === "-") {
      sortOrder = -1
      property = property.substr(1)
    }
    return function (a, b) {
      let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      return result * sortOrder
    }
  }

  // Sort function
  const sort = (index) => {
    let sortType = ""
    if (index === tableData.sortIndex[0] && tableData.sortIndex[1] === "Asc") {
      tableData.tableBody.sort(dynamicSort(header[index]["template_name"])).reverse()
      sortType = "Dec"
    } else {
      tableData.tableBody.sort(dynamicSort(header[index]["template_name"]))
      sortType = "Asc"
    }
    sortFn(index, sortType, tableData.tableBody)
  }

  //Header template rendering
  const Header = header.map((header, headerIndex) => {
    return (
      <th key={headerIndex} onClick={() => sort(headerIndex)}>
        {header.header_name}
        <span className={`${headerIndex === tableData.sortIndex[0] ? "active" : ""} ${tableData.sortIndex[1]}`}>
          {`>`}
        </span>
      </th>
    )
  })

  return (
    <table className="table" cellPadding="10px">
      <thead>
        <tr>{Header}</tr>
      </thead>
      <tbody>
        {tableData.templateData.length === 0 ? (
          <tr>
            <td colSpan={header.length} style={{ textAlign: "center" }}>
              {`No results found`}
            </td>
          </tr>
        ) : (
          tableData.templateData &&
          tableData.templateData.map((bodyData, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {header.map((head, dataIndex) => {
                  return <td key={`${rowIndex}${dataIndex}`}> {bodyData[head.template_name]} </td>
                })}
              </tr>
            )
          })
        )}
      </tbody>
    </table>
  )
}

export default Table
