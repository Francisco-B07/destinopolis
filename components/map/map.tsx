'use client'

import { Transites } from '@/interfaces'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { useState } from 'react'
import style from './map.module.css'

interface Props {
  location: string
  transites: Transites[]
}

const MapComponent = ({ location, transites }: Props) => {
  const latlng = location.split(',').map(Number)

  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null)

  const defaultMapContainerStyle = {
    width: '410px',
    height: '350px',
    borderRadius: '15px',
    margin: '20px'
  }

  const defaultMapCenter = {
    lat: latlng[0],
    lng: latlng[1]
  }

  const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'satellite'
  }

  const defaultMapZoom = 11

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {transites.map((transite, index) => {
          return (
            <div key={index}>
              <div>
                <Marker
                  key={index}
                  position={
                    transite.transit.routes[0].sections[0].departure.place
                      .location
                  }
                />
              </div>
              <Marker
                key={index}
                position={
                  transite.transit.routes[0].sections[0].arrival.place.location
                }
              />
            </div>
          )
        })}
      </GoogleMap>
    </div>
  )
}

export { MapComponent }
