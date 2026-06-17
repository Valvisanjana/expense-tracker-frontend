import React, { useState } from 'react'
import IncomeAdd from '../income/IncomeAdd'
import IncomeList from '../income/IncomeList'

function Income() {
  const [refresh, setRefresh] = useState(false);

  const refreshList = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <div>
        <IncomeAdd refreshList={refreshList} />
      </div>

      <div>
        <IncomeList refresh={refresh} />
      </div>
    </>
  )
}

export default Income