type Lugar = {
  nombre: string
}

type Dia = {
  día: number
  lugares: Lugar[]
}

export type Itinerario = Dia[]
