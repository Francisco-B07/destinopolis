'use server'

import moment from 'moment-timezone'

export async function actionsTime(locationTime: string) {
  const resTime = await fetch(
    `https://worldtimeapi.org/api/timezone/${locationTime}`
  )
  const { datetime } = await resTime.json()
  const time = moment.tz(datetime, locationTime).format('h:mm A')
  return time
}
