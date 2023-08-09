export default function Paginate({
  data,
  pageSize,
  onSetPageSize,
  currentPageIndex,
  onSetCurrentPageIndex,
}) {
  const pageCount = Math.ceil(data.length / pageSize);

  function gotoPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < pageCount) {
      onSetCurrentPageIndex(pageIndex);
    }
  }

  function canGotoPreviousPage() {
    return currentPageIndex > 0;
  }

  function canGotoNextPage() {
    return currentPageIndex < pageCount - 1;
  }

  function previousPage() {
    if (canGotoPreviousPage()) {
      onSetCurrentPageIndex(currentPageIndex - 1);
    }
  }

  function nextPage() {
    if (canGotoNextPage()) {
      onSetCurrentPageIndex(currentPageIndex + 1);
    }
  }

  return (
    <div className="flex overflow-auto space-x-4 m-2 rounded-md p-2 items-center justify-center">
      <button
        className="shadow-md bg-slate-100 rounded-md p-1 px-2"
        onClick={() => gotoPage(0)}
        disabled={!canGotoPreviousPage}
      >
        {"First Page"}
      </button>

      <button
        className="shadow-md bg-slate-100 rounded-md p-1 px-2"
        onClick={() => previousPage()}
        disabled={!canGotoPreviousPage}
      >
        Previous
      </button>

      <button
        className="shadow-md bg-slate-100 rounded-md p-1 px-2"
        onClick={() => nextPage()}
        disabled={!canGotoNextPage}
      >
        Next
      </button>

      <button
        className="shadow-md bg-slate-100 rounded-md p-1 px-2"
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
            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(pageNumber);
          }}
        />
      </span>
      <select
        className="w-25 shadow-md rounded-md p-1 px-2"
        value={pageSize}
        onChange={(e) => {
          onSetPageSize(Number(e.target.value));
          onSetCurrentPageIndex(0);
        }}
      >
        {[10, 25, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
