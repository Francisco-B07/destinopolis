export interface ResHotel {
  address: {
    countryCode: string
  }
  chainCode: string
  distance: {
    unit: string
    value: number
  }
  dupeId: number
  geoCode: {
    latitude: number
    longitude: number
  }
  hotelId: string
  iataCode: string
  lastUpdate: string // Consider using Date if you're handling date objects
  name: string
}

export interface Hotel {
  name: string
  photos: string[]
  location: {
    lat: number
    lng: number
  }
  rating: number
  userRatingsTotal: number
}
