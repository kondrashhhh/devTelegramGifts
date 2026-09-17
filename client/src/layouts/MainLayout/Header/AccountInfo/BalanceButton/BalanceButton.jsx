import React, { useState } from 'react';
import { Link } from 'react-router'
import { useGetCurrency, useSetCurrency } from '@/stores/useCurrencyStore';
import { useMediaQuery } from 'react-responsive';
import { values } from './values';
import styles from './BalanceButton.module.scss';

export default function BalanceButton() {
  const setGlobalCurrency = useSetCurrency();
  const { calculate } = useGetCurrency();

  const [isOpen, setIsOpen] = useState(false);
  const [currencies, setCurrencies] = useState(values);
  const isCollapse = useMediaQuery({ query: `(max-width: 460px)` });

  const handleClickChange = (clickedItem, currency, clickedIndex) => {
    const updatedCurrencies = currencies.map((item, index) => ({
      ...item,
      active: index === clickedIndex
    }));
    
    const sorted = [...updatedCurrencies].sort((a, b) => 
      (b.active ? 1 : 0) - (a.active ? 1 : 0)
    );
    
    setCurrencies(sorted);
    setIsOpen(!isOpen);
    setGlobalCurrency(currency);
  };

return (
  <div
    className={`${styles.balance} button ${
      isOpen ? styles.open : ''
    }`}
  >
    <div className={styles.balanceContent}>
      <div className={styles.dropdown}>
        {currencies.map((item, index) => (
          <div
            className={styles.dropItem}
            key={index}
            // onClick={() =>
            //   handleClickChange(item, item.title, index)
            // }
          >
            <div className={styles.icon}>
              <img
                src={item.icon}
                alt={item.title}
              />
            </div>

            <span>
              {calculate(item.title, true)}{' '}
              {!isCollapse && item.title}
            </span>
            <Link to="/up">
              <button
                type="button"
                className={styles.depositButton}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5C5 6.67 5.67 6 6.5 6H17.5C18.33 6 19 6.67 19 7.5V16.5C19 17.33 18.33 18 17.5 18H6.5C5.67 18 5 17.33 5 16.5V7.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />

                  <path
                    d="M5 9H17.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M15 13V16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M13.5 14.5H16.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}