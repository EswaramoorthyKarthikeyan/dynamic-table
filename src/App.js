import "./App.css"
import { useState, useEffect } from "react"

function App() {
  // Table JSON
  const table = {
    header: [
      {
        header_name: "s.no",
        template_name: "sno",
      },
      {
        header_name: "Name",
        template_name: "name",
      },
      {
        header_name: "Age",
        template_name: "age",
      },
      {
        header_name: "Gender",
        template_name: "gender",
      },
      {
        header_name: "Designation",
        template_name: "designation",
      },
    ],
    body: [
      {
        sno: 1,
        name: "Eswaramoorthy karthikeyan",
        age: 25,
        gender: "Male",
        designation: "Developer",
      },
      {
        sno: 2,
        name: "Gopinath",
        age: 24,
        gender: "Male",
        designation: "CTO",
      },
      {
        sno: 3,
        name: "Allen paul",
        age: 25,
        gender: "Male",
        designation: "CEO",
      },
      {
        sno: 4,
        name: "Jefferson Swartz",
        age: 25,
        gender: "Male",
        designation: "CCO",
      },
      {
        sno: 5,
        name: "Eswaramoorthy karthikeyan",
        age: 25,
        gender: "Male",
        designation: "Developer",
      },
      {
        sno: 6,
        name: "Gopinath",
        age: 24,
        gender: "Male",
        designation: "CTO",
      },
      {
        sno: 7,
        name: "Allen paul",
        age: 25,
        gender: "Male",
        designation: "CEO",
      },
      {
        sno: 8,
        name: "Jefferson Swartz",
        age: 25,
        gender: "Male",
        designation: "CCO",
      },
    ],
    noOfItems: 2,
    currentPage: 1,
  }

  //table header
  const tableHeader = table.header

  //Header template rendering
  const Header = tableHeader.map((header, headerIndex) => {
    return <th key={headerIndex}>{header.header_name}</th>
  })

  //table body
  const tableBody = table.body

  // initialState
  const [templateData, setTemplateData] = useState(null)

  const templateDataBuilder = (itemsPerPage, currentPage) =>
    table.body.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // onmount, apicall/loaddata,
  useEffect(() => {
    // this value can be directly given in useState
    setTemplateData({
      itemsPerPage: table.noOfItems,
      currentPage: 1,
      templateData: table.body.slice(0, table.noOfItems),
      noOfItems: table.noOfItems,
      pagination: Array.from(Array(Math.ceil(tableBody.length / table.noOfItems)).keys()),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  if (!templateData) {
    return "initializing..."
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
            {`Showing ${templateData.currentPage * templateData.itemsPerPage - templateData.itemsPerPage + 1} 
            to `}
            {templateData.currentPage * templateData.itemsPerPage <= tableBody.length
              ? templateData.currentPage * templateData.itemsPerPage
              : tableBody.length}{" "}
            {`of
            ${tableBody.length}`}
          </div>

          <ul className="pagination-list">
            <li
              onClick={() =>
                setTemplateData((prev) => {
                  return {
                    ...prev,
                    currentPage: 1,
                    templateData: templateDataBuilder(prev.itemsPerPage, 1),
                  }
                })
              }
            >
              {`First`}
            </li>
            <li
              onClick={() =>
                setTemplateData((prev) => {
                  return {
                    ...prev,
                    currentPage: prev.currentPage - 1,
                    templateData: templateDataBuilder(prev.itemsPerPage, prev.currentPage - 1),
                  }
                })
              }
            >
              {`Prev`}
            </li>

            {templateData.pagination.map((page, pageIndex) => {
              return (
                <li
                  key={pageIndex}
                  className={`${templateData.currentPage === pageIndex + 1 ? "active" : ""}`}
                  onClick={() =>
                    setTemplateData((prev) => {
                      const currentPage = page + 1
                      return {
                        ...prev,
                        currentPage: currentPage,
                        templateData: templateDataBuilder(prev.itemsPerPage, currentPage),
                      }
                    })
                  }
                >
                  {`  ${page + 1} `}
                </li>
              )
            })}
            <li
              onClick={() =>
                setTemplateData((prev) => {
                  return {
                    ...prev,
                    currentPage: prev.currentPage + 1,
                    templateData: templateDataBuilder(prev.itemsPerPage, prev.currentPage + 1),
                  }
                })
              }
            >
              {`Next`}
            </li>
            <li
              onClick={() =>
                setTemplateData((prev) => {
                  return {
                    ...prev,
                    currentPage: tableBody.length / table.noOfItems,
                    templateData: templateDataBuilder(prev.itemsPerPage, tableBody.length / table.noOfItems),
                  }
                })
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
