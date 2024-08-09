'use client'

import { Transites } from '@/interfaces'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { useState } from 'react'
import style from './map.module.css'
import { UserMenu, UserMenuProps } from '../user-menu'

interface Props {
  location: string
  transites?: Transites[]
}

interface Place {
  name: string
  location: {
    lat: number
    lng: number
  }
}

const MapComponent = ({ location, transites }: Props) => {
  let places: Place[] = [{ name: 'test', location: { lat: 0, lng: 0 } }]
  for (let index = 0; index < transites!.length; index++) {
    if (places.some(obj => obj.name != transites![index].origin)) {
      const place: Place = {
        name: transites![index].origin,
        location: {
          lat: transites![index].transit.routes[0].sections[0].departure.place
            .location.lat,
          lng: transites![index].transit.routes[0].sections[0].departure.place
            .location.lng
        }
      }
      places.push(place)
    }
    if (places.some(obj => obj.name != transites![index].destination)) {
      const place: Place = {
        name: transites![index].destination,
        location: {
          lat: transites![index].transit.routes[0].sections[0].arrival.place
            .location.lat,
          lng: transites![index].transit.routes[0].sections[0].arrival.place
            .location.lng
        }
      }
      places.push(place)
    }
  }
  const placesMap = places.filter(obj => obj.name !== 'test')

  const [activeMarker, setActiveMarker] = useState('')

  const handleActiveMarker = (marker: string) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker)
  }

  const latlng = location.split(',').map(Number)

  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null)

  const defaultMapContainerStyle = {
    width: '405px',
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
