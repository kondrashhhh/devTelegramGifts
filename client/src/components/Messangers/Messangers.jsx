import React from 'react'
import styles from './Messangers.module.scss'
import { Link } from 'react-router'
import { Flex } from '../Flex/Flex'

export const Messangers = () => {
  const messangers = [
    {title: "telegram", image: "telegram.svg", url: "/"},
    {title: "vk", image: "vk.svg", url: "/"},
    {title: "tiktok", image: "tiktok.svg", url: "/"},
  ]
  return (
    <Flex className={styles.gap}>
        {messangers.map((item, index) => (
            <Link to={item.url} key={index}>
                <img 
                  src={item.image}
                  alt={item.title} 
                />
            </Link>
        ))}
    </Flex>
  )
}
