import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { CustomBadge } from './ui/custom-badge'

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
          Podras encontrar información sobre:
        </p>
        <div className="flex flex-col gap-2 mt-2 mb-4">
          <div className="flex justify-around">
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
      </div>
    </div>
  )
}
