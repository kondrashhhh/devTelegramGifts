import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Flex } from '@/components/Flex/Flex'
import styles from './Information.module.scss'
import 'swiper/css'

export const Information = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 1280px)` });
  return (
    <Flex className={styles.flex}>
      <Swiper
       className={styles.slider}
       slidesPerView={1}
      >
        <SwiperSlide className={styles.slide}>
          <div className={styles.text}>
            <span>Дарим <br /> +10TON</span>
            { !isMobile ? (
              <span className={styles.subtitle}>На первый депозит</span>
            )           : (
              <span className={styles.subtitle}>На первый <br /> депозит</span>
            )}
          </div>
          <div className={styles.image}>
            <img src="slides/ton_slider.svg" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles.text}>
            <span>Дарим <br /> +10TON</span>
            { !isMobile ? (
              <span className={styles.subtitle}>На первый депозит</span>
            )           : (
              <span className={styles.subtitle}>На первый <br /> депозит</span>
            )}
          </div>
          <div className={styles.image}>
            <img src="slides/ton_slider.svg" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span>БОНУС 20% <br /> НА ПОПОЛНЕНИЕ</span>
          <button className={styles.bonus}>
            Применить
          </button>
        </div>
        <div className={styles.infoItem}>
          <Flex className={styles.flexText}>
            <span>ПРИВЕДИ <br /> ДРУГА!</span>
            <span>И ПОЛУЧИ <br /> ПОДАРОК</span>
          </Flex>
        </div>
      </div>
    </Flex>
  )
}
