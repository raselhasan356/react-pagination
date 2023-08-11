import { useEffect, useState } from "react";
import axios from "axios";
import { launchesHeaders } from "../utils/properties";
import Paginate from "./Paginate";
import Table from "./Table";

export default function Launches() {
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const options = {
      page: currentPageIndex + 1,
      limit: pageSize,
    };
    setStatus("loading");
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_BASE_API_ENDPOINT}/v4/launches/query`,
        {
          options: options,
        }
      )
      .then((res) => {
        console.log("Response Object:", res);
        setData(res.data.docs);
        setTotalPages(res.data.totalPages);
        setStatus(res.request.status === 200 ? "success" : "error");
      })
      .catch((e) => {
        console.error(e.message);
        setStatus("error");
      });
  }, [currentPageIndex, pageSize]);

  return (
    <div className="flex-row relative overflow-auto items-center justify-center m-20 p-5 bg-slate-100 rounded-md shadow-md">
      <h1 className="text-center">Launches List</h1>
      {status === "success" && <Table data={data} headers={launchesHeaders} />}
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && (
        <p className="text-red-500">
          Opps!
          <br />
          Error occured, please try again...
        </p>
      )}
      <Paginate
        data={data}
        totalPages={totalPages}
        pageSize={pageSize}
        onSetPageSize={(nextPageSize) => setPageSize(nextPageSize)}
        currentPageIndex={currentPageIndex}
        onSetCurrentPageIndex={(nextPageIndex) =>
          setCurrentPageIndex(nextPageIndex)
        }
      />
    </div>
  );
}
