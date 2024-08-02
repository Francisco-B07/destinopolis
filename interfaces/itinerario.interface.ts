type Lugar = {
  nombre: string
  fotos: string[]
}

type Dia = {
  día: number
  lugares: Lugar[]
}

export type Itinerario = Dia[]
