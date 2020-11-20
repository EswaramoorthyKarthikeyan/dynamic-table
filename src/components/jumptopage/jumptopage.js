function JumpToPage({ templateData, jumpPage }) {
  const jumptoPage = (e) => jumpPage(parseInt(e.target.value))

  return (
    <div className="">
      <input
        type="number"
        name="jump_to_page"
        id="jump_to_page"
        value={templateData.currentPage}
        onChange={(e) => jumptoPage(e)}
        max={Math.ceil(templateData.tableBody.length / templateData.itemsPerPage)}
        min="1"
        placeholder="Jump to page"
      />
    </div>
  )
}

export default JumpToPage
