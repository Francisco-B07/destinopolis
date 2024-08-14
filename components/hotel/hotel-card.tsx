'use client'
import style from './hotel.module.css'
import imageHotel from '@/public/hotel.jpg'
import Image from 'next/image'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { useState } from 'react'
type Lugares = {
  fotos: string[]
  rating: number
  userRatingsTotal: number
  location: {
    lat: number
    lng: number
  }
  nombre: string
}

interface Props {
  dia: {
    día: number
    lugares: Lugares[]
  }
}
export const HotelCard = ({ dia }: Props) => {
  const [activeMarker, setActiveMarker] = useState('')
  const handleActiveMarker = (marker: string) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }
  return (
    <div>
      {dia.lugares.map((lugar, index) => {
        return (
          <div key={index}>
            <Marker
              key={index}
              position={lugar.location}
              onClick={() => handleActiveMarker(lugar.nombre)}
              icon={'http://maps.google.com/mapfiles/ms/icons/red.png'}
            >
              {activeMarker === lugar.nombre && (
                <InfoWindow position={lugar.location}>
                  <p className={style.info}>{lugar.nombre}</p>
                </InfoWindow>
              )}
            </Marker>
          </div>
        )
      })}
    </div>
  )
}
