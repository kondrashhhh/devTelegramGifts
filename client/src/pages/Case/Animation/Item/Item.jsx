import React from 'react'
import { Price } from '@/components/Price/Price';
import { Typography } from '@/components/Typography/Typography';
import styles from './Item.module.scss'


export const Item = ({ item }) => {
  const name = [...item.name].slice(0, 15).join("") + " ...";

  return (
    <div className={styles.box}>
        <div className={styles.image}>
            { item.image.slice(-3) === "tgs" ? (
                <tgs-player
                    mode="normal"
                    src={`http://localhost:8080/${item.image}`}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            )                                : (
                <img src={item.image} alt={item.name} />
            )}
        </div>
        <div className={styles.title}>
            <Typography tag="span" variant="span">
                {name}
            </Typography>
        </div>
        {/* <Price value={item.price} /> */}
    </div>
  )
}
