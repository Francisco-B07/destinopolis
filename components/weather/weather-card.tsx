import WeatherIcons from '@/components/weather/weather-icons'
import styles from './weather-card.module.css'
interface Props {
  city: string
  temp: number
  icon: string
}
export const WeatherCard = ({ city, temp, icon }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <h1 className={styles.cityName}>{city}</h1>
      <div className={styles.cardFooter}>
        <p className={styles.temp}>{temp.toFixed(0)}&deg;</p>
        <div className={styles.icon}>
          <WeatherIcons icon={icon} />
        </div>
      </div>
    </div>
  )
}
