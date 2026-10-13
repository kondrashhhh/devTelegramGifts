import styles from './Items.module.scss'
import items from './items'

export const Items = () => {
  return (
    <div className={styles.wrapper}>
        {items.map((el, index) => (
            <div className={styles.item} key={index}>
                <div className={styles.itemIcon}>
                    <img src={el.icon} alt="" />
                </div>
                <span>{el.content}</span>
            </div>
        ))}
    </div>
  )
}
