'use client'
import { HotelCard } from './hotel-card'
import styles from './hotel.module.css'

interface Props {
  hotels?: any[]
}
export const Hotels = ({ hotels }: Props) => {
  return (
    <div className="flex flex-col w-[440px] px-2">
      <h1 className={styles.title}>Hoteles en la ciudad</h1>
      <div className="flex justify-between gap-2">
        {hotels ? (
          hotels.map((hotel, index) => (
            <div key={index}>
              {' '}
              <HotelCard hotel={hotel} />
            </div>
          ))
        ) : (
          <div>
            <p className="flex justify-center items-center w-[420px] h-[200px]">
              No hemos encontrado hoteles para ti
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
