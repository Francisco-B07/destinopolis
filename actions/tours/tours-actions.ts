'use server'

interface Props {
  location: string
}

async function getAccessToken() {
  const response = await fetch(
    'https://api.amadeus.com/v1/security/oauth2/token',
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

export async function actionsTours({ location }: Props) {
  const token = await getAccessToken()
  const latlng = location.split(',')

  const url = `https://api.amadeus.com/v1/shopping/activities?latitude=${latlng[0]}&longitude=${latlng[1]}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { data } = await response.json()
  const tours = []
  let cont = 0
  for (let index = 0; index < data.length && cont < 3; index++) {
    if (
      data[index].pictures[0] &&
      data[index].name != '' &&
      data[index].minimumDuration != '' &&
      data[index].bookingLink != ''
    ) {
      tours.push(data[index])
      cont++
    }
  }

  return tours
}
