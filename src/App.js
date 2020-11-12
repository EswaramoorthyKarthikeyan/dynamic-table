
import './App.css';
import { useState } from 'react'


function App() {


  // Table JSON
  const table = {
    "header": [
      {
        "header_name": "s.no",
        "template_name": "sno"
      },
      {
        "header_name": "Name",
        "template_name": "name"
      },
      {
        "header_name": "Age",
        "template_name": "age"
      },
      {
        "header_name": "Gender",
        "template_name": "gender"
      },
      {
        "header_name": "Designation",
        "template_name": "designation"
      }
    ],
    "body": [
      {
        "sno": 1,
        "name": "Eswaramoorthy karthikeyan",
        "age": 25,
        "gender": "Male",
        "designation": "Developer"
      },
      {
        "sno": 2,
        "name": "Gopinath",
        "age": 24,
        "gender": "Male",
        "designation": "CTO"
      },
      {
        "sno": 3,
        "name": "Allen paul",
        "age": 25,
        "gender": "Male",
        "designation": "CEO"
      },
      {
        "sno": 4,
        "name": "Jefferson Swartz",
        "age": 25,
        "gender": "Male",
        "designation": "CCO"
      }, {
        "sno": 1,
        "name": "Eswaramoorthy karthikeyan",
        "age": 25,
        "gender": "Male",
        "designation": "Developer"
      },
      {
        "sno": 2,
        "name": "Gopinath",
        "age": 24,
        "gender": "Male",
        "designation": "CTO"
      },
      {
        "sno": 3,
        "name": "Allen paul",
        "age": 25,
        "gender": "Male",
        "designation": "CEO"
      },
      {
        "sno": 4,
        "name": "Jefferson Swartz",
        "age": 25,
        "gender": "Male",
        "designation": "CCO"
      }
    ],
    "noOfItems": 2,
    "currentPage": 1
  };

  //table header 
  const tableHeader = table.header;

  //Header template rendering
  const Header = tableHeader.map((header, headerIndex) => {
    return <th key={headerIndex}>{header.header_name}</th>
  });

  //table body
  const tableBody = table.body;

  // finalData hook
  const [templateData, setTemplateData] = useState(pageNav(table.currentPage, false));

  // Jump to page function
  function jumptoPage($event) {
    let value = $event.target.value === '' ? 1 : $event.target.value;
    return (value <= (tableBody.length / templateData.itemsPerPage)) ? pageNav(value, true, templateData.itemsPerPage) : true;
  }

  // page navigation function
  function pageNav(page, pageChange = false, noOfItems = table.noOfItems) {

    let finalObj = {
      'itemsPerPage': noOfItems,
      'currentPage': page,
      'templateData': table.body.slice(((page - 1) * noOfItems), ((page) * noOfItems)),
      'noOfItems': typeof noOfItems == 'string' ? +noOfItems : noOfItems,
      'pagination': Array.from(Array(Math.ceil(tableBody.length / noOfItems)).keys()),
    };
    return (pageChange === false) ? finalObj : setTemplateData(finalObj);
  }

  return (
    <div className="App">
      <div className="">
        <select onChange={(e) => pageNav(templateData.currentPage, true, e.target.value)}>
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="5"> 5 </option>
        </select>
      </div>


      <table cellSpacing="20px" cellPadding="10px">
        <thead>
          <tr>
            {Header}
          </tr>
        </thead>
        <tbody>
          {
            templateData.templateData.map((bodyData, rowIndex) => {
              return <tr key={rowIndex}>
                {
                  tableHeader.map((head, dataIndex) => {
                    return <td key={`${rowIndex}${dataIndex}`}> {bodyData[head.template_name]} </td>
                  })
                }
              </tr>
            })}
        </tbody>
      </table>

      <div className="">
        <ul className="pagination-list">
          {
            templateData.pagination.map((page, pageIndex) => {
              return <li key={pageIndex} onClick={() => pageNav(page + 1, true, templateData.itemsPerPage)} > {page + 1} </li>
            })
          }
        </ul>

        <input type="number" name="jump_to_page" id="jump_to_page" onChange={(e) => jumptoPage(e)} max={tableBody.length / table.noOfItems} min="1" placeholder="Jump to page" />

      </div>
          Showing {templateData.currentPage} to { templateData.currentPage * templateData.itemsPerPage} of {tableBody.length}
    </div >
  );
}

export default App;
