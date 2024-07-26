import { IconBus, IconTrain, IconWalk } from '@/icons'

interface Props {
  icon: string
  className?: string
  style?: React.CSSProperties | undefined
}

const TravelIcons = ({ icon, className, style }: Props) => {
  switch (icon) {
    case 'regionalTrain':
      return <IconTrain className={className} style={style} />
    case 'subway':
      return <IconTrain className={className} style={style} />
    case 'pedestrian':
      return <IconWalk className={className} style={style} />
    case 'bus':
      return <IconBus className={className} style={style} />

    default:
      return <IconWalk className={className} style={style} />
  }
}

export default TravelIcons
