import PlusIcon from './Plus.svg'
import styles from './InventoryButton.module.scss'
export const InventoryButton = ({ onClick }) => {
  return (
    <button
     className={styles.button}
     onClick={onClick}
    >
        <PlusIcon />
        В профиль
    </button>
  )
}
