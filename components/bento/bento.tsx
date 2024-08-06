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
import logo from '@/public/logo.png'

import styles from './bento.module.css'

import {
  Cronograma,
  TravelInCity,
  WeatherCard,
  Flights,
  Tours,
  Home
} from '@/components/index'
import type { Itinerario, Transites } from '@/interfaces'
import { Hotels } from '../hotel/hotel'
import { MapProvider } from '@/lib/providers/map-provider'
import { MapComponent } from '../map/map'

interface Props {
  weather: { temp: number; city: string; icon: string }
  transites: Transites[]
  itinerario: Itinerario
  flights: any[]
  hotels: any[]
  tours: any[]
  location: string
}
const Bento = ({
  weather,
  itinerario,
  transites,
  flights,
  hotels,
  tours,
  location
}: Props) => {
  const [visibleElements, setVisibleElements] = useState('inicio')
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
        className={`${styles.bentoItem} ${styles.item1} w-full`}
        data-swapy-slot="schedule"
      >
        <div data-swapy-item="cronograma" className="w-full">
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
              <Tours tours={tours} />
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
            <Flights flights={flights} />
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
              <Hotels hotels={hotels} />
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
            <MapProvider>
              <MapComponent location={location} transites={transites} />
            </MapProvider>
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
        <div data-swapy-item="inicio" id="droppable" className="w-full">
          {visibleElements === 'inicio' ? (
            <Home />
          ) : (
            <div className="flex flex-col items-center justify-center p-2">
              <Image
                src={logo}
                alt="logo"
                width={300}
                height={300}
                className={styles.logo}
              />
              <h1 className={styles.tituloLogo}>Destinopolis</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bento
