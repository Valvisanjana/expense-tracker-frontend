import './App.css'
import Dashboard from './Pages/Dashboard'
import LoginForm from './Pages/LoginForm'
import RegisterForm from './Pages/RegisterForm'
import { Routes, Route } from 'react-router-dom'
import Expense from './expense/Expense.jsx';
import Income from './Pages/Income';
import Category from './category/Category';
import Saving from './Pages/Saving';
import ExpenseList from './expense/ExpenseList.jsx'
import Home from './Pages/Home.jsx'
import PrivateRoute from './Pages/PrivateRoute.jsx'
import AddExpense from "./expense/AddExpense";
import AddCategory from './category/AddCategory.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Dashboard Layout Route */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expense" element={<Expense />} />
          <Route path='/expenses' element={<ExpenseList />} />
          <Route path="/income" element={<Income />} />
          <Route path="/category" element={<Category />} />
          <Route path="/saving" element={<Saving />} />
          <Route path="/addExpense" element={<AddExpense />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/updateExpense/:id" element={<AddExpense />} />
          <Route path='/updateCategory/:id' element={<AddCategory />} />
        </Route>
      </Routes >
    </>
  )
}

export default App
