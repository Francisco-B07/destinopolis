import { actionsTransit } from '@/actions'
import { ResTransit } from '@/interfaces'
import styles from './travel.module.css'
import { actionsGeocoding } from '@/actions/maps/actions-geocoding'
import { TransitInfoLine } from './transit-section/transit-info-line'

interface Props {
  origin: string
  destination: string
  location: string
}

export const TransitOriginDestination = async ({
  origin,
  destination,
  location
}: Props) => {
  const qOrigin = origin.replace(/ /g, '+')
  const qDestination = destination.replace(/ /g, '+')

  const coordsOrigin = await actionsGeocoding({
    at: location,
    q: qOrigin
  })
  const coordsDestination = await actionsGeocoding({
    at: location,
    q: qDestination
  })

  const coordsOriginStr =
    coordsOrigin.items[0].position.lat +
    ',' +
    coordsOrigin.items[0].position.lng
  const coordsDestinationStr =
    coordsDestination.items[0].position.lat +
    ',' +
    coordsDestination.items[0].position.lng

  const transit: ResTransit = await actionsTransit({
    origin: coordsOriginStr,
    destination: coordsDestinationStr
  })

  return (
    <div>
      <p className={styles.transitPlace}>{origin}</p>
      <div>
        <div>
          {transit.routes[0].sections.map((section, index) => {
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
          })}
        </div>
      </div>
    </div>
  )
}
