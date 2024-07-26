import { calculateTimeDifference } from '@/utils/time'

interface Props {
  time1: Date
  time2: Date
  className?: string
}

export const TimeDiff = ({ time1, time2, className }: Props) => {
  const timeDiff = calculateTimeDifference({ time1, time2 })
  return (
    <div>
      {timeDiff.hours > 0 ? (
        <p className={className}>
          {timeDiff.hours}:{timeDiff.minutes} hs
        </p>
      ) : (
        <p className={className}>{timeDiff.minutes} min</p>
      )}
    </div>
  )
}
