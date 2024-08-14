'use server'

import { ResHotel } from '@/interfaces'

interface Props {
  location: string
}

async function getAccessToken() {
  const response = await fetch(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!
      })
    }
  )

  const data = await response.json()
  return data.access_token
}

export async function actionsHotel({ location }: Props) {
  const token = await getAccessToken()
  const latlng = location.split(',')

  const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${latlng[0]}&longitude=${latlng[1]}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { data } = await response.json()
  const hotels: ResHotel[] = limitArraySize(data, 100)

  return hotels
}

function limitArraySize<T>(arr: T[], maxSize: number = 30): T[] {
  if (arr.length > maxSize) {
    return arr.slice(0, maxSize)
  }
  return arr
}
