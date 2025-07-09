import React, { useState, useEffect, useContext } from 'react'
import { useMediaQuery } from '@mui/material';
import { AuthContext } from '../../../context/AuthContext'
import styles from './Header.module.scss'
import Burger from './Burger/Burger';
import Logo from '../../../components/Logo/Logo'
import { Online } from './Online/Online';
import Navigation from './Navigation/Navigation'
import AccountInfo from './AccountInfo/AccountInfo'
import LogBtn from './LogBtn/LogBtn'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const isSmallScreen = useMediaQuery('(max-width:992px)');

  const activeComponent = isAuthenticated ? <AccountInfo /> : <LogBtn />;

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
      console.log("Авторизован ли пользователь: ", isAuthenticated)
  }, []);


  return (
    <header>
      <div className={styles.wrapper}>
        <div className={`container-fluid log-parent ${styles.flex}`}>
          <Logo />
          <Online />
          <Navigation isOpen={isOpen} />
          <div className={styles.end}>
            {activeComponent}
            {
              isSmallScreen && (
                <Burger onClick={toggleMenu} />
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}
