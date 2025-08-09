import React, { useEffect, useState } from 'react'
import { useCaseItems, useCaseSetOpening, useCaseWinItem, useWinScreen } from '@/stores/useCaseStore'
import { AnimatePresence, motion } from 'framer-motion'
import { Item } from './Item/Item'
import { Flex } from '@/components/Flex/Flex'
import styles from './Animation.module.scss'

export const Animation = () => {
  const items = useCaseItems();
  const winItem = useCaseWinItem();
  const setOpening = useCaseSetOpening();
  const { setWinScreen } = useWinScreen();
  const [isReady, setIsReady] = useState(false)
  
  
  const scrollItems = React.useMemo(() => {
    const baseItems = [...items, ...items, ...items, ...items, winItem].sort(() => Math.random() - 0.5);
          (baseItems.length - 1) % 2 !== 0 && baseItems.pop();
          baseItems[(baseItems.length - 1) / 2] = winItem;
    return baseItems
  }, [items, winItem])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      <Flex className={styles.gap}>
        <div className={styles.activeItem}></div>
        <div className={styles.shadow}></div>
        
        <motion.div
          initial={{ x: "49.35%" }}
          animate={isReady ? { x: "0%" } : { x: "49.35%" }}
          transition={{ duration: 11, ease: [0.12, 0, 0, 0.99] }}
          style={{ display: 'flex', willChange: 'transform' }}
          onAnimationComplete={() => isReady &&
            setTimeout(() => {
              setOpening(false);
              setWinScreen(true);
            }, 1000)
          }
        >
          {scrollItems.map((item, index) => (
            <Item item={item} key={`${index}-${item.id}`}/>
          ))}
        </motion.div>
        
        <div className={styles.shadow}></div>
      </Flex>
    </AnimatePresence>
  )
}