'use client'
import styles from './tours.module.css'
import { ToursCard } from './tours-card'

interface Props {
  tours: any[]
}
export const Tours = ({ tours }: Props) => {
  console.log('tourssssssssssssss', tours)
  return (
    <div className="flex flex-col w-[440px] px-2">
      <h1 className={styles.title}>Tours</h1>
      <div className="flex justify-between gap-2">
        {tours.map((tour, index) => (
          <div key={index}>
            <ToursCard tour={tour} />
          </div>
        ))}
      </div>
    </div>
  )
}
