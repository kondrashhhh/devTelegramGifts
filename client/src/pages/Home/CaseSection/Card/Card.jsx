import React from 'react'
import { Link } from 'react-router'
import { Price } from '@/components/Price/Price'
import { Typography } from '@/components/Typography/Typography'
import styles from './Card.module.scss'

export const Card = (props) => {
  const { name, price, image, category, translit_name } = props;

  return (
    <div className={styles.card}>
        <Link
         to={`/cases/${category.toLowerCase()}/${translit_name.toLowerCase()}`} 
         className={styles.link}
        >
            <div>
                <img
                 src={image} 
                 alt={name} 
                 className={styles.image}
                />
            </div>
            <div className={styles.title}>
                <Typography tag='span' variant='pre-title'>Кейс</Typography>
                <Typography tag='h3' variant='h4'>{name}</Typography>
            </div>
            <Price value={price}/>
        </Link>
    </div>
  )
}
