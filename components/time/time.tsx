import { Clock } from '@/icons/clock'
import styles from './time.module.css'

interface Props {
  className?: string
  time?: string
  city: string
}

export const Time = ({ className, time, city }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <h1 className={styles.cityName}>{city}</h1>
      <div className={styles.cardFooter}>
        <Clock className={styles.clock} />
        <p className={styles.time}>{time}</p>
      </div>
    </div>
  )
}
