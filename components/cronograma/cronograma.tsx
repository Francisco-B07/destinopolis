'use client'
import { useState } from 'react'
import styles from './cronograma.module.css'
import type { Itinerario } from '@/interfaces'
import { MapProvider } from '@/lib/providers/map-provider'
import { MapComponent } from '../map/map'
import { TourCard } from './tour-card'

interface Props {
  className?: string
  cronograma: Itinerario
}

export const Cronograma = ({ cronograma }: Props) => {
  const [currentDia, setCurrentDia] = useState(1)
  const [selectedPlace, setSelectedPlace] = useState<string>(
    cronograma[0].lugares[0].nombre
  )

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
      <div
        className={`${styles.containerAllD}  dias-scrollbar`}
        style={{ marginTop: '8px' }}
      >
        <p className={styles.subtitle}>Destino:</p>
        {cronograma[currentDia - 1].lugares.map((item, index) => {
          return (
            <button
              key={index}
              className={styles.dia}
              style={
                item.nombre === selectedPlace
                  ? { backgroundColor: 'green' }
                  : { backgroundColor: 'rgba(202, 138, 4, 0.85)' }
              }
              onClick={() => {
                setSelectedPlace(item.nombre)
              }}
            >
              {item.nombre}
            </button>
          )
        })}
      </div>
    </div>
  )
}
