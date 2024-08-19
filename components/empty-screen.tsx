import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { CustomBadge } from './ui/custom-badge'
import { maxDuration } from '../lib/chat/actions'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-3xl font-bold text-center">
          Bienvenido a Destinopolis
        </h1>
        <h2 className="text-xl text-center mt-1">
          La Herramienta Definitiva para Planificar tus Viajes
        </h2>
        <p className="leading-normal font-semibold mt-6">
          ¿Cansado de perder tiempo organizando tus viajes?
        </p>
        <p className="leading-normal text-muted-foreground mt-2">
          Nuestra plataforma utiliza inteligencia artificial para crear
          itinerarios personalizados y optimizar tu experiencia de viaje.
          Descubre:
        </p>

        <div className="flex flex-col gap-2 mt-4 mb-4">
          <div className="flex justify-around mb-4">
            <p
              style={{
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                textShadow:
                  '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              Lugares Turisticos
            </p>

            <p
              style={{
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                textShadow:
                  '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              Vuelos económicos
            </p>
            <p
              style={{
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                textShadow:
                  '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              Hoteles
            </p>
          </div>
          <div className="flex justify-around">
            <p
              style={{
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                textShadow:
                  '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              Clima
            </p>
            <p
              style={{
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                textShadow:
                  '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              Tours adicionales
            </p>
            <p
              style={{
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: 'white',
                textShadow:
                  '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              Transporte público
            </p>
          </div>
        </div>
        {/* <div
          className="flex bg-yellow-100 rounded-lg p-4 mt-20 text-sm text-yellow-700"
          role="alert"
        >
          <svg
            className="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">¡Alerta!</span> La solicitud puede
            fallar si supera el tiempo máximo permitido por nuestro servicio de
            alojamiento. Genera un viaje de pocos días para asegurar que el
            servicio pueda procesar tu solicitud correctamente.
          </div>
        </div> */}
      </div>
    </div>
  )
}
