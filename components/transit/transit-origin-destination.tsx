import { ResTransit } from '@/interfaces'
import styles from './travel.module.css'
import { TransitInfoLine } from './transit-section/transit-info-line'

interface Props {
  transit: ResTransit
}

export const TransitOriginDestination = ({ transit }: Props) => {
  return (
    <div
      className={`${styles.containerTransitOriginDestination} custom-scrollbar`}
    >
      {transit.routes[0].sections ? (
        transit.routes[0].sections.map((section, index) => {
          return (
            <div key={index} className={styles.transitContainer}>
              <div className={styles.transitSection}>
                <div className={styles.transitSeparator} />
                <TransitInfoLine section={section} />
              </div>
              {index < transit.routes[0].sections.length - 1 && (
                <div className={styles.transitPlaceArrival}>
                  <div className={styles.transitCircle} />
                  <p className={styles.transitPlaceArrivalName}>
                    {section.arrival.place.name}
                  </p>
                </div>
              )}
              {section.attributions?.map((attribution, index) => {
                return (
                  <p key={index} className={styles.transitAttributions}>
                    {attribution.text}
                  </p>
                )
              })}
            </div>
          )
        })
      ) : (
        <h2 className={styles.cartelInicioTour}>
          No encontramos información de la ruta
        </h2>
      )}
    </div>
  )
}
