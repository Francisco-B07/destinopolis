'use client'
import styles from './tours.module.css'
import { ToursCard } from './tours-card'

interface Props {
  tours: any[]
}
export const Tours = ({ tours }: Props) => {
  return (
    <div className="flex flex-col w-[440px] px-2">
      <h1 className={styles.title}>Tours cercanos</h1>
      <div className="flex justify-between gap-2">
        {tours ? (
          tours.map((tour, index) => (
            <div key={index}>
              <ToursCard tour={tour} />
            </div>
          ))
        ) : (
          <div>
            <p className="flex justify-center items-center w-[420px] h-[200px]">
              No hemos encontrado tours para ti
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
