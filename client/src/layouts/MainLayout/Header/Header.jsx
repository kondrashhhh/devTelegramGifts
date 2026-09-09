import React, { useState, useEffect, useContext } from 'react';
import { ContainerFluid } from '@/components/ContainerFluid/ContainerFluid';
import { useMediaQuery } from '@mui/material';
import { AuthContext } from '../../../context/AuthContext';
import { Flex } from '@/components/Flex/Flex';
import { Messangers } from '@/components/Messangers/Messangers';
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
  const isSmallScreen = useMediaQuery('(max-width:680px)');
  const isCollapse = useMediaQuery('(max-width:1280px)');

  useEffect(() => {
    console.log("Статус авторизации:", isAuthenticated);
    console.log("Данные пользователя:", userData);
  }, [isAuthenticated, userData]);

  // Общая часть для desktop/tablet (навигация, лого, онлайн)
  const DesktopContent = (
    <>
      <Logo />
      <Online />
      {!isCollapse ? (
        <Navigation isOpen={isOpen} />
      ) : (
        <Burger onClick={() => setIsOpen(prev => !prev)} />
      )}
      <div className={styles.end}>
        {userData ? <AccountInfo /> : <LogBtn />}
      </div>
    </>
  );

  // Контент для маленького экрана (mobile)
  const MobileContent = (
    <>
      <ContainerFluid className={`log-parent ${styles.flex}`}>
        {/* Проверка: если юзер авторизован, показываем AccountInfo, иначе LogBtn */}
        {userData ? <AccountInfo /> : <LogBtn />}
      </ContainerFluid>
      <ContainerFluid className={`${styles.bottomFlex} ${styles.flex}`}>
        <Flex>
          <Burger onClick={() => setIsOpen(prev => !prev)} />
          <Online />
        </Flex>
        <Messangers />
      </ContainerFluid>
    </>
  );

  return (
    <header>
      <div className={styles.wrapper}>
        {!isSmallScreen ? (
          <ContainerFluid className={`log-parent ${styles.flex}`}>
            {DesktopContent}
          </ContainerFluid>
        ) : (
          MobileContent
        )}
      </div>
    </header>
  );
}