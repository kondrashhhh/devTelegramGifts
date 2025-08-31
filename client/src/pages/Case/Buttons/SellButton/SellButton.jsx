import { Price } from '@/components/Price/Price'
import styles from './SellButton.module.scss'
export const SellButton = ({ price, onClick }) => {
  return (
    <button
     className={styles.button}
     onClick={onClick}
    >
        Продать за
        <Price value={price} isItem={true}/>
    </button>
  )
}
