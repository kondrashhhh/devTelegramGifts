import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { useCaseCount, useCaseDisabled, useCaseSetCount } from '@/stores/useCaseStore';
import { CountButton } from './CountButton/CountButton';
import styles from "./Counter.module.scss";

export const Counter = () => {
  const count = useCaseCount();
  const isDisabled = useCaseDisabled();
  const setCount = useCaseSetCount();
  const numbers = [1, 2, 3, 4, 5];
  const indicatorRef = useRef(null);
  const buttonsRef = useRef([]);

  useEffect(() => {
    const activeButton = buttonsRef.current.find(
      btn => btn && btn.dataset.number === String(count)
    );
    
    if (activeButton && indicatorRef.current && !isDisabled) {
      indicatorRef.current.style.width = `${activeButton.offsetWidth}px`;
      indicatorRef.current.style.left = `${activeButton.offsetLeft}px`;
    }
  }, [count]);

  return (
    <div className={cn(styles.counter, isDisabled && styles.disabled)}>
      <div className={styles['active-indicator']} ref={indicatorRef} />
      {numbers.map((number, index) => (
        <div 
          key={number}
          ref={el => buttonsRef.current[index] = el}
          data-number={number}
        >
          <CountButton
            number={number}
            onClick={() => setCount(number)}
            isActive={count === number}
          />
        </div>
      ))}
    </div>
  );
};