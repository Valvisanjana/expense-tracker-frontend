import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/Categories.css'

function Categories({ categories, cateList }) {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");
  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:8081/api/category/remove/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    setMsg("category Deleted!")
    cateList();
  }
  return (
    <div className='list-container'>
      <h2>Category List</h2>
      <table className='table-container'>
        <thead className='colm-contain' >
          <tr>
            <th>ID</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.categoryName}</td>
              <td>
                <button onClick={() => navigate(`/updateCategory/${c.categoryId}`)}>Edit</button>
                <button className='dlt-btn' onClick={() => deleteCategory(c.categoryId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Categories