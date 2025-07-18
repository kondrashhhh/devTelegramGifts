import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const changeFilter = (index) => {
    setActiveFilter(index);
    console.log(activeFilter)
  };

  return (
    <FilterContext.Provider value={{ activeFilter, changeFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  return context;
};