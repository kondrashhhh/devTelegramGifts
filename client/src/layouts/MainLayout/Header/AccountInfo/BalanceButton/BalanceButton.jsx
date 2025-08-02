import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { values } from './values';
import styles from './BalanceButton.module.scss';

export default function BalanceButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [currencies, setCurrencies] = useState(values);
  const isCollapse = useMediaQuery({ query: `(max-width: 460px)` });

  const handleClickChange = (clickedItem, clickedIndex) => {
    const updatedCurrencies = currencies.map((item, index) => ({
      ...item,
      active: index === clickedIndex
    }));
    
    const sorted = [...updatedCurrencies].sort((a, b) => 
      (b.active ? 1 : 0) - (a.active ? 1 : 0)
    );
    
    setCurrencies(sorted);
    setIsOpen(!isOpen);
  };

  return (
    <button className={`${styles.balance} button ${isOpen ? styles.open : ''}`}>
      <div className={styles.dropdown}>
        {currencies.map((item, index) => (
          <div
            className={styles.dropItem}
            key={index}
            onClick={() => handleClickChange(item, index)}
          >
            <div className={styles.icon}>
              <img 
                src={item.icon}
                alt={item.title}
              />
            </div>
            <span>2 300 {!isCollapse && item.title}</span>
            {item.active && (
              <div 
                className={styles.dropdownIcon}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </button>
  );
}