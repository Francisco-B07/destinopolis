'use client'
import { Transites } from '@/interfaces'
import { TransitOriginDestination } from './transit-origin-destination'
import styles from './travel.module.css'
import { useState } from 'react'

interface Props {
  transites: Transites[]
}

export const TravelInCity = ({ transites }: Props) => {
  const [placeToGo, setPlaceToGo] = useState(transites[0].destination)
  const [startTour, setStartTour] = useState(transites[0].origin)
  const [currentDia, setCurrentDia] = useState(1)

  const cantidadDeVisitas = transites.length
  const dias = Array.from(
    { length: transites[cantidadDeVisitas - 1].dia },
    (v, i) => i + 1
  )

  return (
    <div className={styles.container}>
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
              const firstElement = transites.find(
                transites => transites.dia === dia
              )

              setPlaceToGo(firstElement!.destination)
              setStartTour(firstElement!.origin)
            }}
          >
            {dia}{' '}
          </button>
        ))}
      </div>
      <div className={`${styles.containerAllD} dias-scrollbar`}>
        <p className={styles.subtitle}>Destino:</p>
        <div className={styles.allDestinos}>
          <button
            className={styles.destino}
            style={
              startTour === placeToGo
                ? { backgroundColor: 'green' }
                : { backgroundColor: 'rgba(202, 138, 4, 0.85)' }
            }
            onClick={() => setPlaceToGo(startTour)}
          >
            {startTour}
          </button>
          {transites.map((item, index) => (
            <div
              key={index}
              style={
                item.dia === currentDia
                  ? { display: 'flex' }
                  : { display: 'none' }
              }
            >
              <button
                className={styles.destino}
                style={
                  item.destination === placeToGo
                    ? { backgroundColor: 'green' }
                    : { backgroundColor: 'rgba(202, 138, 4, 0.85)' }
                }
                onClick={() => setPlaceToGo(item.destination)}
              >
                {item.destination}{' '}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        {transites.map((item, index) => (
          <div key={index}>
            {item.dia === currentDia && item.destination === placeToGo && (
              <div>
                <TransitOriginDestination transit={item.transit} />
              </div>
            )}
            {item.dia === currentDia &&
              placeToGo === startTour &&
              item.origin === startTour && (
                <div>
                  <h2 style={{ marginTop: '80px' }}>Aquí inicia el tour</h2>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}
