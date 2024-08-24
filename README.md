Transactions Dashboard

A comprehensive dashboard to display transactions, statistics, and visualizations for sales data. Built with React, Node.js, Express, and MongoDB, the dashboard includes features like a 
searchable and paginated transactions table, bar charts, pie charts, and various statistics.

Features

Transactions Table: Paginated and searchable table displaying transaction details including title, description, price, category, and sale status.

Statistics: Provides overall sales statistics, including total sales amount, sold and not sold items for a selected month.

Bar Chart Visualization: Displays the count of transactions within specific price ranges for the selected month.

Pie Chart Visualization: Visualizes the distribution of sales across different categories.

Installation

Clone the repository: git clone https://github.com/akshayp1754/roxiler.git

Navigate to the project directory: cd roxiler

Install the required dependencies: npm install

Usage
Start the backend server: npm run server

Start the React app: npm run dev

API Endpoints
/product/transactions: Fetches transactions with pagination, search, and filtering.
/combinedData/combined-data: Fetches combined statistics, bar chart, and pie chart data for a selected month.

Built With
React for the frontend
Node.js and Express for the backend API
MongoDB for the database
Axios for API requests
Recharts for data visualizations
