import React, { useState } from 'react'
import AddExpense from './AddExpense'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import ExpenseList from './ExpenseList'
import '../style/Expense.css'

function Expense() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="exp-conainter">
        <button className="backword-btn" style={{background:"gray"}} onClick={() => navigate(-1)}>-</button>
        <AddExpense />
      </div>
    </div>
  )
}
export default Expense