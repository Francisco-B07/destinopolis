type Location = {
  lat: number
  lng: number
}
type Lugar = {
  nombre: string
  fotos: string[]
  rating: number
  userRatingsTotal: number
  location: Location
}

type Dia = {
  día: number
  lugares: Lugar[]
}

export type Itinerario = Dia[]
