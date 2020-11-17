import "./App.css"
import { useState } from "react"
import { table } from "./placeholderData"

function App() {
  //table header
  const tableHeader = table.header

  //Header template rendering
  const Header = tableHeader.map((header, headerIndex) => {
    return <th key={headerIndex}>{header.header_name}</th>
  })

  //table body
  const tableBody = table.body

  const [filterData, setFilterData] = useState(tableBody)

  // initialState
  const [templateData, setTemplateData] = useState({
    itemsPerPage: table.noOfItems,
    currentPage: 1,
    templateData: filterData.slice(0, table.noOfItems),
    noOfItems: table.noOfItems,
    pagination: Array.from(Array(Math.ceil(filterData.length / table.noOfItems)).keys()),
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

  const performSearch = (event) => {
    let tableData = []
    if (event.target.value) {
      tableData = tableBody.filter((row) => {
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
      tableData = tableBody
    }

    setFilterData(tableData)

    setTemplateData((prev) => {
      return {
        ...prev,
        currentPage: 1,
        templateData: tableData.slice(0, prev.noOfItems),
        pagination: Array.from(Array(Math.ceil(tableData.length / prev.noOfItems)).keys()),
      }
    })
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
                  currentPage: 1,
                  noOfItems: itemsPerPage,
                  itemsPerPage: itemsPerPage,
                  templateData: templateDataBuilder(itemsPerPage, prev.currentPage),
                  pagination: Array.from(Array(Math.ceil(filterData.length / itemsPerPage)).keys()),
                }
              })
            }}
          >
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="5"> 5 </option>
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

            {templateData.pagination.map((page, pageIndex) => {
              return (
                <li
                  key={pageIndex}
                  className={`${templateData.currentPage === pageIndex + 1 ? "active" : ""}`}
                  onClick={() => paginationOnClick(page + 1, templateDataBuilder(templateData.itemsPerPage, page + 1))}
                >
                  {`  ${page + 1} `}
                </li>
              )
            })}
            <li
              className={`${templateData.currentPage === filterData.length / table.noOfItems ? "disabled" : ""}`}
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
              className={`${templateData.currentPage === filterData.length / table.noOfItems ? "disabled" : ""}`}
              onClick={() =>
                paginationOnClick(
                  filterData.length / table.noOfItems,
                  templateDataBuilder(templateData.itemsPerPage, `${filterData.length / table.noOfItems}`)
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
              max={filterData.length / table.noOfItems}
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
