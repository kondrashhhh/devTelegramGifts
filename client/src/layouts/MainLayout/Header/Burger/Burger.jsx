import React from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import styles from './Burger.module.scss';

export default function Burger({ onClick }) {
    return (
        <div className={styles.wrapper}>
            <button className={`${styles.login} button`} onClick={onClick} >
                <img src="/header/burger.svg" alt="Steam" width={27.5} height={27.5} />
            </button>
        </div>
    );
}
