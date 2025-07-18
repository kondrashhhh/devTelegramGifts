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

  return (
    <header>
      <div className={styles.wrapper}>
        {!isSmallScreen ? (
          !userData ? (
            <ContainerFluid className={`log-parent ${styles.flex}`}>
              <Logo />
              <Online />
              {!isCollapse ? (
                <Navigation isOpen={isOpen} />
              ) : (
                <Burger onClick={() => setIsOpen(prev => !prev)} />
              )}
              <div className={styles.end}>
                <AccountInfo />
              </div>
            </ContainerFluid>
          ) : (
            <ContainerFluid className={`log-parent ${styles.flex}`}>
              <Logo />
              <Online />
              {!isCollapse ? (
                <Navigation isOpen={isOpen} />
              ) : (
                <Burger onClick={() => setIsOpen(prev => !prev)} />
              )}
              <div className={styles.end}>
                <LogBtn />
              </div>
            </ContainerFluid>
          ))  :  (
            <>
              <ContainerFluid className={`log-parent ${styles.flex}`}>
                {!userData ? (
                  <AccountInfo />
                )          : (
                  <LogBtn />
                )}
              </ContainerFluid>
              <ContainerFluid className={`${styles.bottomFlex} ${styles.flex}`}>
                <Flex>
                  <Burger onClick={() => setIsOpen(prev => !prev)} />
                  <Online />
                </Flex>
                <Messangers />
              </ContainerFluid>
            </>
          )
        }
      </div>
    </header>
  );
}