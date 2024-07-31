import { actionsGeocoding } from '@/actions/maps/actions-geocoding'

interface Props {
  location: string
  destino: string
}

export async function getLocationStr({ location, destino }: Props) {
  const destinoStr = destino.replace(/ /g, '+')

  const coordsDestino = await actionsGeocoding({
    at: location,
    q: destinoStr
  })

  const coordsDestinoStr =
    coordsDestino.items[0].position.lat +
    ',' +
    coordsDestino.items[0].position.lng

  return coordsDestinoStr
}
