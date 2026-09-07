import React, { useContext, useEffect } from 'react'
import cn from 'classnames';
import { Link } from 'react-router';
import { AuthContext } from '../../../../../context/AuthContext'
import styles from './Avatar.module.scss'

export default function Avatar({ showName, className }) {
  const { userData } = useContext(AuthContext);
  const userAvatar = userData.photo_url;
  const userName = userData.first_name + userData.last_name;

  useEffect(() => {
     console.log("Пользователь: ", userData);
     console.log("Аватарка: ", userAvatar);
  }, [userData, userAvatar]);

  return (
    <div className={styles.wrapper}>
        <Link to="/profile" className={styles.link}>
            { showName && <span className={styles.name}>{userName}</span>} 
            <img src={userAvatar} alt="" className={cn(styles.avatar, className)}/>
        </Link>
    </div>
  )
}
