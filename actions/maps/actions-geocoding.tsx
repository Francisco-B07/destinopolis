'use server'

// at Especifica el centro del contexto de búsqueda expresado como coordenadas.
interface Props {
  at: string
  q: string
}

export async function actionsGeocoding({ at, q }: Props) {
  const resTransit = await fetch(
    `https://discover.search.hereapi.com/v1/discover?at=${at}&limit=2&q=${q}&apiKey=${process.env.HERE_API_KEY}
    `
  )
  const data = await resTransit.json()

  return data
}
