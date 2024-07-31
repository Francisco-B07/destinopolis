'use server'

// origin y destination "{lat},{lng}"
interface Props {
  origin: string
  destination: string
}

export async function actionsTransit({ origin, destination }: Props) {
  console.log('actionsTransit', origin, destination)

  const resTransit = await fetch(
    `
    https://transit.router.hereapi.com/v8/routes?apiKey=${process.env.HERE_API_KEY}&origin=${origin}&destination=${destination}
    `
  )
  const data = await resTransit.json()

  return data
}
