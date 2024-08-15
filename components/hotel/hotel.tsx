'use client'

import { useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'

import { Place, ResHotel, Itinerario, Hotel } from '@/interfaces'
import style from './hotel.module.css'
import { useHotelStore } from '@/store/hotels/hotel-store'
import { IconStar } from '@/icons'

interface Props {
  cronograma?: Itinerario
  hotels?: Hotel[]
}

export const Hotels = ({ cronograma, hotels }: Props) => {
  const setHotel = useHotelStore(state => state.setHotel)
  const [activeMarker, setActiveMarker] = useState('')
  const [hotelAdded, setHotelAdded] = useState('')

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
    lat: cronograma ? cronograma[0].lugares[0].location.lat : -31.5346924,
    lng: cronograma ? cronograma[0].lugares[0].location.lng : -68.5315393
  }

  const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'satellite'
  }

  const defaultMapZoom = 10

  const addHotel = (hotel: Hotel) => {
    setHotel(hotel)
    setHotelAdded(hotel.name)
  }

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <h1 className={style.title}>Hoteles en la ciudad</h1>
        <div className="flex justify-around">
          <div className="flex h-6 gap-1">
            <img
              className="w-full h-full object-cover"
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
        {cronograma &&
          cronograma.map((place, index) => {
            return (
              <div key={index}>
                <div>
                  {place.lugares.map((lugar, index) => {
                    return (
                      <div key={index}>
                        <Marker
                          key={index}
                          position={lugar.location}
                          onClick={() => handleActiveMarker(lugar.nombre)}
                          icon={
                            'http://maps.google.com/mapfiles/ms/icons/red.png'
                          }
                        >
                          {activeMarker === lugar.nombre && (
                            <InfoWindow position={lugar.location}>
                              <div>
                                <div className="flex justify-center w-full h-[100px] mb-2 relative">
                                  <img
                                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${lugar.fotos[0]}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`}
                                    alt=""
                                  />
                                  <p className={style.info}>{lugar.nombre}</p>
                                </div>
                                <div className="flex itmes-center mx-4 my-2">
                                  <IconStar className="text-yellow-600 fill-yellow-600 size-5" />
                                  <p className="text-yellow-600 text-sm ml-1 font-semibold ">
                                    {lugar.rating}
                                  </p>
                                  <p className="text-black font-normal text-sm ml-6">
                                    {lugar.userRatingsTotal} opiniones
                                  </p>
                                </div>
                              </div>
                            </InfoWindow>
                          )}
                        </Marker>
                      </div>
                    )
                  })}
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
                    position={hotel.location}
                    onClick={() => handleActiveMarker(hotel.name)}
                    icon={'http://maps.google.com/mapfiles/ms/icons/blue.png'}
                  >
                    {activeMarker === hotel.name && (
                      <InfoWindow position={hotel.location}>
                        <div>
                          <div className="flex justify-center w-full h-[100px] mb-2 relative">
                            <img
                              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0]}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`}
                              alt=""
                            />
                            <p className={style.info}>{hotel.name}</p>
                          </div>
                          <div className="flex itmes-center mx-4 my-2">
                            <IconStar className="text-yellow-600 fill-yellow-600 size-5" />
                            <p className="text-yellow-600 text-sm ml-1 font-semibold ">
                              {hotel.rating}
                            </p>
                            <p className="text-black font-normal text-sm ml-6">
                              {hotel.userRatingsTotal} opiniones
                            </p>
                          </div>
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
