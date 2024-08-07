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
  const [photos, setPhotos] = useState<string[]>(cronograma[0].lugares[0].fotos)
  const [selectedPlace, setSelectedPlace] = useState<string>(
    cronograma[0].lugares[0].nombre
  )

  const cantidadDeVisitas = cronograma.length
  const dias = Array.from(
    { length: cronograma[cantidadDeVisitas - 1].día },
    (v, i) => i + 1
  )

  return (
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
        {cronograma[currentDia - 1].lugares.map((item, index) => {
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
        {photos.map((photo, index) => (
          <li
            key={index}
            onClick={() => {
              setIndexPhoto(index)
            }}
          >
            <button>
              <img src={photo} alt="" className={styles.photoSlider} />
            </button>
          </li>
        ))}
      </ul>

      <article className={styles.currentPhotoContainer}>
        <img
          src={
            cronograma[currentDia - 1].lugares[positionLugar].fotos[indexPhoto]
          }
          alt=""
          className={styles.currentPhoto}
        />{' '}
      </article>
    </div>
  )
}
