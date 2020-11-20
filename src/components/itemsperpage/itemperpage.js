function ItemsPerPage({ data, jumpEvent }) {
  const itemPerPage = (event) => {
    jumpEvent(parseInt(event.target.value))
  }
  return (
    <select value={data.itemsPerPage} onChange={(e) => itemPerPage(e)}>
      <option value="1"> 1 </option>
      <option value="2"> 2 </option>
      <option value="5"> 5 </option>
      <option value="10"> 10 </option>
    </select>
  )
}
export default ItemsPerPage
