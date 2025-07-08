/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './Typography.module.scss';

export const Typography = ({ tag: Tag, variant, children }) => {
  return (
    <Tag className={`${styles.title} ${styles[variant]}`}>
      {children}
    </Tag>
  );
};
