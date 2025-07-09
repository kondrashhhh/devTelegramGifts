import React, { useState, useEffect, useContext } from 'react';
import { useMediaQuery } from '@mui/material';
import { AuthContext } from '../../../context/AuthContext';
import styles from './Header.module.scss';
import Burger from './Burger/Burger';
import Logo from '../../../components/Logo/Logo';
import { Online } from './Online/Online';
import Navigation from './Navigation/Navigation';
import AccountInfo from './AccountInfo/AccountInfo';
import LogBtn from './LogBtn/LogBtn';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, userData } = useContext(AuthContext);
  const isSmallScreen = useMediaQuery('(max-width:992px)');

  useEffect(() => {
    console.log("Статус авторизации:", isAuthenticated);
    console.log("Данные пользователя:", userData);
  }, [isAuthenticated, userData]);

  const activeComponent = userData ? <AccountInfo /> : <LogBtn />

  return (
    <header>
      <div className={styles.wrapper}>
        <div className={`container-fluid log-parent ${styles.flex}`}>
          <Logo />
          <Online />
          <Navigation isOpen={isOpen} />
          <div className={styles.end}>
            {activeComponent}
            {isSmallScreen && <Burger onClick={() => setIsOpen(prev => !prev)} />}
          </div>
        </div>
      </div>
    </header>
  );
}