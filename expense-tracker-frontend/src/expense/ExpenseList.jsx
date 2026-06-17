import React, { useEffect, useState } from 'react'
import "../style/ExpenseList.css";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const id = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const token = localStorage.getItem("token");

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/expense/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchExpenses();
    } catch (err) {
      console.log("Error:", err.response);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/expense/getAll/expenses", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExpenses(response.data);

    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  }
  return (
    <div>
      <div className="expList-container">
        <h2>Expense List</h2>

        <table className="table-container">
          <thead className='tablehead'>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((exp, index) => (
                <tr key={exp.id}>
                  <td>{index + 1}</td>
                  <td>{exp.title}</td>
                  <td>{exp.amount}</td>
                  <td>{exp.categoryName}</td>
                  <td>{exp.date}</td>

                  <div className="btns">
                    <button type='button' onClick={() => Navigate(`/updateExpense/${exp.id}`)} className='btn btn-success'>Edit</button>
                    <button type='button' onClick={() => deleteExpense(exp.id)} className='btn btn-danger'>Delete</button>
                  </div>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExpenseList