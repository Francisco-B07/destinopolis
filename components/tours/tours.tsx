'use client'
import styles from './tours.module.css'
import { ToursCard } from './tours-card'

interface Props {
  tours?: any[]
}
export const Tours = ({ tours }: Props) => {
  return (
    <div className="flex flex-col w-[440px] px-2">
      {tours && <h1 className={styles.title}>Tours cercanos</h1>}
      <div className="flex justify-between gap-2">
        {tours ? (
          tours.map((tour, index) => (
            <div key={index}>
              <ToursCard tour={tour} />
            </div>
          ))
        ) : (
          <section>
            <h1 className={styles.mensaje}>
              Aún no tenemos información sobre tours en esta ciudad
            </h1>
          </section>
        )}
      </div>
    </div>
  )
}
