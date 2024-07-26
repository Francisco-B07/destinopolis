import { Cronograma, Time, TravelInCity, WeatherCard } from '@/components/index'
import styles from './bento.module.css'
import { actionsTime, actionsWeather } from '@/actions'
import type { Itinerario } from '@/interfaces'

interface Props {
  locationWeather: string
  locationTime: string
  cronograma: Itinerario
  location: string
}
const Bento = async ({
  locationWeather,
  locationTime,
  cronograma,
  location
}: Props) => {
  const weather = await actionsWeather(locationWeather)
  const time = await actionsTime(locationTime)
  return (
    <div className={styles.bentoContainer}>
      <div className={`${styles.bentoItem} ${styles.item1}`}>Calendario</div>
      <div className={`${styles.bentoItem} ${styles.item2}`}>Vuelos</div>
      <div className={`${styles.bentoItem} ${styles.item3}`}>Hospedaje</div>
      <div className={`${styles.bentoItem} ${styles.item4}`}>
        {' '}
        <WeatherCard
          city={weather.city}
          temp={weather.temp}
          icon={weather.icon}
        />
      </div>
      <div className={`${styles.bentoItem} ${styles.item5}`}>
        <Time time={time} city={weather.city} />
      </div>
      <div className={`${styles.bentoItem} ${styles.item6}`}>
        {/* {cronograma[0][1]} */}
        <Cronograma cronograma={cronograma} />
      </div>
      <div className={`${styles.bentoItem} ${styles.item7}`}>Mapa</div>
      <div className={`${styles.bentoItem} ${styles.item8}`}>
        <TravelInCity cronograma={cronograma} location={location} />
      </div>
    </div>
  )
}

export default Bento
