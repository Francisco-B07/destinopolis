import {
  ClearDay,
  Drizzle,
  Fog,
  Haze,
  Rain,
  Smoke,
  Snow,
  ThunderstormsRain
} from '@/icons'

interface Props {
  icon: string
  className?: string
}

const Icons = ({ icon, className }: Props) => {
  switch (icon) {
    case 'Thunderstorm':
      return <ThunderstormsRain className={className} />
    case 'Drizzle':
      return <Drizzle className={className} />
    case 'Rain':
      return <Rain className={className} />

    case 'Snow':
      return <Snow className={className} />

    case 'Clear':
      return <ClearDay className={className} />

    case 'Clouds':
      return <Fog className={className} />

    case 'Fog':
      return <Fog className={className} />

    case 'Haze':
      return <Haze className={className} />

    case 'Smoke':
      return <Smoke className={className} />

    default:
      return <ClearDay className={className} />
  }
}

export default Icons
