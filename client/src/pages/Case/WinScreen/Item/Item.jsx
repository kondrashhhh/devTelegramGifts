import React from 'react'
import { Price } from '@/components/Price/Price';
import { useWinScreen } from '@/stores/useCaseStore';
import styles from "./Item.module.scss"

export const Item = ({ item }) => {
  const { setWinScreen } = useWinScreen();

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
        <Price value={item.price} disabled={false}/>
        <div className={styles.buttons}>
            <button onClick={() => setWinScreen(false)}>Продать</button>
            <button onClick={() => setWinScreen(false)}>В инвентарь</button>
        </div>
    </div>
  )
}
