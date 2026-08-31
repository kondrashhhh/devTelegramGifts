import React from 'react';
import { useItemSave, useItemSell } from '@/stores/useCaseStore';
import { useAddInventoryItem } from '@/stores/useUserStore';
import { SellButton } from '../../Buttons/SellButton/SellButton';
import { InventoryButton } from '../../Buttons/InventoryButton/InventoryButton';
import styles from './Item.module.scss';

export const Item = ({ item, index }) => {
  const sell = useItemSell();
  const save = useItemSave();
  const addInventoryItem = useAddInventoryItem();

  const handleSave = () => {
    save(index);

    const itemWithUniqueId = {
      ...item,
      uniqueId: `${item.item_id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    };

    addInventoryItem(itemWithUniqueId);
  };

  return (
    <div className={styles.item}>
      <div className={styles.itemImage}>
        {item.image?.slice(-3) === 'tgs' ? (
          <tgs-player
            autoPlay
            loop
            className={styles.itemImage}
            mode="normal"
            src={item.image}
          />
        ) : (
          <img src={item.image} alt={item.name} />
        )}
      </div>
      <div className={styles.name}>
        <span>{item.name}</span>
      </div>
      <div className={styles.buttons}>
        <SellButton price={item.price} onClick={() => sell(index)} />
        <InventoryButton onClick={handleSave} />
      </div>
    </div>
  );
};