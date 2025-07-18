import React from 'react'
import { Link } from 'react-router'
import { Typography } from '../../../../components/Typography/Typography'
import styles from './Card.module.scss'

export const Card = (props) => {
  const { name, price, image, id } = props;

  return (
    <div className={styles.card}>
        <Link
         to={`/case/${id}`} 
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
            <div className={styles.priceBlock}>
                <span className={styles.price}>{price}</span>
            </div>
        </Link>
    </div>
  )
}
