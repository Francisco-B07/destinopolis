'use server'

interface Props {
  lugar: string
  location: string
}

export async function actionsFoto({ lugar, location }: Props) {
  const URL_TEXT_SEARCH = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(lugar)}&location=${location}&radius=250000&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`
  const responseTextSearch = await fetch(URL_TEXT_SEARCH)
  const dataTextSearch = await responseTextSearch.json()

  const placeLocation = dataTextSearch.results[0].geometry.location
  const placeRating = dataTextSearch.results[0].rating
  const placeUserRatingsTotal = dataTextSearch.results[0].user_ratings_total
  const placeId = dataTextSearch.results[0].place_id

  try {
    const URL_PLACE_ID = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`
    const responsePlaceId = await fetch(URL_PLACE_ID)
    const dataPlaceId = await responsePlaceId.json()

    const photos = dataPlaceId.result.photos ? dataPlaceId.result.photos : []
    const data = { photos, placeLocation, placeRating, placeUserRatingsTotal }
    return data
  } catch (e) {
    console.log('error', e)
  }
}
// export async function actionsFoto({ lugar }: Props) {
//   const URL = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNPLASH_ACCESS_KEY}&query=${lugar}&orientation=landscape`
//   const response = await fetch(URL)
//   const data = await response.json()

//   return data.results
// }
