'use client'
import { useState } from 'react'
import styles from './cronograma.module.css'
import type { Itinerario } from '@/interfaces'
import 'node_modules/@glidejs/glide/dist/css/glide.core.min.css'

interface Props {
  className?: string
  cronograma?: Itinerario
}

export const Cronograma = ({ cronograma = [] }: Props) => {
  const [indexPhoto, setIndexPhoto] = useState(0)
  const [positionLugar, setPositionLugar] = useState(0)

  const [currentDia, setCurrentDia] = useState(1)

  const [photos, setPhotos] = useState<string[] | null>(
    cronograma && cronograma[0] && cronograma[0].lugares[0]
      ? cronograma[0].lugares[0].fotos
      : null
  )
  const [selectedPlace, setSelectedPlace] = useState<string | null>(
    cronograma && cronograma[0] && cronograma[0].lugares[0]
      ? cronograma[0].lugares[0].nombre
      : null
  )

  const cantidadDeVisitas = cronograma.length
  const dias =
    cronograma && cronograma[cantidadDeVisitas - 1]
      ? Array.from(
          { length: cronograma[cantidadDeVisitas - 1].día },
          (v, i) => i + 1
        )
      : []

  return (
    <div>
      {dias && dias.length > 0 ? (
        <div className={styles.containerCronograma}>
          <div className={`${styles.containerAllD} dias-scrollbar`}>
            <p className={styles.subtitle} style={{ marginRight: '30px' }}>
              Día:
            </p>
            {dias.map((dia, index) => (
              <button
                key={index}
                className={styles.dia}
                style={
                  dia === currentDia
                    ? { backgroundColor: 'green' }
                    : { backgroundColor: 'rgba(202, 138, 4, 0.85)' }
                }
                onClick={() => {
                  setCurrentDia(dia)
                  setPositionLugar(0)
                  const indice = dia - 1
                  setPhotos(cronograma[indice].lugares[0].fotos)
                  setSelectedPlace(cronograma[indice].lugares[0].nombre)
                }}
              >
                {dia}{' '}
              </button>
            ))}
          </div>
          <div
            className={`${styles.containerAllD}  dias-scrollbar`}
            style={{ marginTop: '8px' }}
          >
            <p className={styles.subtitle}>Destino:</p>
            {cronograma &&
              cronograma[currentDia - 1] &&
              cronograma[currentDia - 1].lugares.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={styles.dia}
                    style={
                      item.nombre === selectedPlace
                        ? { backgroundColor: 'green' }
                        : { backgroundColor: 'rgba(202, 138, 4, 0.85)' }
                    }
                    onClick={() => {
                      setSelectedPlace(item.nombre)
                      let position = -1

                      for (const element of cronograma) {
                        if (element.día === currentDia) {
                          position = element.lugares.findIndex(
                            lugar => lugar.nombre === item.nombre
                          )

                          setPositionLugar(position)

                          setPhotos(
                            cronograma[currentDia - 1].lugares[position].fotos
                          )
                        }
                      }
                    }}
                  >
                    {item.nombre}
                  </button>
                )
              })}
          </div>

          <ul className={styles.slider}>
            {photos &&
              photos.map((photo, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setIndexPhoto(index)
                  }}
                >
                  <button>
                    <img
                      className={styles.photoSlider}
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`}
                      alt=""
                    />
                    {/* <img src={photo} alt="" className={styles.photoSlider} /> */}
                  </button>
                </li>
              ))}
          </ul>

          {cronograma && cronograma[currentDia - 1] && (
            <article className={styles.currentPhotoContainer}>
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${cronograma[currentDia - 1].lugares[positionLugar].fotos[indexPhoto]}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`}
                alt=""
                className={styles.currentPhoto}
              />{' '}
            </article>
          )}
        </div>
      ) : (
        <h1 className={styles.mensaje}>
          No pudimos generar un cronograma para usted en este momento.
        </h1>
      )}
    </div>
  )
}
