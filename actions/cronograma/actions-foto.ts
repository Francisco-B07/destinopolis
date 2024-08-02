'use server'

interface Props {
  lugar: string
}

export async function actionsFoto({ lugar }: Props) {
  const URL = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNPLASH_ACCESS_KEY}&query=${lugar}`
  const response = await fetch(URL)
  const data = await response.json()

  return data.results
}
