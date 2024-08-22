import React, { useEffect, useState, useMemo } from "react";
import axios from "../axios/index";
import SearchInput from "./SearchInput";
import useDebounce from "../hooks/useDebounce";
import TransactionStatistics from "./TransactionStatistics";
import TransactionBarChart from "./BarChart";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("March");
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/product/transactions", {
        params: { page, perPage, search: debouncedSearch, month },
      });
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, perPage, debouncedSearch, month]);

  const transactionRows = useMemo(
    () =>
      transactions.length > 0 ? (
        transactions.map((transaction) => (
          <tr
            key={transaction.id}
            className="bg-white border-b border-gray-200 hover:bg-gray-50"
          >
            <td className="px-6 py-4">{transaction.id}</td>
            <td className="px-6 py-4 truncate-title font-medium text-gray-900 truncate">
              {transaction.title}
            </td>
            <td className="px-6 py-4 truncate-description mb-3">
              {transaction.description}
            </td>
            <td className="px-6 py-4">${transaction.price}</td>
            <td className="px-6 py-4">{transaction.category}</td>
            <td className="px-6 py-4">{transaction.sold ? "Yes" : "No"}</td>
            <td className="px-6 py-4">
              <img
                src={transaction.image}
                alt={transaction.title}
                className="w-12 h-12 object-cover rounded"
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
            No transactions found
          </td>
        </tr>
      ),
    [transactions]
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <div className="pb-4 bg-white flex justify-between items-center border-b border-gray-200">
        <SearchInput search={search} setSearch={setSearch} />
        <div>
          <select
            id="month-select"
            className="block w-48 p-2 mr-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {months.map((monthOption, index) => (
              <option key={index} value={monthOption}>
                {monthOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Sold
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
          </tr>
        </thead>
        <tbody>{transactionRows}</tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center py-4 bg-white border-t border-gray-200">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <TransactionStatistics selectedMonth={month} />
      <TransactionBarChart selectedMonth={month} />
    </div>
  );
};

export default TransactionsTable;
