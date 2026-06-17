import React, { useState } from 'react'
import AddCategory from './AddCategory'
import Categories from './Categories'
import { useEffect } from 'react';
import axios from 'axios';

function Category() {
  const [categories, setcategories] = useState([]);

  const token = localStorage.getItem("token");
  const cateList = async () => {
    const list = await axios.get("http://localhost:8081/api/category/categories", {
      headers:{
        Authorization: `Bearer ${token}`
      },
    });
    setcategories(list.data);
  };

  useEffect(() => {
    cateList();
  }, []);

  return (
    <div>
      <AddCategory cateList={cateList} />
      <Categories categories={categories} cateList={cateList}  />
    </div>
  )
}

export default Category