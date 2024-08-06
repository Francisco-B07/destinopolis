import WeatherIcons from '@/components/weather/weather-icons'
import styles from './weather.module.css'
interface Props {
  temp: number
  tempMax: number
  tempMin: number
  icon: string
  dateString: string
}
export const WeatherCard = ({
  temp,
  icon,
  tempMax,
  tempMin,
  dateString
}: Props) => {
  const date: Date = new Date(dateString)
  const day = date.getDate()
  const monthNames = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ]
  const month = monthNames[date.getMonth()]
  return (
    <div className={styles.cardContainer}>
      <p className={styles.day}>
        {day} de {month}
      </p>
      <div className="flex justify-around items-center">
        <div className={styles.icon}>
          <WeatherIcons icon={icon} />
        </div>
        <p className={styles.tempMinMax}>
          {tempMax.toFixed(0)}&deg; / {tempMin.toFixed(0)}&deg;
        </p>
      </div>
    </div>
  )
}
