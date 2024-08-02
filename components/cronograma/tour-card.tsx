import { ResultsEntity } from '@/interfaces/tour.interface'
import { useState } from 'react'

interface Props {
  lugar: string
}

export const TourCard = async ({ lugar }: Props) => {
  const [resultado, setResultado] = useState<ResultsEntity[]>([])

  return (
    <div>
      <h1>TourCard</h1>
      <div>
        {resultado.map((item, index) => (
          <div key={index}>
            <img src={item.urls.regular} alt={item.description} key={index} />
          </div>
        ))}
      </div>
    </div>
  )
}
