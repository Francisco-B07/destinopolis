interface Props {
  className?: string
}

export const Haze = ({ className }: Props) => {
  return (
    <svg className={className} viewBox="0 0 64 64">
      <defs>
        <linearGradient
          id="a"
          x1="22.56"
          y1="21.96"
          x2="39.2"
          y2="50.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f3f7fe" />
          <stop offset="0.45" stopColor="#f3f7fe" />
          <stop offset="1" stopColor="#deeafb" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="17.94"
          y1="55.73"
          x2="26.94"
          y2="71.32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d4d7dd" />
          <stop offset="0.45" stopColor="#d4d7dd" />
          <stop offset="1" stopColor="#bec1c6" />
        </linearGradient>
        <linearGradient id="c" x1="28.81" y1="49.45" x2="37.81" y2="65.04" />
        <linearGradient id="d" x1="37.06" y1="44.68" x2="46.06" y2="60.27" />
        <linearGradient id="e" x1="17.94" y1="49.73" x2="26.94" y2="65.32" />
        <linearGradient id="f" x1="28.81" y1="43.45" x2="37.81" y2="59.04" />
        <linearGradient id="g" x1="37.06" y1="38.68" x2="46.06" y2="54.27" />
      </defs>
      <path
        d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
        stroke="#e6effc"
        strokeMiterlimit="10"
        strokeWidth="0.5"
        fill="url(#a)"
      />
      <g>
        <line
          x1="17"
          y1="58"
          x2="21.5"
          y2="58"
          fill="none"
          stroke-linecap="round"
          strokeMiterlimit="10"
          strokeWidth="3"
          stroke="url(#b)"
        />
        <line
          x1="28.5"
          y1="58"
          x2="39"
          y2="58"
          fill="none"
          stroke-linecap="round"
          strokeMiterlimit="10"
          strokeWidth="3"
          stroke-dasharray="7 7"
          stroke="url(#c)"
        />
        <line
          x1="42.5"
          y1="58"
          x2="47"
          y2="58"
          fill="none"
          stroke-linecap="round"
          strokeMiterlimit="10"
          strokeWidth="3"
          stroke="url(#d)"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-3 0; 3 0; -3 0"
          dur="5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </g>
      <g>
        <line
          x1="17"
          y1="52"
          x2="21.5"
          y2="52"
          fill="none"
          stroke-linecap="round"
          strokeMiterlimit="10"
          strokeWidth="3"
          stroke="url(#e)"
        />
        <line
          x1="28.5"
          y1="52"
          x2="39"
          y2="52"
          fill="none"
          stroke-linecap="round"
          strokeMiterlimit="10"
          strokeWidth="3"
          stroke-dasharray="7 7"
          stroke="url(#f)"
        />
        <line
          x1="42.5"
          y1="52"
          x2="47"
          y2="52"
          fill="none"
          stroke-linecap="round"
          strokeMiterlimit="10"
          strokeWidth="3"
          stroke="url(#g)"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-3 0; 3 0; -3 0"
          dur="5s"
          begin="-4s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  )
}
