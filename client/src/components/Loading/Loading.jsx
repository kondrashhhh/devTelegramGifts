import React from 'react';
import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.loading}>
        <div className={styles.windows8}>
            {[1, 2, 3, 4, 5].map((ball) => (
                <div key={ball} className={styles.wBall} id={styles[`wBall_${ball}`]}>
                    <div className={styles.wInnerBall}></div>
                </div>
            ))}
        </div>
    </div>
  );
};