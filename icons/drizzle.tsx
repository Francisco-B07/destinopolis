interface Props {
  className?: string
}

export const Drizzle = ({ className }: Props) => {
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
          x1="23.31"
          y1="44.3"
          x2="24.69"
          y2="46.7"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4286ee" />
          <stop offset="0.45" stopColor="#4286ee" />
          <stop offset="1" stopColor="#0950bc" />
        </linearGradient>
        <linearGradient id="c" x1="30.31" y1="44.3" x2="31.69" y2="46.7" />
        <linearGradient id="d" x1="37.31" y1="44.3" x2="38.69" y2="46.7" />
      </defs>
      <path
        d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
        stroke="#e6effc"
        strokeMiterlimit="10"
        strokeWidth="0.5"
        fill="url(#a)"
      />
      <line
        x1="24.08"
        y1="45.01"
        x2="23.92"
        y2="45.99"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        stroke="url(#c)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="1 -5; -2 10"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="31.08"
        y1="45.01"
        x2="30.92"
        y2="45.99"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        stroke="url(#d)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          begin="-0.5s"
          values="1 -5; -2 10"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          begin="-0.5s"
          values="0;1;1;0"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </line>
      <line
        x1="38.08"
        y1="45.01"
        x2="37.92"
        y2="45.99"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        stroke="url(#e)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          begin="-1s"
          values="1 -5; -2 10"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          begin="-1s"
          values="0;1;1;0"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  )
}
