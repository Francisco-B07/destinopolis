import styles from './cronograma.module.css'
import type { Itinerario } from '@/interfaces'

interface Props {
  className?: string
  cronograma: Itinerario
}

export const Cronograma = ({ cronograma }: Props) => {
  return (
    <div className={styles.containerCronograma}>
      {cronograma[0].lugares.map((item, index) => {
        return (
          <div key={index} className={styles.cardContainer}>
            <div className={styles.itmes}>{item.nombre}</div>
          </div>
        )
      })}
    </div>
  )
}
