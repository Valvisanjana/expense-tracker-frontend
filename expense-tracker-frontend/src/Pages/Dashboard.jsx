import React, { useEffect, useState } from 'react'
import '../style/Dashboard.css'
import Navbar from '../Component/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState({
    totalIncome: 0, totalExpense: 0, totalSaving: 0, categoryWiseExpense: [],
    recentTransaction: []
  });
  const token = localStorage.getItem("token");

  const fetchDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/dashboard/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="summeryCard-container">
        <div className="cards">
          <div className="card-income">
            <h3>Total Income: {data.totalIncome}</h3>
          </div>
          <div className="card-expense">
            <h3>Total Expense: {data.totalExpense}</h3>
          </div>
          <div className="card-saving">
            <h3>Total Saving: {data.totalSaving}</h3>
          </div>
        </div>
      </div>

      <div className="transaction-container">
        <h3>Recent Transactions</h3>

        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data.recentTransaction?.map((t, index) => (
              <tr key={index}>
                <td>{t.title}</td>
                <td>{t.amount}</td>
                <td>{t.categoryName}</td>
                <td>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Outlet />
    </div>
  )
}

export default Dashboard