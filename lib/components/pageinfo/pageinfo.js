function PageInfo({
  templateData
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ""
  }, `Showing ${templateData.currentPage * templateData.itemsPerPage - templateData.itemsPerPage + 1} to 
            ${templateData.currentPage * templateData.itemsPerPage >= templateData.tableBody.length ? templateData.tableBody.length : templateData.currentPage * templateData.itemsPerPage} of ${templateData.tableBody.length} results`);
}

export default PageInfo;