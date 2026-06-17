import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Home.css'
function Home() {
    return (
        <center>
            <div className="home-container">
                <div className="h-box">
                    <h3 className='web-title'>Expense-Tracker Website</h3>
                    <div className="descript">Expense Tracker helps you manage your daily income and expenses easily. Track your spending, monitor savings, and stay in control of your finances.</div>
                    <div className="linkBox">
                        <Link className='mylink' to="/login">Login</Link>
                        <Link className='mylink' to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </center>
    )
}

export default Home