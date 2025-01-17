interface Props {
  className?: string
}

export const Smoke = ({ className }: Props) => {
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
          x1="30.25"
          y1="48.4"
          x2="33.25"
          y2="53.6"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#b8bdc6" />
          <stop offset="0.45" stopColor="#b8bdc6" />
          <stop offset="1" stopColor="#a5aab2" />
        </linearGradient>
        <linearGradient id="c" x1="23.5" y1="38.1" x2="28" y2="45.9" />
        <linearGradient id="d" x1="33.75" y1="28.8" x2="39.75" y2="39.2" />
      </defs>
      <path
        d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
        stroke="#e6effc"
        strokeMiterlimit="10"
        strokeWidth="0.5"
        fill="url(#a)"
      />
      <circle
        cx="31.75"
        cy="51"
        r="3"
        stroke="#afb4bc"
        strokeMiterlimit="10"
        strokeWidth="0.5"
        fill="url(#b)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -17;"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0; 1; 1; 1; 0"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="3; 4.5; 6"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="25.75"
        cy="51"
        r="4.5"
        stroke="#afb4bc"
        strokeMiterlimit="10"
        strokeWidth="0.5"
        fill="url(#c)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -17;"
          dur="3s"
          begin="-1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0; 1; 1; 1; 0"
          dur="3s"
          begin="-1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="3; 4.5; 6"
          dur="3s"
          begin="-1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          values="31.75; 25.75"
          dur="3s"
          begin="-1s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="36.75"
        cy="51"
        r="6"
        stroke="#afb4bc"
        strokeMiterlimit="10"
        strokeWidth="0.5"
        fill="url(#d)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -17;"
          dur="3s"
          begin="-2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0; 1; 1; 1; 0"
          dur="3s"
          begin="-2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="3; 4.5; 6"
          dur="3s"
          begin="-2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cx"
          values="31.75; 36.75"
          dur="3s"
          begin="-2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}
