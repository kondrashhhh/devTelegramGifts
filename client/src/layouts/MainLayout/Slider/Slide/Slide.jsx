import React from 'react'
import styles from './Slide.module.scss'
import { weaponRarity } from '../../../../hooks/weaponRarity'
export default function Slide({ src, name, rarity }) {
  const rarityClass = weaponRarity(rarity, name);
  return (
    <a href="/user/5433520" className={`${styles.box} ${styles[rarityClass]}`}>
        <div className={styles.inner}>
            <div className={styles.wrapperImg}>
                <img src={src} alt={name} className={styles.img} loading="lazy" width={69} height={69}/>
            </div>
            <div className={styles.name}>{name}</div>
        </div>
    </a>
  )
}
