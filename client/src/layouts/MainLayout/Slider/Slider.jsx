import React, { useEffect, useState } from 'react';
import styles from './Slider.module.scss'
import Slide from './Slide/Slide';

export default function Slider() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchGift = async () => {
      try {
        const response = await fetch('/api/cases/live-gift');
        if (!response.ok) throw new Error('Не удалось получить подарок');

        const gift = await response.json();
        return { ...gift, liveId: `${gift.item_id}-${Date.now()}-${Math.random()}` };
      } catch (error) {
        console.error('Ошибка live-ленты:', error);
        return null;
      }
    };

    const loadInitialGifts = async () => {
      const initialItems = await Promise.all(
        Array.from({ length: 11 }, () => fetchGift())
      );

      if (!isMounted) return;
      setItems(initialItems.filter(Boolean));

      const interval = setInterval(async () => {
        const gift = await fetchGift();
        if (!isMounted || !gift) return;

        setItems((currentItems) => [gift, ...currentItems].slice(0, 11));
      }, 500);

      return () => clearInterval(interval);
    };

    let stopInterval;
    loadInitialGifts().then((cleanup) => {
      stopInterval = cleanup;
    });

    return () => {
      isMounted = false;
      stopInterval?.();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {items.map((slideData, index) => (
          <Slide
           key={slideData.liveId}
           src={slideData.image} 
           name={slideData.name} 
           rarity={slideData.rarity_category?.name}
          />
      ))}
    </div>
  );
  
}
