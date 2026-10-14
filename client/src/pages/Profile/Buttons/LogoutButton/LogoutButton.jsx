import React from 'react'
import { useNavigate } from 'react-router'
import cn from 'classnames'
import styles from './LogoutButton.module.scss'

export const LogoutButton = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <button
     className={cn(styles.logout, className)}
     onClick={handleClick()}
    >
        Выйти из профиля
    </button>
  )
}
