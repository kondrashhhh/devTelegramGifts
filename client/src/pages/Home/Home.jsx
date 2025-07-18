import React, { useEffect, useState } from 'react';
import { useFilter } from '@/context/FilterContext';
import { CaseSection } from './CaseSection/CaseSection';

export const Home = () => {
  const [caseData, setCaseData] = useState({ results: [] });
  const { activeFilter } = useFilter();  

  const caseAPI = async () => {
    const response = await fetch("http://localhost:3000/api/cases", {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    setCaseData(result);
  };

  useEffect(() => {
    caseAPI();
  }, []);

  const categoryNames = caseData.results
  .filter(section => section.cases.length > 0)
  .map(section => ({ name: section.filter, id: section.category_id }));

  const sectionsToShow = activeFilter === "all" 
  ? caseData.results.filter(section => section.cases?.length > 0)
  : caseData.results.filter(section => section.category_id === activeFilter && section.cases?.length > 0);

  return (
    <>
      {sectionsToShow.map((caseSection, index) => (
        <CaseSection
          categories={index === 0 ? categoryNames : null}
          key={index}
          id={caseSection.id}
          name={caseSection.name}
          cases={caseSection.cases}
        />
      ))}
    </>
  );
};