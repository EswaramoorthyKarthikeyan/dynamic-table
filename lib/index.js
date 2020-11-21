import "./index.css";
import { useState } from "react";
import { table } from "./placeholderData";
import Pagination from "./components/pagination/pagination";
import ItemsPerPage from "./components/itemsperpage/itemperpage";
import Search from "./components/search/search";
import PageInfo from "./components/pageinfo/pageinfo";
import JumpToPage from "./components/jumptopage/jumptopage";
import Table from "./components/table/table";

function App() {
  // initialState
  const [templateData, setTemplateData] = useState({
    tableBody: table.body,
    itemsPerPage: table.itemsPerPage,
    currentPage: 1,
    templateData: table.body.slice(0, table.itemsPerPage),
    pagination: Array.from(Array(Math.ceil(table.body.length / table.itemsPerPage)).keys()),
    sortIndex: [table.defaultSort, "Asc"]
  }); // Template builder based on itemper page

  const templateDataBuilder = (itemsPerPage, currentPage) => templateData.tableBody.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // Jump to page function


  const jumptoPage = event => {
    setTemplateData(prev => {
      return { ...prev,
        currentPage: 1,
        itemsPerPage: event,
        pagination: Array.from(Array(Math.ceil(templateData.tableBody.length / event)).keys()),
        templateData: templateDataBuilder(event, 1)
      };
    });
  };

  const paginationOnClick = currentPage => setTemplateData(prev => {
    return { ...prev,
      currentPage,
      templateData: templateDataBuilder(templateData.itemsPerPage, currentPage)
    };
  });

  const performSearch = tableData => {
    setTemplateData(prev => {
      return { ...prev,
        tableBody: tableData,
        currentPage: 1,
        templateData: tableData.slice(0, prev.itemsPerPage),
        pagination: Array.from(Array(Math.ceil(tableData.length / prev.itemsPerPage)).keys())
      };
    });
  };

  const sortFunction = (index, sortType, data) => {
    setTemplateData(prev => {
      return { ...prev,
        tableBody: data,
        templateData: templateDataBuilder(prev.itemsPerPage, prev.currentPage),
        sortIndex: [index, sortType]
      };
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h3", null, "Dynamic table"), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement(ItemsPerPage, {
    data: templateData,
    jumpEvent: jumptoPage
  }), /*#__PURE__*/React.createElement(Search, {
    searchFunction: performSearch,
    templateData: templateData,
    table: table
  })), /*#__PURE__*/React.createElement(Table, {
    header: table.header,
    tableData: templateData,
    sortFn: sortFunction
  }), /*#__PURE__*/React.createElement("div", {
    className: "filter-group"
  }, /*#__PURE__*/React.createElement(PageInfo, {
    templateData: templateData
  }), /*#__PURE__*/React.createElement(Pagination, {
    data: templateData,
    paginationFn: paginationOnClick
  }), /*#__PURE__*/React.createElement(JumpToPage, {
    templateData: templateData,
    jumpPage: paginationOnClick
  }))));
}

export default App;