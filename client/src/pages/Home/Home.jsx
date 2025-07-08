import React, { useEffect, useState } from 'react';
import { CaseSection } from './CaseSection/CaseSection';
import styles from './Home.module.scss';

export const Home = () => {
  const [caseData, setCaseData] = useState([]);

  const caseAPI = async () => {
    const response = await fetch("https://dev-telegram-gifts.ru/api/cases", {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await response.json();
    setCaseData(result);
  };  

  useEffect(() => {
    caseAPI();
  }, []);

  useEffect(() => {
    console.log(caseData);
  }, []);

  return (
    <div className={styles.wrapper}>
      {
        caseData.map((caseSection, index) => (
            <CaseSection
             key={index}
             title={caseSection.title} 
             cases={caseSection.cases}
            />
        ))
      }
    </div>
  );
};