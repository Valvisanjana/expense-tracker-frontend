import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='custom-navbar'>
            <h3 className='logo'>ExpenseTracker</h3>
            
            {/* links */}
            <div className={`nav-links ${isOpen ? "active" : ""}`}>
                <Link className="nvlink" to="/expense">Expense</Link>
                <Link className="nvlink" to="/income">Income</Link>
                <Link className="nvlink" to="/category">Category</Link>
            </div>

            {/* mobile nav */}
            <button onClick={() => setIsOpen(!isOpen)} className='menu-btn'>
                {!isOpen ? '☰' : '#'}
            </button>
        </nav>
    )
}

export default Navbar