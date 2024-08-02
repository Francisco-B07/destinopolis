'use server'

import { Itinerario, ResTransit, Transites } from '@/interfaces'
import { getLocationStr } from '@/utils/locationStr'
import { actionsFoto } from './actions-foto'

interface Props {
  cronograma: Itinerario
}

export async function actionsFotosArray({ cronograma }: Props) {
  for (const item of cronograma) {
    for (const lugar of item.lugares) {
      const fotos = await actionsFoto({ lugar: lugar.nombre })
      for (const foto of fotos) {
        lugar.fotos?.push(foto.urls.regular)
      }
    }
  }

  return cronograma
}
