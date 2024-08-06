'use server'

import { Itinerario, ResTransit, Transites } from '@/interfaces'
import { getLocationStr } from '@/utils/locationStr'
import { actionsTransit } from './actions-transit'

export const maxDuration = 5 * 60 * 1000 // 5 minutos

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

  // Genero array de puntos de traslados rescatando el nombre de origen y destino de cada visita
  for (const item of cronograma) {
    const dia = item.día

    for (let index = 0; index < item.lugares.length; index++) {
      const lugar = item.lugares[index]
      const nombreOrigen = lugar.nombre
      const nombreDestino =
        index < item.lugares.length - 1 ? item.lugares[index + 1].nombre : ''

      const visita = {
        dia: dia,
        origin: nombreOrigen,
        destination: nombreDestino
      }

      visitas.push(visita)
    }
  }

  // Genero array de traslados agregando los detalles de cada recorrido en transporte publico
  for (const visita of visitas) {
    if (visita.destination != '') {
      const transitItem = await getTransites({
        visita,
        location
      })
      transites.push(transitItem)
    }
  }

  return transites
}

async function getTransites({
  visita,
  location
}: {
  visita: Visita
  location: string
}) {
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

  return transitItem
}
