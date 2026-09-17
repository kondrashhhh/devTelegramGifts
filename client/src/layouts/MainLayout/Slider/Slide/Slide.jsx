import React from 'react'
import styles from './Slide.module.scss'
import { weaponRarity } from '../../../../hooks/weaponRarity'
export default function Slide({ src, name, rarity }) {
  const rarityClass = weaponRarity(rarity, name);
  return (
    <a href="/user/5433520" className={`${styles.box} ${styles[rarityClass]}`}>
        <div className={styles.inner}>
            <div className={styles.wrapperImg}>
              <div className={styles.image}>
            { src.slice(-3) === "tgs" ? (
                <tgs-player
                    mode="normal"
                    src={`${src}`}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            )                                : (
                <img src={`${src}`} alt={name} />
            )}
            </div>
            </div>
            <div className={styles.name}>{name}</div>
        </div>
    </a>
  )
}
