import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styles from './BalanceButton.module.scss';

export default function BalanceButton() {
  const [isOpen, setIsOpen] = useState(false);
  const isCollapse = useMediaQuery({query: `(max-width: 460px)`})

  return (
    <button className={`${styles.balance} button ${isOpen ? styles.open : ''}`}>
      <Link to="/">
        <div>
          <img src="/currencies/ruble.svg" alt="ruble" />
        </div>
        <span>2 300 { !isCollapse && (<>РУБ.</>) }</span>
        <div 
          className={styles.dropdownIcon}
          onClick={(e) => {
            e.preventDefault;
            setIsOpen(!isOpen);
          }}
        />
      </Link>
    </button>
  );
}