import React from 'react'
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PrivateRoute() {
    const isloggedIn = localStorage.getItem("user");
  return (
    <div>
       { isloggedIn? <Outlet/>:<Link to="/login" />}
    </div>
  )
}

export default PrivateRoute