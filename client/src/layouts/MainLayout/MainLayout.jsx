import React from 'react'
import { ContainerFluid } from '@/components/ContainerFluid/ContainerFluid';
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Slider from './Slider/Slider'
import styles from './MainLayout.module.scss'

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
        <div className={styles.shadow}></div>
        <Slider />
        <Header />
        <ContainerFluid>
          { children }
        </ContainerFluid>
    </div>
  )
}
