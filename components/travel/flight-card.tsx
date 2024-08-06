'use client'
import { parseISODuration } from '@/utils/parseISODuration'
import imageflight from '@/public/flight.jpg'
import Image from 'next/image'

interface Props {
  flight: any
}
export const FlightCard = ({ flight }: Props) => {
  const result = parseISODuration({
    duration: flight.itineraries[0].duration
  })

  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#dbdbdb] shadow-md rounded-lg max-w-sm ">
          <Image
            className="rounded-t-lg p-2"
            src={imageflight}
            alt="flight"
            width={500}
            height={200}
          />

          <div className="px-4 pb-4">
            <h3 className="flex justify-start items-center gap-1 mb-1 text-gray-900 font-semibold text-sm tracking-tight dark:text-white">
              Asientos disp:{' '}
              <span className="font-normal text-sm">
                {flight.numberOfBookableSeats}
              </span>
            </h3>
            <h3 className="flex justify-start items-center gap-1 text-gray-900 font-semibold text-sm tracking-tight dark:text-white">
              Duración:{' '}
              <span className="font-normal text-sm">
                {result.hours}:{result.minutes}hs
              </span>
            </h3>
          </div>
          <div className="flex flex-col items-center justify-between pb-5">
            <span className="text-lg font-bold text-gray-900 mb-2">
              {flight.price.total} {flight.price.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
