import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Используйте react-router-dom вместо react-router
import { Typography } from '../../components/Typography/Typography';
import styles from './Case.module.scss';

export const Case = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dev-telegram-gifts.ru`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error('Кейс не найден');
        }
        
        const data = await response.json();
        setCaseData(data);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Typography tag="p" variant="body1">Загрузка...</Typography>
      </div>
    );
  }

  return (
    <div className={styles.caseDetail}>
      <Typography tag="h2" variant="h4">{caseData.title}</Typography>
    </div>
  );
};