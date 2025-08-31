import React, { useEffect } from 'react'
import { useItemSave, useItemSell } from '@/stores/useCaseStore';
import { SellButton } from '../../Buttons/SellButton/SellButton';
import { InventoryButton } from '../../Buttons/InventoryButton/InventoryButton';
import styles from "./Item.module.scss"

export const Item = ({ item, index }) => {
  const sell = useItemSell();
  const save = useItemSave();

  useEffect(() => {
    console.log(item);
  }, [])

  return (
    <div className={styles.item}>
        <div className={styles.itemImage}>
            { item.image.slice(-3) === "tgs" ? (
                <tgs-player
                    autoPlay
                    loop
                    className={styles.itemImage}
                    mode="normal"
                    src={`http://localhost:8080/${item.image}`}
                />
            )                                : (
                <img src={item.image} alt={item.name} />
            )}
        </div>
        <div className={styles.name}>
            <span>{item.name}</span>
        </div>
        <div className={styles.buttons}>
            <SellButton price={item.price} onClick={() => sell(index)}/>
            <InventoryButton onClick={() => save(index)}/>
        </div>
    </div>
  )
}
