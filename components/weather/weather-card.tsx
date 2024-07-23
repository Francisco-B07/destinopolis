import Icons from '@/components/weather/icons'
import styles from './weather-card.module.css'
interface Props {
  city: string
  temp: number
  temp_min: number
  temp_max: number
  icon: string
}
const WeatherCard = ({ city, temp, temp_min, temp_max, icon }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <h1 className={styles.cityName}>{city}</h1>
        <p className={styles.temp}>{temp.toFixed(0)}&deg;</p>
        <div className={styles.icon}>
          <Icons icon={icon} />
        </div>

        <div className={styles.cardFooter}>
          <p className={styles.tempMaxMin}>
            {temp_min.toFixed(0)}&deg; | {temp_max.toFixed(0)}&deg;
          </p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
