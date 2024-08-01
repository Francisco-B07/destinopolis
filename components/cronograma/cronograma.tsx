'use client'
import { useState } from 'react'
import styles from './cronograma.module.css'
import type { Itinerario } from '@/interfaces'

interface Props {
  className?: string
  cronograma: Itinerario
}

export const Cronograma = ({ cronograma }: Props) => {
  const [currentDia, setCurrentDia] = useState(1)

  const cantidadDeVisitas = cronograma.length
  const dias = Array.from(
    { length: cronograma[cantidadDeVisitas - 1].día },
    (v, i) => i + 1
  )

  return (
    <div className={styles.containerCronograma}>
      <div className={`${styles.containerAllD} dias-scrollbar`}>
        <p className={styles.subtitle} style={{ marginRight: '30px' }}>
          Día:
        </p>
        {dias.map((dia, index) => (
          <button
            key={index}
            className={styles.dia}
            style={
              dia === currentDia
                ? { backgroundColor: 'green' }
                : { backgroundColor: 'rgba(202, 138, 4, 0.85)' }
            }
            onClick={() => {
              setCurrentDia(dia)
            }}
          >
            {dia}{' '}
          </button>
        ))}
      </div>
      {cronograma[currentDia - 1].lugares.map((item, index) => {
        return (
          <div key={index} className={styles.cardContainer}>
            <div className={styles.itmes}>{item.nombre}</div>
          </div>
        )
      })}
    </div>
  )
}
