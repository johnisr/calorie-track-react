import React from 'react';
import './InfoFilters.css';

const InfoFilters = ({dataFilterValue, onDataFilterChange, selected, macroFilter}) => (
  <div className="infoFilters">
    <div className="flex-right-end">
      <select
        className="infoFilters__select"
        value={dataFilterValue} 
        onChange={onDataFilterChange}
      >
        <option value={0}>All</option>
        <option value={-28}>Last 4 Weeks</option>
        <option value={-14}>Last 2 Weeks</option>
        <option value={-7}>Last Week</option>
      </select>
    </div>
  </div>
);

export default InfoFilters;