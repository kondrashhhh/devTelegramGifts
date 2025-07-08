import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Slider from './Slider/Slider'
import styles from './MainLayout.module.scss'

export default function MainLayout({ children }) {
  return (
    <div className={styles.layout}>
        <Slider />
        <Header />
        <div className={styles.content}>
          { children }
        </div>
        {/* <Footer /> */}
    </div>
  )
}
