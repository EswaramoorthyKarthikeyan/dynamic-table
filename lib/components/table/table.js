import "./table.css";

function Table({
  header,
  tableData,
  sortFn
}) {
  // Dynamic sort function
  const dynamicSort = property => {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }; // Sort function


  const sort = index => {
    let sortType = "";

    if (index === tableData.sortIndex[0] && tableData.sortIndex[1] === "Asc") {
      tableData.tableBody.sort(dynamicSort(header[index]["template_name"])).reverse();
      sortType = "Dec";
    } else {
      tableData.tableBody.sort(dynamicSort(header[index]["template_name"]));
      sortType = "Asc";
    }

    sortFn(index, sortType, tableData.tableBody);
  }; //Header template rendering


  const Header = header.map((header, headerIndex) => {
    return /*#__PURE__*/React.createElement("th", {
      key: headerIndex,
      onClick: () => sort(headerIndex)
    }, header.header_name, /*#__PURE__*/React.createElement("span", {
      className: `${headerIndex === tableData.sortIndex[0] ? "active" : ""} ${tableData.sortIndex[1]}`
    }, `>`));
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "table",
    cellPadding: "10px"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, Header)), /*#__PURE__*/React.createElement("tbody", null, tableData.templateData.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: header.length,
    style: {
      textAlign: "center"
    }
  }, `No results found`)) : tableData.templateData && tableData.templateData.map((bodyData, rowIndex) => {
    return /*#__PURE__*/React.createElement("tr", {
      key: rowIndex
    }, header.map((head, dataIndex) => {
      return /*#__PURE__*/React.createElement("td", {
        key: `${rowIndex}${dataIndex}`
      }, " ", bodyData[head.template_name], " ");
    }));
  })));
}

export default Table;