import React, { useState, useEffect } from "react";
 

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [revenueRange, setRevenueRange] = useState({ min: "", max: "" });
  const [netIncomeRange, setNetIncomeRange] = useState({ min: "", max: "" });

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  /* ----------------------------- Fetch the data ----------------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=xJ0wvBzZdsQ2coY5v0MXzYz6ZG7cChFS"
        );
        if (!response.ok) throw new Error("Failed to fetch data.");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* --------------------------- Search the contents in a Table -------------------------- */
  const applyFilters = () => {
    return data.filter((item) => {
      const itemDate = new Date(item.date).getFullYear();
      const revenue = parseFloat(item.revenue);
      const netIncome = parseFloat(item.netIncome);

      const isWithinDateRange =
        (!dateRange.start || itemDate >= parseInt(dateRange.start)) &&
        (!dateRange.end || itemDate <= parseInt(dateRange.end));

      const isWithinRevenueRange =
        (!revenueRange.min || revenue >= parseFloat(revenueRange.min)) &&
        (!revenueRange.max || revenue <= parseFloat(revenueRange.max));

      const isWithinNetIncomeRange =
        (!netIncomeRange.min || netIncome >= parseFloat(netIncomeRange.min)) &&
        (!netIncomeRange.max || netIncome <= parseFloat(netIncomeRange.max));

      return isWithinDateRange && isWithinRevenueRange && isWithinNetIncomeRange;
    });
  };

  /* --------------------------- Sort the contents in a Table ------------------------------ */
  const sortData = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      if (order === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
    setData(sortedData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const filteredData = applyFilters();

  /* ----------------------------- UI Part ------------------------------------------------- */
  return (

    <div className="flex items-center justify-center bg-gray-100 min-h-screen">

      <header className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-black-700 mb-6">
          Financial Data Table
        </h1>

        {/* ------------------------------- Filters ----------------------------------------- */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Date Range:
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Start Year"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
              />
              <input
                type="number"
                className="w-full border border-gray-300 p-2 mt-2 rounded"
                placeholder="End Year"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Revenue Range:
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Min Revenue"
                value={revenueRange.min}
                onChange={(e) =>
                  setRevenueRange((prev) => ({ ...prev, min: e.target.value }))
                }
              />
              <input
                type="number"
                className="w-full border border-gray-300 p-2 mt-2 rounded"
                placeholder="Max Revenue"
                value={revenueRange.max}
                onChange={(e) =>
                  setRevenueRange((prev) => ({ ...prev, max: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Net Income Range:
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Min Net Income"
                value={netIncomeRange.min}
                onChange={(e) =>
                  setNetIncomeRange((prev) => ({ ...prev, min: e.target.value }))
                }
              />
              <input
                type="number"
                className="w-full border border-gray-300 p-2 mt-2 rounded"
                placeholder="Max Net Income"
                value={netIncomeRange.max}
                onChange={(e) =>
                  setNetIncomeRange((prev) => ({ ...prev, max: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        {/* -------------------------------------- Table -------------------------------- */}
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th
                  className="p-3 border border-gray-300 cursor-pointer"
                  onClick={() => sortData("date")}
                >
                  Date {sortColumn === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-3 border border-gray-300 cursor-pointer"
                  onClick={() => sortData("revenue")}
                >
                  Revenue {sortColumn === "revenue" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-3 border border-gray-300 cursor-pointer"
                  onClick={() => sortData("netIncome")}
                >
                  Net Income {sortColumn === "netIncome" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="p-3 border border-gray-300">Gross Profit</th>
                <th className="p-3 border border-gray-300">EPS</th>
                <th className="p-3 border border-gray-300">Operating Income</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-3 border border-gray-300">{item.date}</td>
                  <td className="p-3 border border-gray-300">{item.revenue}</td>
                  <td className="p-3 border border-gray-300">{item.netIncome}</td>
                  <td className="p-3 border border-gray-300">{item.grossProfit}</td>
                  <td className="p-3 border border-gray-300">{item.eps}</td>
                  <td className="p-3 border border-gray-300">{item.operatingIncome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
