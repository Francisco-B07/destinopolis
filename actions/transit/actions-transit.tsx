'use server'

// origin y destination "{lat},{lng}"
interface Props {
  origin: string
  destination: string
}

export const maxDuration = 5 * 60 * 1000 // 5 minutos

export async function actionsTransit({ origin, destination }: Props) {
  const resTransit = await fetch(
    `
    https://transit.router.hereapi.com/v8/routes?apiKey=${process.env.HERE_API_KEY}&origin=${origin}&destination=${destination}
    `
  )
  const data = await resTransit.json()

  return data
}
