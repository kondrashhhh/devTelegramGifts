import React, { useEffect } from 'react'
import { Card } from './Card/Card'
import { Typography } from '../../../components/Typography/Typography'
import styles from './CaseSection.module.scss'

export const CaseSection = ({ title, cases }) => {

  useEffect(() => {
    console.log(title, cases);
  }, [])
  
  return (
    <div className={`${styles.wrapper} case-section`}>
        <Typography tag='h2' variant='h4'>{title}</Typography>
        <div className={styles.cases}>
            {
            cases.map((caseItem, index) => (
                <Card 
                  key={index}
                  {...caseItem}
                />      
            ))
            }
        </div>
    </div>
  )
}
