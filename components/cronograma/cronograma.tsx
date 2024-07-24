import styles from './cronograma.module.css'
import type { Itinerario } from '@/interfaces'

interface Props {
  className?: string
  cronograma: Itinerario
}

export const Cronograma = ({ cronograma }: Props) => {
  console.log(cronograma[0].lugares)

  return (
    <div>
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
