import { useEffect, useState } from "react";
import axios from "axios";
import { headers, isNeeded } from "../utils/tableProperties";
import Paginate from "./Paginate";
export default function PaginatedTable() {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const indexOfFirstItem = pageSize * currentPageIndex;
  const indexOfLastItem = Math.min(
    indexOfFirstItem + pageSize,
    data.length - 1
  );

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_API_ENDPOINT}/v5/launches`)
      .then((res) => {
        //console.log(res.data);
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

  function renderHeaders(headers) {
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

  function renderTd(item) {
    return Object.keys(item).map(
      (key, i) =>
        isNeeded(key) && (
          <td key={i} className="px-6 py-2">
            {item[key]}
          </td>
        )
    );
  }

  function renderRows(tableData) {
    return (
      <tbody>
        {tableData.map((item) => {
          return (
            <tr className="bg-white border-b" key={item.id}>
              {renderTd(item)}
            </tr>
          );
        })}
      </tbody>
    );
  }

  function renderTable() {
    return (
      <table className="w-full shadow-md text-sm text-left text-gray-900 rounded-md">
        {renderHeaders(headers)}
        {renderRows(currentData)}
      </table>
    );
  }

  return (
    <div className="flex-row relative overflow-auto items-center justify-center m-20 p-8 bg-slate-100 rounded-md shadow-md">
      <div className="flex relative overflow-x-auto p-2 items-center justify-center">
        {renderTable()}
      </div>
      <Paginate
        data={data}
        pageSize={pageSize}
        onSetPageSize={setPageSize}
        currentPageIndex={currentPageIndex}
        onSetCurrentPageIndex={setCurrentPageIndex}
      />
    </div>
  );
}
