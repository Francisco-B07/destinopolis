'use server'

export async function actionsWeather(locationWeather: string) {
  const resWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${locationWeather}&lang=es&units=metric&APPID=${process.env.WEATHER_API_KEY}`
  )
  const data = await resWeather.json()
  const { temp } = data.main
  const city = data.name
  const icon = data.weather[0].main
  return { temp, city, icon }
}
