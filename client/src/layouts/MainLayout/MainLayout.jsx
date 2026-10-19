import React from 'react'
import { ContainerFluid } from '@/components/ContainerFluid/ContainerFluid';
import { Notification } from '@/components/Notification/Notification';
import { useSetParams } from '@/stores/useNotificationStore';
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Slider from './Slider/Slider'
import styles from './MainLayout.module.scss'

export default function MainLayout({ children }) {
  const setParams = useSetParams();
  return (
    <div className={styles.layout}>
        <div className={styles.topShadow}></div>
        <div className={styles.bottomShadow}></div>
        <Slider />
        <Header />
        <ContainerFluid>
          { children }
        </ContainerFluid>
        <Footer />

        <Notification />

        <div className={styles.testNotif}>
          <button onClick={() => setParams('good')}>Good</button>
          <button onClick={() => setParams('bad')}>Bad</button>
        </div>
    </div>
  )
}
