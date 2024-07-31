'use client'
import { Transites } from '@/interfaces'
import { TransitOriginDestination } from './transit-origin-destination'
import styles from './travel.module.css'

interface Props {
  transites: Transites[]
}

export const TravelInCity = ({ transites }: Props) => {
  console.log('transitesInCity', transites)
  return (
    <div className={styles.container}>
      <div>
        {transites.map((item, index) => (
          <div key={index} className={styles.destinos}>
            <div>
              {item.dia === 1 && (
                <span className={styles.destino}>{item.origin} </span>
              )}
            </div>
            <div>
              {index === transites.length - 1 && (
                <span className={styles.destino}>{item.destination}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        {transites.map((item, index) => (
          <div key={index}>
            {item.dia === 1 && (
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
