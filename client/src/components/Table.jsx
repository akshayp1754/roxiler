import React from 'react'

function Table() {
  return (
    <>
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <div className="pb-4 bg-white dark:bg-gray-900">
    <label htmlFor="table-search" className="sr-only">
      Search
    </label>
    <div className="relative mt-1">
      <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="text"
        id="table-search"
        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search for items"
      />
    </div>
  </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">ID</th>
        <th scope="col" className="px-6 py-3">Title</th>
        <th scope="col" className="px-6 py-3">Description</th>
        <th scope="col" className="px-6 py-3">Price</th>
        <th scope="col" className="px-6 py-3">Category</th>
        <th scope="col" className="px-6 py-3">Sold</th>
        <th scope="col" className="px-6 py-3">Image</th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4">1</td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Apple MacBook Pro 17"
        </td>
        <td className="px-6 py-4">High-performance laptop with Retina Display.</td>
        <td className="px-6 py-4">$2999</td>
        <td className="px-6 py-4">Laptop</td>
        <td className="px-6 py-4">345</td>
        <td className="px-6 py-4">
          <img src="macbook-image-url" alt="Apple MacBook Pro 17" className="w-12 h-12 object-cover" />
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4">2</td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Microsoft Surface Pro
        </td>
        <td className="px-6 py-4">Versatile tablet-laptop hybrid with touch screen.</td>
        <td className="px-6 py-4">$1999</td>
        <td className="px-6 py-4">Laptop PC</td>
        <td className="px-6 py-4">240</td>
        <td className="px-6 py-4">
          <img src="surface-image-url" alt="Microsoft Surface Pro" className="w-12 h-12 object-cover" />
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4">3</td>
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Magic Mouse 2
        </td>
        <td className="px-6 py-4">Wireless mouse with smooth, touch-sensitive surface.</td>
        <td className="px-6 py-4">$99</td>
        <td className="px-6 py-4">Accessories</td>
        <td className="px-6 py-4">150</td>
        <td className="px-6 py-4">
          <img src="mouse-image-url" alt="Magic Mouse 2" className="w-12 h-12 object-cover" />
        </td>
      </tr>
      {/* Add more rows as needed */}
    </tbody>
  </table>
</div>




    </>
  )
}

export default Table
