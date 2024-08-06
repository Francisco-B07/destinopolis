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
        </p>

        <p className="leading-normal font-semibold mt-6">
          Podrás encontrar información sobre:
        </p>
        <div className="flex flex-col gap-2 mt-4 mb-4">
          <div className="flex justify-around mb-4">
            <CustomBadge>Lugares Turisticos</CustomBadge>
            <CustomBadge>Vuelos económicos</CustomBadge>
            <CustomBadge>Hoteles</CustomBadge>
          </div>
          <div className="flex justify-around">
            <CustomBadge>Clima</CustomBadge>
            <CustomBadge>Tours adicionales</CustomBadge>
            <CustomBadge>Transporte público</CustomBadge>
          </div>
        </div>
        <div
          className="flex bg-yellow-100 rounded-lg p-4  text-sm text-yellow-700"
          role="alert"
        >
          <svg
            className="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">¡Alerta!</span> Tu solicitud puede
            fallar si excede el límite de maxDuration del hosting. Genera un
            viaje de pocos días para que el hosting pueda procesar tu solicitud.
          </div>
        </div>
      </div>
    </div>
  )
}
