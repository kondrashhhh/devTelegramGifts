import React, { useState } from 'react';
import { Link } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import styles from './Navigation.module.scss';

export default function Navigation() {
  const [isActive, setIsActive] = useState(() => {
    const savedIndex = localStorage.getItem('activeIndex');
    return savedIndex !== null ? Number(savedIndex) : 0;
  });

  const isMobile = useMediaQuery({ query: `(max-width: 1280px)` });

  const items = [
    { title: "Кейсы", image: "", url: "/" },
    { title: "Конкурсы", image: "", url: "/cases" },
    { title: "Апгрейд", image: "", url: "/upgrade" },
  ];

  const handleClickChange = (index) => {
    setIsActive(index);
    localStorage.setItem('activeIndex', index);
  };

  const showItems = items.map((item, index) => (
    <li key={index}>
      <Link 
        to={item.url}
        className={isActive === index ? styles.active : ''}
        onClick={() => handleClickChange(index)}
      >
        <span>{item.title}</span>
      </Link>
    </li>
  ));

  return (
    <nav className={`${styles.navigation} ${isMobile ? styles.collapse : ''}`}>
      <ul className={styles.list}>
        {showItems}
      </ul>
    </nav>
  );
}
