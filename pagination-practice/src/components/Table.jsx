export default function Table({ data, headers }) {
  const doesExistInHeaders = (key) => {
    return headers.includes(key);
  };

  const renderHeaderCells = () => {
    return (
      <thead className="text-sm text-gray-900 bg-gray-200">
        <tr>
          {headers.map((header) => (
            <th scope="col" className="px-6 py-2" key={header}>
              {header.replace(/_/g, " ").toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderDataCells = (item) => {
    return Object.keys(item).map(
      (key, i) =>
        doesExistInHeaders(key) && (
          <td key={i} className="px-6 py-2">
            {item[key]}
          </td>
        )
    );
  };

  const renderRows = () => {
    return (
      <tbody>
        {data.map((item) => (
          <tr className="bg-white border-b" key={item.id}>
            {renderDataCells(item)}
          </tr>
        ))}
      </tbody>
    );
  };

  const renderTable = () => {
    return (
      <table className="w-full shadow-md text-sm text-left text-gray-900 rounded-md">
        {renderHeaderCells()}
        {renderRows()}
      </table>
    );
  };

  return (
    <div className="flex relative overflow-x-auto p-2 items-center justify-center">
      {renderTable()}
    </div>
  );
}
