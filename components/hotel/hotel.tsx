'use client'

import { useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'

import { getPlacesMap } from '@/utils'
import { Transites, Place, ResHotel } from '@/interfaces'
import style from './hotel.module.css'
import { useHotelStore } from '@/store/hotels/hotel-store'

interface Props {
  transites?: Transites[]
  hotels?: ResHotel[]
}

export const Hotels = ({ transites, hotels }: Props) => {
  const setHotel = useHotelStore(state => state.setHotel)
  const [activeMarker, setActiveMarker] = useState('')
  const [hotelAdded, setHotelAdded] = useState('')
  const placesMap: Place[] = transites ? getPlacesMap(transites) : []

  const handleActiveMarker = (marker: string) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }

  const defaultMapContainerStyle = {
    width: '405px',
    height: '290px',
    borderRadius: '15px',
    margin: '5px 20px'
  }

  const defaultMapCenter = {
    lat: placesMap[0].location.lat,
    lng: placesMap[0].location.lng
  }

  const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'satellite'
  }

  const defaultMapZoom = 12

  const addHotel = (hotel: ResHotel) => {
    const newPlace: Place = {
      name: hotel.name,
      location: {
        lat: hotel.geoCode.latitude,
        lng: hotel.geoCode.longitude
      }
    }
    setHotel(newPlace)
    setHotelAdded(hotel.name)
  }

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <h1 className={style.title}>Hoteles en la ciudad</h1>
        <div className="flex justify-around">
          <div className="flex h-6 gap-1">
            <img
              src="http://maps.google.com/mapfiles/ms/icons/blue.png"
              alt="markerBlue"
            />
            <p>Hoteles</p>
          </div>
          <div className="flex h-6 gap-1">
            <img
              src="http://maps.google.com/mapfiles/ms/icons/red.png"
              alt="markerRed"
            />
            <p>Atracciones</p>
          </div>
        </div>
      </div>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {transites &&
          placesMap.map((place, index) => {
            return (
              <div key={index}>
                <div>
                  <Marker
                    key={index}
                    position={place.location}
                    onClick={() => handleActiveMarker(place.name)}
                    icon={'http://maps.google.com/mapfiles/ms/icons/red.png'}
                  >
                    {activeMarker === place.name && (
                      <InfoWindow position={place.location}>
                        <p className={style.info}>{place.name}</p>
                      </InfoWindow>
                    )}
                  </Marker>
                </div>
              </div>
            )
          })}
        {hotels &&
          hotels.map((hotel, index) => {
            return (
              <div key={index}>
                <div>
                  <Marker
                    key={index}
                    position={{
                      lat: hotel.geoCode.latitude,
                      lng: hotel.geoCode.longitude
                    }}
                    onClick={() => handleActiveMarker(hotel.name)}
                    icon={'http://maps.google.com/mapfiles/ms/icons/blue.png'}
                  >
                    {activeMarker === hotel.name && (
                      <InfoWindow
                        position={{
                          lat: hotel.geoCode.latitude,
                          lng: hotel.geoCode.longitude
                        }}
                      >
                        <div>
                          <p className={style.info}>{hotel.name}</p>
                          <button
                            onClick={() => addHotel(hotel)}
                            className="mt-2 text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2 text-center  "
                            style={{
                              display: hotelAdded === hotel.name ? 'none' : ''
                            }}
                          >
                            Agregar al Mapa
                          </button>
                          <button
                            className="mt-2 text-white bg-green-800  font-medium rounded-lg text-sm px-5 py-2 text-center  "
                            style={{
                              display: hotelAdded === hotel.name ? '' : 'none'
                            }}
                          >
                            Hotel Agregado
                          </button>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                </div>
              </div>
            )
          })}
      </GoogleMap>
    </div>
  )
}
