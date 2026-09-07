import React from 'react'
import {useSellInventoryItem} from '@/stores/useUserStore'
import { Typography } from '@/components/Typography/Typography';
import { Price } from '@/components/Price/Price';
import styles from './Item.module.scss'

export const Item = ({ item }) => {
  const { name, image, price } = item;
//   const formatName = [...name].slice(0, 15).join("") + " ...";
  const sellItem = useSellInventoryItem();

  return (
    <div className={styles.box}>
        <div className={styles.image}>
            { image.slice(-3) === "tgs" ? (
                <tgs-player
                    mode="normal"
                    src={`${image}`}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            )                                : (
                <img src={`${image}`} alt={name} />
            )}
        </div>
        <Typography tag="span" variant="span" className={styles.text}>
            {name}
        </Typography>
        <Price value={price} className={styles.priceColor} isItem={false}/>
    </div>
  )
}
