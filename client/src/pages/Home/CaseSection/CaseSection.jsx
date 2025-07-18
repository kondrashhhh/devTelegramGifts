import React, { useEffect } from 'react'
import { Card } from './Card/Card'
import { TitleSection } from './TitleSection/TitleSection'
import styles from './CaseSection.module.scss'

export const CaseSection = ({ categories = [], name, cases }) => {

  useEffect(() => {
    console.log(name, cases);
  }, [])
  
  return (
    <div className={`${styles.wrapper} case-section`}>
      <div className={styles.cases}>
        <TitleSection
         items={categories}
        >
          {name}
        </TitleSection>
        {
          cases.map((caseItem, index) => {
            return (
              <Card 
                key={index}
                {...caseItem}
              />
            );
          })
        }
      </div>
    </div>
  )
}