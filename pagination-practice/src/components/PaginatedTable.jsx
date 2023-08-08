import { useEffect, useState } from "react";
import axios from "axios";
export default function PaginatedTable() {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageCount = Math.ceil(data.length / pageSize);

  const indexOfFirstItem = pageSize * currentPageIndex;
  const indexOfLastItem = Math.min(
    indexOfFirstItem + pageSize,
    data.length - 1
  );

  function gotoPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < pageCount) {
      setCurrentPageIndex(pageIndex);
    }
  }

  function canGotoPreviousPage() {
    if (currentPageIndex > 0) {
      return true;
    }
    return false;
  }

  function canGotoNextPage() {
    console.log("PageCount", pageCount);
    if (currentPageIndex < pageCount - 1) {
      return true;
    }
    return false;
  }

  function previousPage() {
    if (canGotoPreviousPage()) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  }

  function nextPage() {
    if (canGotoNextPage()) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  }

  useEffect(() => {
    axios.get("https://api.spacexdata.com/v5/launches").then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    setCurrentData(
      data.filter(
        (item, index) => index >= indexOfFirstItem && index <= indexOfLastItem
      )
    );
  }, [data, indexOfFirstItem, indexOfLastItem]);

  const headers = ["ID", "Name", "Flight Number", "Date", "Success status"];

  function renderTableHeader() {
    return (
      <thead className="text-lg text-gray-900 bg-gray-200">
        <tr>
          {headers.map((header) => (
            <th scope="col" className="px-6 py-2" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  function renderTableData() {
    //console.log(currentData);
    return (
      <tbody>
        {currentData.map((item) => (
          <tr className="bg-white border-b" key={item.id}>
            <td className="px-6 py-2">{item.id}</td>
            <td className="px-6 py-2">{item.name}</td>
            <td className="px-6 py-2">{item.flight_number}</td>
            <td className="px-6 py-2">{item.date_local}</td>
            <td className="px-6 py-2">{item.success ? "Success" : "Failed"}</td>
          </tr>
        ))}
      </tbody>
    );
  }

  function renderTable() {
    return (
      <table className="w-full shadow-md text-sm text-left text-gray-900 rounded-md">
        {renderTableHeader()}
        {renderTableData()}
      </table>
    );
  }

  return (
    <div className="flex-row relative overflow-auto items-center justify-center m-20 p-8 bg-slate-100 rounded-md shadow-md">
      <div className="flex relative overflow-x-auto p-2 items-center justify-center">
        {renderTable()}
      </div>
      <div className="flex relative overflow-auto space-x-4 m-2 rounded-md p-2 items-center justify-center">
        <button
          className="shadow-md bg-slate-100 rounded-md p-1 w-22"
          onClick={() => gotoPage(0)}
          disabled={!canGotoPreviousPage}
        >
          {"First Page"}
        </button>

        <button
          className="shadow-md bg-slate-100 rounded-md p-1 w-20"
          onClick={() => previousPage()}
          disabled={!canGotoPreviousPage}
        >
          Previous
        </button>

        <button
          className="shadow-md bg-slate-100 rounded-md p-1 w-20"
          onClick={() => nextPage()}
          disabled={!canGotoNextPage}
        >
          Next
        </button>

        <button
          className="shadow-md bg-slate-100 rounded-md p-1 w-20"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canGotoNextPage}
        >
          {"Last Page"}
        </button>

        <span>
          Page{" "}
          <strong>
            {currentPageIndex + 1} of {pageCount}
          </strong>
        </span>

        <span>
          Goto page:{" "}
          <input
            className="w-12 shadow-md p-1 rounded-md"
            type="number"
            defaultValue={currentPageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        <select
          className="w-25 shadow-md rounded-md p-1"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPageIndex(0);
          }}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
