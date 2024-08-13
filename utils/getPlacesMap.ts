import { Transites, Place } from '@/interfaces'

export const getPlacesMap = (transites: Transites[]) => {
  let places: Place[] = [{ name: 'test', location: { lat: 0, lng: 0 } }]
  for (let index = 0; index < transites!.length; index++) {
    if (places.some(obj => obj.name != transites![index].origin)) {
      const place: Place = {
        name: transites![index].origin,
        location: {
          lat: transites![index].transit.routes[0].sections[0].departure.place
            .location.lat,
          lng: transites![index].transit.routes[0].sections[0].departure.place
            .location.lng
        }
      }
      places.push(place)
    }
    if (places.some(obj => obj.name != transites![index].destination)) {
      const place: Place = {
        name: transites![index].destination,
        location: {
          lat: transites![index].transit.routes[0].sections[0].arrival.place
            .location.lat,
          lng: transites![index].transit.routes[0].sections[0].arrival.place
            .location.lng
        }
      }
      places.push(place)
    }
  }
  const placesMap = places.filter(obj => obj.name !== 'test')

  return placesMap
}
