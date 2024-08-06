'use client'

import { WeatherCard } from './weather-card'
import styles from './weather.module.css'

interface Props {
  weather: any
}
export const Weather = ({ weather }: Props) => {
  const uniqueDays: any[] = []
  const result = weather.list.filter((item: any) => {
    const day = item.dt_txt.split(' ')[0]
    if (!uniqueDays.includes(day)) {
      uniqueDays.push(day)
      return true
    }
    return false
  })

  //   OBTENER LA TEMPERATURA MINIMA Y MAXIMA DE CADA DIA
  const weatherData: any[] = weather.list

  function getDate(dt_txt: string) {
    return dt_txt.split(' ')[0]
  }

  function groupByDay(data: any) {
    return data.reduce((acc: any, item: any) => {
      const date = getDate(item.dt_txt)
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(item)
      return acc
    }, {})
  }

  // Función para obtener la temperatura mínima y máxima de cada día
  function getMinMaxTemperatures(groupedData: any) {
    return Object.keys(groupedData).map(date => {
      const temps = groupedData[date].map((item: any) => item.main.temp)
      const minTemp = Math.min(...temps)
      const maxTemp = Math.max(...temps)
      return {
        date,
        minTemp,
        maxTemp
      }
    })
  }

  const groupedData = groupByDay(weatherData)
  const minMaxTemperatures = getMinMaxTemperatures(groupedData)

  return (
    <div className="flex flex-col items-center justify-center w-[420px]">
      <h1 className={styles.title}>Clima de los próximos 5 días</h1>
      <div className="grid grid-cols-2 gap-4">
        {result.map((item: any, index: number) => {
          return (
            <div key={index}>
              <WeatherCard
                temp={item.main.temp}
                tempMax={minMaxTemperatures[index].maxTemp}
                tempMin={minMaxTemperatures[index].minTemp}
                dateString={minMaxTemperatures[index].date}
                icon={item.weather[0].icon}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
