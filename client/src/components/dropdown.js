import React from 'react';
import './dropdown.css';

const Dropdown = (prop) => {

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter</label>
        <select value={prop.filter} onChange={(e)=>prop.setFilter(e.target.value)}>
          <option value='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='pending'>Pending</option>
        </select>
      </div>
    </div>
  );
};

export default Dropdown;