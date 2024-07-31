'use server'

import { Itinerario, ResTransit, Transites } from '@/interfaces'
import { getLocationStr } from '@/utils/locationStr'
import { actionsTransit } from './actions-transit'

type Visita = {
  dia: number
  origin: string
  destination: string
}

interface Props {
  cronograma: Itinerario
  location: string
}

export async function actionsTransitArray({ cronograma, location }: Props) {
  const visitas: Visita[] = []
  const transites: Transites[] = []

  cronograma.map((item, index) => {
    const dia = item.día

    item.lugares.map((lugar, index) => {
      const nombreOrigen = lugar.nombre
      const nombreDestino =
        index < item.lugares.length - 1 ? item.lugares[index + 1].nombre : ''

      const visita = {
        dia: dia,
        origin: nombreOrigen,
        destination: nombreDestino
      }

      visitas.push(visita)
    })
  })

  const transitesPromises = visitas.map(async visita => {
    if (visita.destination != '') {
      const coordsOrigen = await getLocationStr({
        location: location,
        destino: visita.origin
      })
      const coordsDestino = await getLocationStr({
        location: location,
        destino: visita.destination
      })
      const transit: ResTransit = await actionsTransit({
        origin: coordsOrigen,
        destination: coordsDestino
      })

      const transitItem: Transites = {
        dia: visita.dia,
        origin: visita.origin,
        destination: visita.destination,
        transit: transit
      }

      transites.push(transitItem)
    }
  })
  await Promise.all(transitesPromises)
  return transites
}
