import React from 'react'
import { Link } from 'react-router'
import { Typography } from '../../../../components/Typography/Typography'
import styles from './Card.module.scss'

export const Card = (props) => {
  const { title, price, image, id } = props;

  return (
    <div className={styles.card}>
        <Link
         to={`/case/${id}`} 
         className={styles.link}
        >
            <div>
                <img
                 src={image} 
                 alt={title} 
                 className={styles.image}
                />
            </div>
            <div className={styles.title}>
                <Typography tag='h3' variant='span'>{title}</Typography>
            </div>
            <div className={styles.price}>
                <span className={styles.price}>{price} ₽</span>
            </div>
        </Link>
    </div>
  )
}
