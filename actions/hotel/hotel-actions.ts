'use server'

import { Hotel, ResHotel } from '@/interfaces'

interface Props {
  location: string
}

async function getAccessToken() {
  const response = await fetch(
    'https://api.amadeus.com/v1/security/oauth2/token',
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

  const url = `https://api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${latlng[0]}&longitude=${latlng[1]}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { data } = await response.json()
  const hotels: ResHotel[] = limitArraySize(data, 10)
  const hotelsInfo = await getInfoHotels(hotels)

  return hotelsInfo
}

function limitArraySize<T>(arr: T[], maxSize: number = 10): T[] {
  if (arr.length > maxSize) {
    return arr.slice(0, maxSize)
  }
  return arr
}

async function getInfoHotels(hotels: ResHotel[]) {
  const hotelsInfo = []

  for (const hotel of hotels) {
    const hotelName = hotel.name
    const hotelLocation = hotel.geoCode.latitude + ',' + hotel.geoCode.longitude

    const URL_TEXT_SEARCH = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(hotelName)}&type=lodging&location=${hotelLocation}&radius=1000&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`
    const responseTextSearch = await fetch(URL_TEXT_SEARCH)
    const dataTextSearch = await responseTextSearch.json()

    if (dataTextSearch.results.length === 0) continue

    const placeLocation = dataTextSearch.results[0].geometry.location
    const placeRating = dataTextSearch.results[0].rating
    const placeUserRatingsTotal = dataTextSearch.results[0].user_ratings_total
    const placeId = dataTextSearch.results[0].place_id

    try {
      const URL_PLACE_ID = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`
      const responsePlaceId = await fetch(URL_PLACE_ID)
      const dataPlaceId = await responsePlaceId.json()

      const photos = dataPlaceId.result.photos ? dataPlaceId.result.photos : []
      const fotos: string[] = []
      for (const foto of photos) {
        fotos?.push(foto.photo_reference)
      }
      const data: Hotel = {
        name: hotelName,
        photos: fotos,
        location: placeLocation,
        rating: placeRating,
        userRatingsTotal: placeUserRatingsTotal
      }
      hotelsInfo.push(data)
    } catch (e) {}
  }

  return hotelsInfo
}
