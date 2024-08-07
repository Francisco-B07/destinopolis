'use client'
import { FlightCard } from './flight-card'
import styles from './travel.module.css'

interface Props {
  flights?: any[]
}
export const Flights = ({ flights }: Props) => {
  return (
    <div className="flex flex-col w-[440px] px-2">
      <h1 className={styles.title}>Los vuelos más económicos</h1>
      <div className="flex justify-between gap-2">
        {flights ? (
          flights.map((flight, index) => (
            <div key={index}>
              <FlightCard flight={flight} />
            </div>
          ))
        ) : (
          <div>
            <p className="flex justify-center items-center w-[420px] h-[200px]">
              No hemos encontrado vuelos para ti
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
