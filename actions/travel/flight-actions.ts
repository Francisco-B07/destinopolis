'use server'

interface Props {
  originLocationCode: string
  destinationLocationCode: string
  departureDate: string
}

async function getAccessToken() {
  const response = await fetch(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!
      })
    }
  )

  const data = await response.json()
  return data.access_token
}

export async function actionsFlight({
  originLocationCode,
  destinationLocationCode,
  departureDate
}: Props) {
  const token = await getAccessToken()

  const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=1&max=3`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { data } = await response.json()
  return data
}

export async function actionsFlightPrice({ flight }: { flight: any }) {
  const token = await getAccessToken()

  const url = `https://test.api.amadeus.com/v2/shopping/flight-offers/pricing`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      data: {
        type: 'flight-offers-pricing',
        flightOffers: [flight]
      }
    })
  })

  const data = await response.json()
  console.log('vuelvos', data)

  return data
}
