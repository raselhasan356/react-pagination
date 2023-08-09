const headers = ["Flight number", "Name", "Date", "ID"];
const columnKeys = ["id", "name", "flight_number", "date_local"];

const isNeeded = (key) => {
  return columnKeys.includes(key);
};

export { headers, isNeeded };
