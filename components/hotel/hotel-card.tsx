'use client'

import imageHotel from '@/public/hotel.jpg'
import Image from 'next/image'

interface Props {
  hotel: any
}
export const HotelCard = ({ hotel }: Props) => {
  return (
    <div>
      <div className="max-w-2xl  mx-auto">
        <div className="bg-[#dbdbdb] shadow-md rounded-lg max-w-sm ">
          <Image
            className="rounded-t-lg p-2"
            src={imageHotel}
            alt="flight"
            width={500}
            height={200}
          />

          <div className="px-4 pb-4 h-24">
            <h3 className="flex justify-start items-center gap-1 mb-1 text-gray-900 font-semibold text-sm tracking-tight dark:text-white">
              {hotel.name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
