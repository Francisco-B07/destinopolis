'use client'

import style from './tours.module.css'

interface Props {
  tour: any
}
export const ToursCard = ({ tour }: Props) => {
  console.log('tour', tour)
  return (
    <div>
      <div className="max-w-2xl  mx-auto">
        <div className="bg-[#dbdbdb] shadow-md rounded-lg max-w-sm ">
          <img
            src={tour.pictures[0]}
            alt="tour"
            className="rounded-t-lg p-2 h-[100px]"
          />

          <div className="px-4 pb-4 h-[80px]">
            <h3
              className={`${style.tourName} flex justify-start items-center gap-1 mt-4 text-gray-900 font-semibold text-sm tracking-tight dark:text-white`}
            >
              {tour.name}
            </h3>
            <h3 className="flex flex-col items-start mt-4 mb-1 ">
              <span className="flex justify-center w-full text-gray-900 font-semibold text-sm tracking-tight">
                Duración
              </span>
              <span className={`${style.duration} font-normal text-xs `}>
                {tour.minimumDuration}
              </span>
            </h3>
          </div>
          <div className="flex flex-col items-center justify-between pb-5">
            <span className="text-lg font-bold text-gray-900 mb-2">
              {tour.price.amount} {tour.price.currencyCode}
            </span>
            <a
              href={tour.bookingLink}
              target="_blank"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Reservar
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
