import React from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import styles from './Burger.module.scss';

export default function Burger({ onClick }) {
    return (
        <button className={`${styles.login} button`} onClick={onClick} >
            <img src="/header/burger.svg" alt="Steam" width={15} height={15} />
        </button>
    );
}
