import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/Loading/Loading';
import { Flex } from '@/components/Flex/Flex';
import { Animation } from './Animation/Animation';
import { Typography } from '@/components/Typography/Typography';
import { Parallax } from './Parallax/Parallax';
import { Buttons } from './Buttons/Buttons';
import { Counter } from './Counter/Counter';
import { DoubleChance } from './DoubleChance/DoubleChance';
import { useCaseStore } from '@/stores/useCaseStore';
import styles from './Case.module.scss';

export const Case = () => {
  const { category, translit_name } = useParams();
  const parallaxRef = useRef(null);
  
  const {
    caseData,
    loading,
    isOpening,
    fetchCase,
  } = useCaseStore();
  
  const MemoButtons = React.memo(Buttons);

  useEffect(() => {
    if (category && translit_name) {
      fetchCase(category, translit_name);
    }
  }, [category, translit_name]);

  const parallaxItems = caseData?.items?.slice(0, 6);
  const caseInfo = { "category": category, "name": translit_name };

  if (loading) {
    return (
        <Loading />
    );
  }

  return (
    <div className={styles.caseDetail} ref={parallaxRef}>
      <Parallax parallaxItems={parallaxItems} isOpening={isOpening} />
      
      <Typography tag="h3" variant="type">Кейс</Typography>
      <Typography tag="h2" variant="h2">{caseData?.name}</Typography>
      
      {isOpening ? (
        <Animation />
      ) : (
        <div className={styles.image}>
          <img src={caseData?.image} alt={caseData?.name} />
        </div>
      )}
      
      <Flex className={styles.count}>
        <Typography tag="span" variant="standart">
          Сколько кейсов открыть?
        </Typography>
        <Counter />
        <DoubleChance />
        <MemoButtons
          info={caseInfo}
        />
      </Flex>
    </div>
  );
};