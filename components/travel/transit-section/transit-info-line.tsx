import TravelIcons from '../travel-icons'
import { TimeDiff } from '../time-diff'
import { IconMapPin } from '@/icons'
import { Section } from '@/interfaces/res-transit'
import styles from './transit-info-line.module.css'

interface Props {
  section: Section
}

export const TransitInfoLine = ({ section }: Props) => {
  return (
    <div className={styles.transitInfo}>
      <div className={styles.transitInfoLine}>
        <div className={styles.transitSectionIcons}>
          <p className={styles.transitName}>{section.transport?.name}</p>
          <TravelIcons
            icon={
              section.type == 'pedestrian'
                ? section.type
                : section.transport?.mode!
            }
            className={styles.transitIcon}
            style={{ color: section.transport?.color }}
          />
        </div>
        {section.transport?.headsign && (
          <div className={styles.transitHeadsign}>
            <IconMapPin />
            <span className={styles.transitHeadsignText}>
              {section.transport?.headsign}
            </span>
          </div>
        )}
        <TimeDiff
          time1={section.departure.time}
          time2={section.arrival.time}
          className={styles.timeDiff}
        />
      </div>
    </div>
  )
}
