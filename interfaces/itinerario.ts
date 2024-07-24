// Types
type Coordenadas = {
  latitud: number
  longitud: number
}

type Lugar = {
  nombre: string
  coordenadas: Coordenadas
}

type Dia = {
  día: number
  lugares: Lugar[]
}

export type Itinerario = Dia[]
