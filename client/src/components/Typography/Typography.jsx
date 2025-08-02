/* eslint-disable no-unused-vars */
import React from 'react';
import cn from 'classnames';
import styles from './Typography.module.scss';

export const Typography = ({ tag: Tag, variant, className, children }) => {
  return (
    <Tag className={cn(styles.title, styles[variant], className)}>
      {children}
    </Tag>
  );
};
