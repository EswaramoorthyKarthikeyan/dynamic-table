import React from "react"

function Search({ searchFunction, templateData, table }) {
  const search = (e) => {
    let tableData = []
    if (e.target.value) {
      let Data = templateData.tableBody.length > 0 ? templateData.tableBody : table.body
      tableData = Data.filter((row) => {
        let values = Object.values(row).map((v) => {
          return ("" + v).toLowerCase()
        })
        let status = false
        values.map((val) => {
          return val.includes(e.target.value.toLowerCase()) ? (status = true) : null
        })
        return status
      })
    } else {
      tableData = table.body
    }
    searchFunction(tableData)
  }

  return (
    <div className="">
      <input
        className=""
        type="search"
        name="search"
        id="search"
        placeholder="search"
        autoComplete="no"
        onChange={(e) => search(e)}
      />
    </div>
  )
}
export default Search
