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
  const [currentDia, setCurrentDia] = useState(1)

  const cantidadDeVisitas = transites.length
  const dias = Array.from(
    { length: transites[cantidadDeVisitas - 1].dia },
    (v, i) => i + 1
  )

  console.log(dias)

  return (
    <div className={styles.container}>
      <div className={styles.containerAllD}>
        <p className={styles.selected} style={{ marginRight: '30px' }}>
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
            }}
          >
            {dia}{' '}
          </button>
        ))}
      </div>
      <div className={styles.containerAllD}>
        <p className={styles.selected}>Destino:</p>
        <div className={styles.allDestinos}>
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
                  item.origin === placeToGo
                    ? { backgroundColor: 'green' }
                    : { backgroundColor: 'rgba(202, 138, 4, 0.85)' }
                }
                onClick={() => setPlaceToGo(item.origin)}
              >
                {item.origin}{' '}
              </button>
              <div>
                {index === cantidadDeVisitas - 1 && (
                  <button
                    className={styles.destino}
                    style={
                      item.destination === placeToGo
                        ? { backgroundColor: 'green' }
                        : { backgroundColor: 'rgba(202, 138, 4, 0.85)' }
                    }
                    onClick={() => setPlaceToGo(item.destination)}
                  >
                    {item.destination}
                  </button>
                )}
              </div>
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
          </div>
        ))}
      </div>
    </div>
  )
}
