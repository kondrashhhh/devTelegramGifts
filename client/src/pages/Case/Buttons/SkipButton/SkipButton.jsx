import React from 'react';
import cn from 'classnames';
import Skip from './skip.svg';
import { useCaseCount, useCaseDisabled, useCaseOpen } from '@/stores/useCaseStore'
import styles from "./SkipButton.module.scss";

export const SkipButton = ({ info, className }) => {
  const isDisabled = useCaseDisabled();
  const count = useCaseCount();
  const open = useCaseOpen();
  const isSkipButton = true;

  return (
    <button
      onClick={() => open(
        info.category,
        info.name,
        isDisabled,
        count,
        isSkipButton,
      )}
      className={cn(styles.open, className)}
      type="button"
    >
      <Skip />
      открыть сразу
    </button>
  );
};