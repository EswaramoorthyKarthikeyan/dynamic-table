function ItemsPerPage({
  data,
  jumpEvent
}) {
  const itemPerPage = event => {
    jumpEvent(parseInt(event.target.value));
  };

  return /*#__PURE__*/React.createElement("select", {
    value: data.itemsPerPage,
    onChange: e => itemPerPage(e)
  }, /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, " 1 "), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, " 2 "), /*#__PURE__*/React.createElement("option", {
    value: "5"
  }, " 5 "), /*#__PURE__*/React.createElement("option", {
    value: "10"
  }, " 10 "));
}

export default ItemsPerPage;