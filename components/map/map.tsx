'use client'

import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import { FC, useEffect, useState } from 'react'

interface PlaceResult {
  name: string
  geometry: {
    location: { lat: number; lng: number }
  }
}

export const defaultMapContainerStyle = {
  width: '400px',
  height: '230px',
  borderRadius: '15px',
  margin: '20px'
}

const defaultMapCenter = {
  lat: 35.8799866,
  lng: 76.5048004
}

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: 'auto',
  mapTypeId: 'satellite'
}

const defaultMapZoom = 18

// PLACES

const MapComponent = () => {
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      ></GoogleMap>
    </div>
  )
}

export { MapComponent }
