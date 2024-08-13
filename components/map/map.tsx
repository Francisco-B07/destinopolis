'use client'

import { useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'

import { getPlacesMap } from '@/utils'
import { Transites, Place } from '@/interfaces'
import style from './map.module.css'

interface Props {
  transites?: Transites[]
}

const MapComponent = ({ transites }: Props) => {
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
      </GoogleMap>
    </div>
  )
}

export { MapComponent }
