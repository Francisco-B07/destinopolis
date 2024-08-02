'use client'
import { createSwapy } from 'swapy'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import imagenCronograma from '@/public/cronograma.jpeg'
import imagenVuelos from '@/public/vuelos.jpg'
import imagenClima from '@/public/weather.jpg'
import imagenTours from '@/public/tours.jpg'
import imagenHospedaje from '@/public/hospedaje.jpg'
import imagenTransit from '@/public/transit.jpg'
import imagenMapaLugares from '@/public/mapa-lugares.jpg'

import styles from './bento.module.css'

import { Cronograma, TravelInCity, WeatherCard } from '@/components/index'
import type { Itinerario, Transites } from '@/interfaces'

interface Props {
  weather: { temp: number; city: string; icon: string }
  transites: Transites[]
  itinerario: Itinerario
}
const Bento = ({ weather, itinerario, transites }: Props) => {
  const [visibleElements, setVisibleElements] = useState('home')
  useEffect(() => {
    const container = document.querySelector('.container')!
    const swapy = createSwapy(container)
    swapy.enable(true)

    swapy.onSwap(event => {
      setVisibleElements(event.data.object.home || 'home')
    })
  }, [])

  return (
    <div className={`${styles.bentoContainer} container`}>
      <div
        className={`${styles.bentoItem} ${styles.item1}`}
        data-swapy-slot="schedule"
      >
        <div data-swapy-item="cronograma">
          {visibleElements === 'cronograma' ? (
            <div>
              <Cronograma cronograma={itinerario} />
            </div>
          ) : (
            <div className={styles.containerPortadaRegurso}>
              <h1 className={styles.tituloPortadaRegurso}>Cronograma</h1>
              <Image
                src={imagenCronograma}
                alt="cronograma"
                width={500}
                height={300}
                className={styles.imagenPortadaRegurso}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={`${styles.bentoItem} ${styles.item2}`}
        data-swapy-slot="travelInCity"
      >
        <div data-swapy-item="transit">
          {visibleElements === 'transit' ? (
            <div>
              <TravelInCity transites={transites} />
            </div>
          ) : (
            <div className={styles.containerPortadaRegurso}>
              <h1 className={styles.tituloPortadaRegurso}>Traslado</h1>
              <Image
                src={imagenTransit}
                alt="opciones de traslado"
                width={500}
                height={300}
                className={styles.imagenPortadaRegurso}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={`${styles.bentoItem} ${styles.item3}`}
        data-swapy-slot="tours"
      >
        <div data-swapy-item="tiquets">
          {visibleElements === 'tiquets' ? (
            <div>
              <h1>Tiquets</h1>
            </div>
          ) : (
            <div className={styles.containerPortadaRegurso}>
              <h1 className={styles.tituloPortadaRegurso}>Tours</h1>
              <Image
                src={imagenTours}
                alt="tours"
                width={500}
                height={300}
                className={styles.imagenPortadaRegurso}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={`${styles.bentoItem} ${styles.item4}`}
        data-swapy-slot="flights"
      >
        <div data-swapy-item="vuelos">
          {visibleElements === 'vuelos' ? (
            <div>Vuelos</div>
          ) : (
            <div className={styles.containerPortadaRegurso}>
              <h1 className={styles.tituloPortadaRegurso}>Vuelos</h1>
              <Image
                src={imagenVuelos}
                alt="vuelos"
                width={500}
                height={300}
                className={styles.imagenPortadaRegurso}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={`${styles.bentoItem} ${styles.item5}`}
        data-swapy-slot="lodging"
      >
        <div data-swapy-item="hospedaje">
          {visibleElements === 'hospedaje' ? (
            <div>
              <h1>Hospedaje</h1>
            </div>
          ) : (
            <div className={styles.containerPortadaRegurso}>
              <h1 className={styles.tituloPortadaRegurso}>Hospedaje</h1>
              <Image
                src={imagenHospedaje}
                alt="hospedaje"
                width={500}
                height={300}
                className={styles.imagenPortadaRegurso}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={`${styles.bentoItem} ${styles.item6}`}
        data-swapy-slot="maps"
      >
        <div data-swapy-item="mapa">
          {visibleElements === 'mapa' ? (
            <div>Mapa</div>
          ) : (
            <div className={styles.containerPortadaRegurso}>
              <h1 className={styles.tituloPortadaRegurso}>Mapa</h1>
              <Image
                src={imagenMapaLugares}
                alt="mapa con los destinos propuestos"
                width={500}
                height={300}
                className={styles.imagenPortadaRegurso}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={`${styles.bentoItem} ${styles.item7}`}
        data-swapy-slot="weather"
      >
        <div data-swapy-item="clima">
          {visibleElements === 'clima' ? (
            <div>
              {' '}
              <WeatherCard
                city={weather.city}
                temp={weather.temp}
                icon={weather.icon}
              />
            </div>
          ) : (
            <div className={styles.containerPortadaRegurso}>
              <h1 className={styles.tituloPortadaRegurso}>Clima</h1>
              <Image
                src={imagenClima}
                alt="clima"
                width={500}
                height={300}
                className={styles.imagenPortadaRegurso}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={`${styles.bentoItem} ${styles.item8}`}
        data-swapy-slot="home"
      >
        <div data-swapy-item="inicio" id="droppable">
          inicio
        </div>
      </div>
    </div>
  )
}

export default Bento
