interface Props {
  className?: string
}

export const Snow = ({ className }: Props) => {
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
          x1="30.12"
          y1="43.48"
          x2="31.88"
          y2="46.52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#86c3db" />
          <stop offset="0.45" stopColor="#86c3db" />
          <stop offset="1" stopColor="#5eafcf" />
        </linearGradient>
        <linearGradient id="c" x1="29.67" y1="42.69" x2="32.33" y2="47.31" />
        <linearGradient id="d" x1="23.12" y1="43.48" x2="24.88" y2="46.52" />
        <linearGradient id="e" x1="22.67" y1="42.69" x2="25.33" y2="47.31" />
        <linearGradient id="f" x1="37.12" y1="43.48" x2="38.88" y2="46.52" />
        <linearGradient id="g" x1="36.67" y1="42.69" x2="39.33" y2="47.31" />
      </defs>
      <path
        d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z"
        stroke="#e6effc"
        strokeMiterlimit="10"
        strokeWidth="0.5"
        fill="url(#a)"
      />
      <g>
        <circle
          cx="31"
          cy="45"
          r="1.25"
          fill="none"
          strokeMiterlimit="10"
          stroke="url(#b)"
        />
        <path
          d="M33.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M31,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63"
          fill="none"
          stroke-linecap="round"
          strokeMiterlimit="10"
          stroke="url(#c)"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          additive="sum"
          values="-1 -6; 1 12"
          dur="4s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          additive="sum"
          values="0 31 45; 360 31 45"
          dur="9s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;1;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </g>
      <g>
        <circle
          cx="24"
          cy="45"
          r="1.25"
          fill="none"
          strokeMiterlimit="10"
          stroke="url(#d)"
        />
        <path
          d="M26.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M24,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63"
          fill="none"
          stroke-linecap="round"
          strokeMiterlimit="10"
          stroke="url(#e)"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          additive="sum"
          values="1 -6; -1 12"
          begin="-2s"
          dur="4s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          additive="sum"
          values="0 24 45; 360 24 45"
          dur="9s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;1;0"
          begin="-2s"
          dur="4s"
          repeatCount="indefinite"
        />
      </g>
      <g>
        <circle
          cx="38"
          cy="45"
          r="1.25"
          fill="none"
          strokeMiterlimit="10"
          stroke="url(#f)"
        />
        <path
          d="M40.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M38,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63"
          fill="none"
          stroke-linecap="round"
          strokeMiterlimit="10"
          stroke="url(#g)"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          additive="sum"
          values="1 -6; -1 12"
          begin="-1s"
          dur="4s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          additive="sum"
          values="0 38 45; 360 38 45"
          dur="9s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;1;0"
          begin="-1s"
          dur="4s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  )
}
