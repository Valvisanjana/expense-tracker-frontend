import axios from 'axios';
import React, { useState } from 'react'
import "../style/Income.css"

function IncomeAdd(props) {
    const [income, setIncome] = useState({
        amount: "",
        incomeName: "",
        date: ""
    });

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setIncome({ ...income, [e.target.name]: e.target.value });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8081/api/income/addIncome", income,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                });
            alert("Income Added Successfully");
            props.refreshList();
            setIncome({
                amount: "",
                incomeName: "",
                date: ""
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="incomeContainer">
                <div className="addBox">
                    <form onSubmit={submitHandler}>
                        <input type="number" name="amount" placeholder='add income amount' value={income.amount} onChange={handleChange} required />
                        <input type="text" name="incomeName" placeholder='add income name' value={income.incomeName} onChange={handleChange} required />
                        <input type="date" name="date" value={income.date} onChange={handleChange} required />
                        <button type='submit' className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IncomeAdd