interface Props {
  className?: string
  style?: React.CSSProperties
}
export const IconTrain = ({ className, style }: Props) => {
  return (
    <svg
      className={className}
      style={style}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M21 13c0 -3.87 -3.37 -7 -10 -7h-8" />
      <path d="M3 15h16a2 2 0 0 0 2 -2" />
      <path d="M3 6v5h17.5" />
      <path d="M3 10l0 4" />
      <path d="M8 11l0 -5" />
      <path d="M13 11l0 -4.5" />
      <path d="M3 19l18 0" />
    </svg>
  )
}
