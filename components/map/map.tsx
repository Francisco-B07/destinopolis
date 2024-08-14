'use client'

import { useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'

import { getPlacesMap } from '@/utils'
import { Transites, Place } from '@/interfaces'
import style from './map.module.css'
import { useHotelStore } from '@/store/hotels/hotel-store'

interface Props {
  transites?: Transites[]
}

const MapComponent = ({ transites }: Props) => {
  const hotel = useHotelStore(state => state.hotel)
  const [activeMarker, setActiveMarker] = useState('')
  const placesMap: Place[] = transites ? getPlacesMap(transites) : []

  const handleActiveMarker = (marker: string) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }

  const defaultMapContainerStyle = {
    width: '405px',
    height: '350px',
    borderRadius: '15px',
    margin: '20px'
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

  return (
    <div className="w-full">
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
        {hotel && (
          <div>
            <Marker
              position={hotel.location}
              onClick={() => handleActiveMarker(hotel.name)}
              icon={'http://maps.google.com/mapfiles/ms/icons/blue.png'}
            >
              {activeMarker === hotel.name && (
                <InfoWindow position={hotel.location}>
                  <p className={style.info}>{hotel.name}</p>
                </InfoWindow>
              )}
            </Marker>
          </div>
        )}
      </GoogleMap>
    </div>
  )
}

export { MapComponent }
