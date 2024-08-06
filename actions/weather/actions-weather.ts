'use server'

interface Props {
  locationWeather: string
  location: string
}

export async function actionsWeather({ locationWeather, location }: Props) {
  const latlng = location.split(',').map(Number)
  const resWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latlng[0]}&lon=${latlng[1]}&lang=es&units=metric&appid=${process.env.WEATHER_API_KEY}`
  )
  // const resWeather = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=${locationWeather}&lang=es&units=metric&APPID=${process.env.WEATHER_API_KEY}`
  // )
  const data = await resWeather.json()

  return data
}
