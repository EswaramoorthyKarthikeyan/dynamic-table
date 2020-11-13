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

  // initialState
  const [templateData, setTemplateData] = useState({
    itemsPerPage: table.noOfItems,
    currentPage: 1,
    templateData: table.body.slice(0, table.noOfItems),
    noOfItems: table.noOfItems,
    pagination: Array.from(Array(Math.ceil(tableBody.length / table.noOfItems)).keys()),
  })

  const templateDataBuilder = (itemsPerPage, currentPage) =>
    table.body.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
                  itemsPerPage: itemsPerPage,
                  templateData: templateDataBuilder(itemsPerPage, prev.currentPage),
                  pagination: Array.from(Array(Math.ceil(tableBody.length / itemsPerPage)).keys()),
                }
              })
            }}
          >
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="5"> 5 </option>
          </select>

          <div className="">
            <input className="" type="text" name="search" id="search" placeholder="search" autoComplete="no" />
          </div>
        </div>
        <table className="table" cellPadding="10px">
          <thead>
            <tr>{Header}</tr>
          </thead>
          <tbody>
            {templateData &&
              templateData.templateData.map((bodyData, rowIndex) => {
                return (
                  <tr key={rowIndex}>
                    {tableHeader.map((head, dataIndex) => {
                      return <td key={`${rowIndex}${dataIndex}`}> {bodyData[head.template_name]} </td>
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>

        <div className="filter-group">
          <div className="">
            {`Showing ${templateData.currentPage * templateData.itemsPerPage - templateData.itemsPerPage + 1} to ${
              templateData.currentPage * templateData.itemsPerPage
            } of ${tableBody.length}`}
          </div>

          <ul className="pagination-list">
            <li onClick={() => paginationOnClick(1, templateDataBuilder(templateData.itemsPerPage, 1))}>{`First`}</li>
            <li
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
              onClick={() =>
                paginationOnClick(
                  tableBody.length / table.noOfItems,
                  templateDataBuilder(templateData.itemsPerPage, tableBody.length / table.noOfItems)
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
              max={tableBody.length / table.noOfItems}
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
