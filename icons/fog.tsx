interface Props {
  className?: string
}

export const Fog = ({ className }: Props) => {
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
          x1="27.5"
          y1="50.21"
          x2="36.5"
          y2="65.79"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d4d7dd" />
          <stop offset="0.45" stopColor="#d4d7dd" />
          <stop offset="1" stopColor="#bec1c6" />
        </linearGradient>
        <linearGradient id="c" y1="44.21" y2="59.79" />
      </defs>
      <path
        d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
        stroke="#e6effc"
        strokeMiterlimit="10"
        strokeWidth="0.5"
        fill="url(#a)"
      />
      <line
        x1="17"
        y1="58"
        x2="47"
        y2="58"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
        stroke="url(#b)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-4 0; 4 0; -4 0"
          dur="5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="17"
        y1="52"
        x2="47"
        y2="52"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
        stroke="url(#c)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-4 0; 4 0; -4 0"
          dur="5s"
          begin="-4s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  )
}
