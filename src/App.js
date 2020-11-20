import "./App.css"
import { useState } from "react"
import { table } from "./placeholderData"

function App() {
  //table header
  const tableHeader = table.header

  const [filterData, setFilterData] = useState(table.body)

  // initialState
  const [templateData, setTemplateData] = useState({
    itemsPerPage: table.itemsPerPage,
    currentPage: 1,
    templateData: filterData.slice(0, table.itemsPerPage),
    pagination: Array.from(Array(Math.ceil(filterData.length / table.itemsPerPage)).keys()),
    sortIndex: [table.defaultSort, "Asc"],
  })

  //Header template rendering
  const Header = tableHeader.map((header, headerIndex) => {
    return (
      <th key={headerIndex} onClick={() => sort(headerIndex)}>
        {header.header_name}
        <span className={`${headerIndex === templateData.sortIndex[0] ? "active" : ""} ${templateData.sortIndex[1]}`}>
          {`>`}
        </span>
      </th>
    )
  })

  const templateDataBuilder = (itemsPerPage, currentPage) =>
    filterData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Jump to page function

  const jumptoPage = (event) => {
    const targetValue = parseInt(event.target.value)
    targetValue &&
      targetValue !== templateData.currentPage &&
      setTemplateData((prev) => {
        return {
          ...prev,
          currentPage: targetValue,
          templateData: templateDataBuilder(prev.itemsPerPage, targetValue),
        }
      })
  }

  const paginationOnClick = (currentPage, templateData) => {
    setTemplateData((prev) => {
      return {
        ...prev,
        currentPage,
        templateData,
      }
    })
  }

  function dynamicSort(property) {
    var sortOrder = 1
    if (property[0] === "-") {
      sortOrder = -1
      property = property.substr(1)
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      return result * sortOrder
    }
  }

  const sort = (index) => {
    let sortType = ""
    if (index === templateData.sortIndex[0] && templateData.sortIndex[1] === "Asc") {
      filterData.sort(dynamicSort(table.header[index]["template_name"])).reverse()
      sortType = "Dec"
    } else {
      filterData.sort(dynamicSort(table.header[index]["template_name"]))
      sortType = "Asc"
    }

    setTemplateData((prev) => {
      return {
        ...prev,
        templateData: templateDataBuilder(prev.itemsPerPage, prev.currentPage),
        sortIndex: [index, sortType],
      }
    })
  }

  const performSearch = (event) => {
    let tableData = []

    if (event.target.value) {
      let Data = filterData.length > 0 ? filterData : table.body
      tableData = Data.filter((row) => {
        let values = Object.values(row).map((v) => {
          return ("" + v).toLowerCase()
        })
        let status = false
        values.map((val) => {
          return val.includes(event.target.value.toLowerCase()) ? (status = true) : null
        })
        return status
      })
    } else {
      tableData = table.body
    }

    setFilterData(tableData)

    setTemplateData((prev) => {
      return {
        ...prev,
        currentPage: 1,
        templateData: tableData.slice(0, prev.itemsPerPage),
        pagination: Array.from(Array(Math.ceil(tableData.length / prev.itemsPerPage)).keys()),
      }
    })
  }

  // Pagination ellipsis
  const showPage = (currentPage, pageIndex) => {
    return pageIndex <= currentPage + 1 && pageIndex >= currentPage - 1 ? true : false
  }
  return (
    <div className="App">
      <div className="container">
        <h3>Dynamic table</h3>
        <div className="filter-group">
          <select
            value={templateData.itemsPerPage}
            onChange={(e) => {
              const itemsPerPage = parseInt(e.target.value)
              setTemplateData((prev) => {
                return {
                  ...prev,
                  currentPage: 1,
                  itemsPerPage: itemsPerPage,
                  templateData: templateDataBuilder(itemsPerPage, 1),
                  pagination: Array.from(Array(Math.ceil(filterData.length / itemsPerPage)).keys()),
                }
              })
            }}
          >
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="5"> 5 </option>
            <option value="10"> 10 </option>
          </select>

          <div className="">
            <input
              className=""
              type="search"
              name="search"
              id="search"
              placeholder="search"
              autoComplete="no"
              onChange={(e) => performSearch(e)}
            />
          </div>
        </div>
        <table className="table" cellPadding="10px">
          <thead>
            <tr>{Header}</tr>
          </thead>
          <tbody>
            {templateData.templateData.length === 0 ? (
              <tr>
                <td colSpan={tableHeader.length} style={{ textAlign: "center" }}>
                  {`No results found`}
                </td>
              </tr>
            ) : (
              templateData &&
              templateData.templateData.map((bodyData, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    {tableHeader.map((head, dataIndex) => {
                      return <td key={`${rowIndex}${dataIndex}`}> {bodyData[head.template_name]} </td>
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        <div className="filter-group">
          <div className="">
            {`Showing ${templateData.currentPage * templateData.itemsPerPage - templateData.itemsPerPage + 1} to 
            ${
              templateData.currentPage * templateData.itemsPerPage >= filterData.length
                ? filterData.length
                : templateData.currentPage * templateData.itemsPerPage
            } of ${filterData.length} results`}
          </div>

          <ul className={`${templateData.pagination.length <= 1 ? "pagination-list hide" : "pagination-list"}`}>
            <li
              className={`${templateData.currentPage === 1 ? "disabled" : ""}`}
              onClick={() => paginationOnClick(1, templateDataBuilder(templateData.itemsPerPage, 1))}
            >{`First`}</li>
            <li
              className={`${templateData.currentPage === 1 ? "disabled" : ""}`}
              onClick={() =>
                paginationOnClick(
                  templateData.currentPage - 1,
                  templateDataBuilder(templateData.itemsPerPage, templateData.currentPage - 1)
                )
              }
            >
              {`Prev`}
            </li>
            <li
              className={`spacer ${templateData.currentPage === 1 || templateData.currentPage === 2 ? "hide" : "show"}`}
            >
              <span>...</span>
            </li>
            {templateData.pagination.map((page, pageIndex) => {
              return (
                <li
                  key={pageIndex}
                  className={`${templateData.currentPage === pageIndex + 1 ? "active" : ""} ${
                    showPage(templateData.currentPage, pageIndex + 1) ? "show" : "hide"
                  }`}
                  onClick={() => paginationOnClick(page + 1, templateDataBuilder(templateData.itemsPerPage, page + 1))}
                >
                  {`  ${page + 1} `}
                </li>
              )
            })}
            <li
              className={`spacer ${
                templateData.currentPage === templateData.pagination.length ||
                templateData.currentPage === templateData.pagination.length - 1
                  ? "hide"
                  : "show"
              }`}
            >
              <span>...</span>
            </li>
            <li
              className={`${
                templateData.currentPage === Math.ceil(filterData.length / templateData.itemsPerPage) ? "disabled" : ""
              }`}
              onClick={() =>
                paginationOnClick(
                  templateData.currentPage + 1,
                  templateDataBuilder(templateData.itemsPerPage, templateData.currentPage + 1)
                )
              }
            >
              {`Next`}
            </li>
            <li
              className={`${
                templateData.currentPage === Math.ceil(filterData.length / templateData.itemsPerPage) ? "disabled" : ""
              }`}
              onClick={() =>
                paginationOnClick(
                  Math.ceil(filterData.length / templateData.itemsPerPage),
                  templateDataBuilder(
                    templateData.itemsPerPage,
                    Math.ceil(filterData.length / templateData.itemsPerPage)
                  )
                )
              }
            >
              {`Last`}
            </li>
          </ul>

          <div className="">
            <input
              type="number"
              name="jump_to_page"
              id="jump_to_page"
              value={templateData.currentPage}
              onChange={(e) => jumptoPage(e)}
              max={Math.ceil(filterData.length / templateData.itemsPerPage)}
              min="1"
              placeholder="Jump to page"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
