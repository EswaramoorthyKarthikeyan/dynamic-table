import "./index.css"
import { useState } from "react"
import { table } from "./placeholderData"
import Pagination from "./components/pagination/pagination"
import ItemsPerPage from "./components/itemsperpage/itemperpage"
import Search from "./components/search/search"
import PageInfo from "./components/pageinfo/pageinfo"
import JumpToPage from "./components/jumptopage/jumptopage"
import Table from "./components/table/table"

function App() {
  // initialState
  const [templateData, setTemplateData] = useState({
    tableBody: table.body,
    itemsPerPage: table.itemsPerPage,
    currentPage: 1,
    templateData: table.body.slice(0, table.itemsPerPage),
    pagination: Array.from(Array(Math.ceil(table.body.length / table.itemsPerPage)).keys()),
    sortIndex: [table.defaultSort, "Asc"],
  })

  // Template builder based on itemper page
  const templateDataBuilder = (itemsPerPage, currentPage) =>
    templateData.tableBody.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Jump to page function
  const jumptoPage = (event) => {
    setTemplateData((prev) => {
      return {
        ...prev,
        currentPage: 1,
        itemsPerPage: event,
        pagination: Array.from(Array(Math.ceil(templateData.tableBody.length / event)).keys()),
        templateData: templateDataBuilder(event, 1),
      }
    })
  }

  const paginationOnClick = (currentPage) =>
    setTemplateData((prev) => {
      return {
        ...prev,
        currentPage,
        templateData: templateDataBuilder(templateData.itemsPerPage, currentPage),
      }
    })

  const performSearch = (tableData) => {
    setTemplateData((prev) => {
      return {
        ...prev,
        tableBody: tableData,
        currentPage: 1,
        templateData: tableData.slice(0, prev.itemsPerPage),
        pagination: Array.from(Array(Math.ceil(tableData.length / prev.itemsPerPage)).keys()),
      }
    })
  }

  const sortFunction = (index, sortType, data) => {
    setTemplateData((prev) => {
      return {
        ...prev,
        tableBody: data,
        templateData: templateDataBuilder(prev.itemsPerPage, prev.currentPage),
        sortIndex: [index, sortType],
      }
    })
  }

  return (
    <div className="App">
      <div className="container">
        <h3>Dynamic table</h3>

        <div className="filter-group">
          {/* Item per page */}
          <ItemsPerPage data={templateData} jumpEvent={jumptoPage} />
          {/* search */}
          <Search searchFunction={performSearch} templateData={templateData} table={table} />
        </div>
        {/* table */}
        <Table header={table.header} tableData={templateData} sortFn={sortFunction} />

        <div className="filter-group">
          {/* Page info */}
          <PageInfo templateData={templateData} />

          {/* Pagination */}
          <Pagination data={templateData} paginationFn={paginationOnClick} />

          {/* Jump to page */}
          <JumpToPage templateData={templateData} jumpPage={paginationOnClick} />
        </div>
      </div>
    </div>
  )
}
export default App
