import React, { useState } from 'react'
import '../style/AddExpense.css'
import axios from 'axios'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

function AddExpense() {

  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    categoryId: "",
    date: ""
  });

  const token = localStorage.getItem("token");
  const loadExpense = async () => {
    const res = await axios.get(`http://localhost:8081/api/expense/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setExpense({
      title: res.data.title,
      amount: res.data.amount,
      categoryId: res.data.categoryId,
      date: res.data.date
    });
  };
  const [categories, setCategories] = useState([]);

  const cateList = async () => {
    const list = await axios.get("http://localhost:8081/api/category/categories", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setCategories(list.data);
  };

  useEffect(() => {
    cateList();

    if (id) {
      loadExpense();
    }
  }, []);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      ...expense,
      categoryId: Number(expense.categoryId)
    };

    try {
      if (id) {
        // update
        await axios.put(
          `http://localhost:8081/api/expense/update/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setMsg("Expense Updated!");
      } else {
        // add
        await axios.post(
          "http://localhost:8081/api/expense/add",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setMsg("Expense Added!");
      }

      setExpense({ amount: "", title: "", categoryId: "", date: "" });
      etTimeout(() => {
        navigate("/expenses");   
      }, 1000);

    } catch (error) {
      alert("Failed!");
    }
  };

  return (
    <div>
      <center>
        <div className="custom-form-container">
          <form onSubmit={submitHandler} className='exp-form' >
            <h2>{id ? "Edit Expense" : "Add Expense"}</h2>
            <input type="text"
              name='title'
              value={expense.title}
              placeholder='expense Name'
              onChange={handleChange} required
            />

            <input type="number"
              name='amount'
              value={expense.amount}
              placeholder='add expense amount'
              onChange={handleChange} required
            />

            <select name="categoryId" value={expense.categoryId}
              onChange={handleChange}>
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}

            </select>

            <input type="date"
              name='date'
              value={expense.date}
              placeholder='date'
              onChange={handleChange} required
            />

            <button className='exp-btn btn btn-primary'>
              {id ? "Update" : "Add"}
            </button>
            {msg && <p style={{ padding: '5px' }}>{msg}</p>}
            <p className='exp-text'>To see more expense click on <Link to="/expenses">Expenses</Link></p>
          </form>
        </div>
      </center>
    </div>
  )
}

export default AddExpense