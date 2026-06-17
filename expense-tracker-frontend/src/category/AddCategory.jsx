import React, { useEffect, useState } from 'react'
import axios from "axios";
import '../style/AddCategory.css'
import { useParams } from 'react-router-dom';

function AddCategory({ cateList }) {
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");

    const { id } = useParams();
    const loadCategory = async () => {
        const res = await axios.get(`http://localhost:8081/api/category/get/${id}`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });
        setName(res.data.categoryName);
    };

    useEffect(() => {
        if (id) {
            loadCategory();
        }
    }, []);

    const token = localStorage.getItem("token");
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                // update
                await axios.put(`http://localhost:8081/api/category/updateCate/${id}`,
                    { categoryName: name },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setMsg("Category Updated!");
            } else {
                // Add
                await axios.post("http://localhost:8081/api/category/addCategory",
                    { categoryName: name },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setMsg("Category Added!");
            }
            setName("");
            cateList();

            setTimeout(() => {
                setMsg("");
            }, 2000);

        } catch (err) {
            alert("Failed!");
        }
    }
    return (
        <div className='category-container'>
            <form className="form-container" onSubmit={handleSubmit}>
                <h2>{id ? "Edit Category" : "Add Category"}</h2>

                <input
                    type="text"
                    placeholder='Category name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button type='submit' className="addCat">
                    {id ? "Update" : "Add"}
                </button>
                {msg && <p style={{ padding: '10px' }}>{msg}</p>}
            </form>
        </div>
    )
}

export default AddCategory