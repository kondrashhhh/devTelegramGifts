import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router';
import { AuthContext } from '../../../../../context/AuthContext'
import styles from './Avatar.module.scss'

export default function Avatar() {
  const { userData } = useContext(AuthContext);
  // const userAvatar = userData.photo_url;
  // const userName = userData.first_name + userData.last_name;

  useEffect(() => {
    console.log("Пользователь: ", userData);
    // console.log("Аватарка: ", userAvatar);
  })

  return (
    <div className={styles.wrapper}>
        <Link to="/" className={styles.link}>
            <span className={styles.name}>@atlantic_de</span>
            <img src='https://t.me/i/userpic/320/tNuYexvI9DfT_mBb7U7ziifNsufu2N1kij2wXlFGgns.jpg' alt="" className={styles.avatar}/>
        </Link>
    </div>
  )
}
