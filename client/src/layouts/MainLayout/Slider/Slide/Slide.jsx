import React from 'react'
import './Slide.css'
import { weaponRarity } from '../../../../hooks/weaponRarity'
export default function Slide({ src, name, rarity }) {
  const rarityClass = weaponRarity(rarity, name);
  return (
    <a href="/user/5433520" className={`box ${rarityClass}`}>
        <div className="inner">
            <div className="wrapperImg">
                <img src={src} alt={name} className="img" loading="lazy" />
            </div>
            <div className="name">{name}</div>
        </div>
    </a>
  )
}
