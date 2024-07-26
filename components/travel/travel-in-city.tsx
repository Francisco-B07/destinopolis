import { Itinerario } from '@/interfaces'
import { TransitOriginDestination } from './transit-origin-destination'
import styles from './travel.module.css'

interface Props {
  cronograma: Itinerario
  location: string
}

export const TravelInCity = ({ cronograma, location }: Props) => {
  return (
    <div>
      {cronograma[0].lugares.map((item, index) => (
        <div key={index}>
          {index < cronograma[0].lugares.length - 1 && (
            <TransitOriginDestination
              origin={item.nombre}
              destination={cronograma[0].lugares[index + 1].nombre}
              location={location}
            />
          )}
        </div>
      ))}
      <p className={styles.transitPlace}>
        {cronograma[0].lugares[cronograma[0].lugares.length - 1].nombre}
      </p>
    </div>
  )
}
