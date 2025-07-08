import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import styles from './LogoutButton.module.scss';

export default function LogoutButton() {
    const { logout } = useContext(AuthContext);

    const handleClickChange = () => {
        logout()
    };

    return (
        <button className={`${styles.login} button`} onClick={handleClickChange}>
            <img src="/logout.svg" alt="Steam" width={15} height={15} />
        </button>
    );
}
