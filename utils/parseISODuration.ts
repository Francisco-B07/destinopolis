interface Props {
  duration: string
}

export function parseISODuration({ duration }: Props) {
  if (!duration) {
    throw new Error('Duration is undefined or empty')
  }
  const regex = /P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/
  const matches = duration.match(regex)

  if (!matches) {
    throw new Error('Invalid ISO 8601 duration format')
  }

  // Extract hours, minutes, and seconds
  const hours = parseInt(matches[1] !== undefined ? matches[1] : '0', 10)
  const minutes = parseInt(matches[2] !== undefined ? matches[2] : '0', 10)
  const seconds = parseInt(matches[3] !== undefined ? matches[3] : '0', 10)

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}
