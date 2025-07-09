import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router';
import { AuthContext } from '../../../../../context/AuthContext'
import styles from './Avatar.module.scss'

export default function Avatar() {
  const { userData } = useContext(AuthContext);
  const userAvatar = '';//userData.photo_url;

  useEffect(() => {
    console.log("Пользователь: ", userData);
    console.log("Аватарка: ", userAvatar);
  })

  return (
    <div className={styles.wrapper}>
        <Link to="/">
            <img src={userAvatar} alt="" className={styles.avatar}/>
        </Link>
    </div>
  )
}
