import React from 'react';
import cn from 'classnames';
import Skip from './skip.svg';
import styles from "./SkipButton.module.scss";

export const SkipButton = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(styles.open, className)}
      type="button"
    >
      <Skip />
      открыть сразу
    </button>
  );
};