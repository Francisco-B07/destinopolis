interface Props {
  time1: Date
  time2: Date
}

export function calculateTimeDifference({ time1, time2 }: Props) {
  // Convertir las cadenas a objetos Date
  const date1: Date = new Date(time1)
  const date2: Date = new Date(time2)

  // Calcular la diferencia en milisegundos
  const diffMs: number = date2.getTime() - date1.getTime()

  // Convertir la diferencia a horas y minutos
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, '0')

  // Devolver la diferencia como un objeto
  return { hours: diffHours, minutes: diffMinutes }
}
