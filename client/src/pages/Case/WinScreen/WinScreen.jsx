import React, { useEffect } from 'react'
import { Flex } from '@/components/Flex/Flex'
import { Item } from './Item/Item'
import { useCaseWinItem } from '@/stores/useCaseStore'
import styles from "./WinScreen.module.scss"

export const WinScreen = () => {
  const itemData = useCaseWinItem();

  useEffect(() => {
    console.log("Выпавшие предметы: ", itemData);
  }, [itemData]);

  return (
    <div className={styles.screen}>
      <Flex className={styles.gap}>
        {Array.isArray(itemData) ? (
          itemData.map((item, index) => (
            <Item item={item} key={item.id} index={index} />
          ))
        ) : (
          <Item item={itemData} />
        )}
      </Flex>
    </div>
  );
};
