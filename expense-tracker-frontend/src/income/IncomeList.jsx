import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../style/Income.css"

function IncomeList({ refresh }) {
    const [list, setList] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        inlist();
    }, [refresh]);

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/income/removeIncome/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            inlist();

        } catch (error) {
            console.log(error);
        }
    };

    const inlist = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/income/getAllIncomes", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setList(res.data);

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <div className="IncomeList">
                <h2>Income List</h2>
                <table className='table-container'>
                    <thead className='colm-contain' >
                        <tr>
                            <th>Id</th>
                            <th>Amount</th>
                            <th>Income Name</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.map((li, index) => (
                            <tr key={li.incomeId}>
                                <td>{index + 1}</td>
                                <td>{li.amount}</td>
                                <td>{li.incomeName}</td>
                                <td>{li.date}</td>
                                <td>
                                    <button className='dlt-btn' onClick={() => deleteIncome(li.incomeId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default IncomeList;