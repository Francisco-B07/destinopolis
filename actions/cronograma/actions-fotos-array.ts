'use server'

import { Itinerario, ResTransit, Transites } from '@/interfaces'
import { getLocationStr } from '@/utils/locationStr'
import { actionsFoto } from './actions-foto'

interface Props {
  cronograma: Itinerario
  location: string
}

export async function actionsFotosArray({ cronograma, location }: Props) {
  for (const item of cronograma) {
    for (const lugar of item.lugares) {
      const data = await actionsFoto({ lugar: lugar.nombre, location })
      if (data?.photos.length === 0) continue
      for (const foto of data?.photos) {
        // console.log('foto', foto.photo_reference)

        lugar.fotos?.push(foto.photo_reference)
      }
      lugar.rating = data?.placeRating
      lugar.userRatingsTotal = data?.placeUserRatingsTotal
      lugar.location = data?.placeLocation
    }
  }

  console.log('cronograma', cronograma)

  return cronograma
}
